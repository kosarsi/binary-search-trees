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

    preOrderForEach(callback) {
        this.#preOrderHelper(this.root, callback);
    }

    #preOrderHelper(node, callback) {
        callback(node);
        if (node.left != null) {
            this.#preOrderHelper(node.left);
        } 
        if (node.right != null) {
            this.#preOrderHelper(node.right); 
        }
    }

    postOrderForEach(callback) {
        this.#postOrderHelper(this.root, callback);
    }

    #postOrderHelper(node, callback) {
        if (node.left != null) {
            this.#postOrderHelper(node.left, callback);
        }
        if (node.right != null) {
            this.#postOrderHelper(node.right, callback);
        }
        callback(node); 
    }

    deleteItem(value) {
        this.root = this.#deleteHelper(this.root, value);
    }

    #deleteHelper(node, value) {

        if (node == null) {
            return null;
        }

        if (node.data > value) {
            node.left = this.#deleteHelper(node.left, value);
        } else if (node.data < value) {
            node.right = this.#deleteHelper(node.right, value); 
        } else {

            if (node.left == null) {
                return node.right;
            }

            if (node.right == null) {
                return node.left; 
            }

            // Node has both children

            let successor = node.right;
            while (successor.left != null) {
                successor = successor.left; 
            }
            node.data = successor.data;
            node.right = this.#deleteHelper(node.right, successor.data);

        }
        return node;
    }

    find(value) {
        return this.#findHelper(this.root, value)
    }

    #findHelper(node, value) {
        if (node.data == value) {
            return node;
        }
        if (node.data > value) {
            if (node.left == null) {
                return null;
            }
            return this.#findHelper(node.left, value); 
        }
        if (node.data < value) {
            if (node.right == null) {
                return null;
            }
            return this.#findHelper(node.right, value); 
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
prettyPrint(tree.root)
tree.deleteItem(8)
prettyPrint(tree.root)