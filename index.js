class Node {
    constructor(val, element, left, right) {
        this.val = (val === undefined ? 0 : val);
        this.right = (right === undefined ? null : right);
        this.left = (left === undefined ? null : left);

        this.element = element;
    }
}

let head;
const container = document.getElementById("container");

const randomNumber = (min = -100, max = 100) => {
    return Math.floor((Math.random() * (max - min) + min));
}

const usedNumbers = {};

const createNode = () => {
    if(Object.keys(usedNumbers).length >= 200) {
        alert("Нельзя создать больше нод");
        return;
    }

    let number = randomNumber();

    while(usedNumbers[number]) {
        number = randomNumber();
    }

    usedNumbers[number] = true;

    const nodeElem = document.createElement("div");
    const node = new Node(number, nodeElem);
    const parent = findLastNode(head);
    
    const parentElem = parent.element;
    
    if(parent.left === null) {
        nodeElem.style.left = (parentElem.offsetLeft - 100) + 'px';
        parent.left = node;
    } else {
        nodeElem.style.left = (parentElem.offsetLeft + 120) + 'px';
        parent.right = node;
    }
    
    nodeElem.style.top = (parentElem.offsetTop + 80) + 'px';
    nodeElem.className = "node";
    nodeElem.innerText = number;
    
    const minimumLevel = getMinimumLevel(head);
    let levelContainer = document.querySelector(`[index="${minimumLevel}"]`);

    if(!levelContainer) {
        levelContainer = document.createElement('div');
        levelContainer.classList.add('level-container');
        levelContainer.setAttribute('index', minimumLevel);
        container.append(levelContainer);
    }
    
    levelContainer.append(nodeElem);
}

const getMinimumLevel = (node) => {
    if(!node) return 0;
    if(!node.left && !node.right) return 1;
    if(!node.left) {
        return 1 + getMinimumLevel(node.right);
    } else {
        return 1 + getMinimumLevel(node.left);
    }
}

const findLastNode = (head) => {
    if(!head) return;
    if(!head.left || !head.right) return head;

    const q = [];

    q.push(head.left);
    q.push(head.right);

    while(q.length) {
        const curr = q.shift();

        if(!curr.left || !curr.right) {
            return curr;
        }

        q.push(curr.left);
        q.push(curr.right);
    }
}

window.onkeypress = (event) => {
    if(event.charCode === 32 || event.code === "Space") {
        createNode();
    }
}

window.onload = () => {
    const headElement = document.getElementById("head");
    let number = randomNumber();
    head = new Node(number, headElement);
    usedNumbers[number] = true;

    headElement.innerText = number;
}