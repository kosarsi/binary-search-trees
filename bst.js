class Node {

    constructor(dataVal) {
        this.data = dataVal;
        this.left = null;
        this.right = null; 
    }

}

class Tree {

    constructor () {
        this.root = null;
    }

    buildTree(array) {
        array.sort((a, b) => a - b); 
        array = [...new Set(array)];
        this.root = this.#buildTreeHelper(array, 0, array.length - 1); 
    }

    #buildTreeHelper(array, start, end) {
        if (start > end) {
            return null;
        }
        let mid = Math.floor((end + start) / 2); 
        let root = new Node(array[mid]); 
        root.left = this.#buildTreeHelper(array, start, mid - 1);
        root.right = this.#buildTreeHelper(array, mid + 1, end); 
        return root; 
    }

    height() {
        return this.#heightHelper(this.root);
    }

    #heightHelper(node) {
        if (node.left == null && node.right == null) {
            return 1;
        }
        if (node.left == null) {
            return 1 + this.#heightHelper(node.right);
        }
        if (node.right == null) {
            return 1 + this.#heightHelper(node.left);
        }
        return 1 + Math.max(this.#heightHelper(node.left), this.#heightHelper(node.right)); 
    }

    insert(value) {
        this.#insertHelper(this.root, value); 
    }

    #insertHelper(node, value) {
        if (node.data > value) {
            if (node.left == null) {
                node.left = new Node(value);
            } else {
                this.#insertHelper(node.left, value); 
            }
        }
        if (node.data < value) {
            if (node.right == null) {
                node.right = new Node(value);
            } else {
                this.#insertHelper(node.right, value); 
            }
        }
        if (node.data == value) {
            return; 
        }
    }

    inOrderForEach(callback) {
        this.#inOrderHelper(this.root, callback);
    }

    #inOrderHelper(node, callback) {
        if (node.left != null) {
            this.#inOrderHelper(node.left, callback); 
        }
        callback(node); 
        if (node.right != null) {
            this.#inOrderHelper(node.right, callback); 
        }
    }

}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

let tree = new Tree();
let nums = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
tree.buildTree(nums);
prettyPrint(tree.root);
tree.deleteItem(4);
prettyPrint(tree.root);
console.log(tree.height());