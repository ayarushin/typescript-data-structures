class TreeNode<T=unknown> {
  public value: T;
  public left: TreeNode<T> | null;
  public right: TreeNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree<T=unknown> {
  private root: TreeNode<T> | null;
  private visitedNodes: WeakSet<TreeNode<T>>;

  constructor() {
    this.root = null;
    this.visitedNodes = new WeakSet();
  }

  public addNode(value: T) {
    const newNode = new TreeNode(value);

    if (this.root === null) {
      this.root = newNode;
    } else {
      this.addNodeToTree(this.root, newNode);
    }
  }

  private addNodeToTree(node: TreeNode<T>, newNode: TreeNode<T>) {
    if (newNode.value < node.value) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.addNodeToTree(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.addNodeToTree(node.right, newNode);
      }
    }
  }

  public contains(value: T): boolean {
    return this.containsNode(this.root, value);
  }

  private containsNode(node: TreeNode<T> | null, value: T): boolean {
    if (node === null) {
      return false;
    }

    if (node.value === value) {
      return true;
    }

    if (this.visitedNodes.has(node)) {
      return false;
    }

    this.visitedNodes.add(node);

    if (value < node.value) {
      return this.containsNode(node.left, value);
    } else {
      return this.containsNode(node.right, value);
    }
  }
}

const foo = {foo: 'foo'};
const bar = {bar: 'bar'};
const baz = {baz: 'baz'};
const faz = {faz: 'faz'};
const buz = {buz: 'buz'};
const none = {none: 'none'};

// Example usage
const binaryTree = new BinaryTree<Record<string, string>>();
binaryTree.addNode(foo);
binaryTree.addNode(bar);
binaryTree.addNode(baz);
binaryTree.addNode(faz);
binaryTree.addNode(buz);

console.log(binaryTree.contains(faz)); // true
console.log(binaryTree.contains(none)); // false
