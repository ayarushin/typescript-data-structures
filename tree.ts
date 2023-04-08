class TreeNode<T extends object> {
  children: WeakSet<TreeNode<T>>;

  constructor(public value: T) {
    this.children = new WeakSet();
  }

  addChild(node: TreeNode<T>): void {
    this.children.add(node);
  }

  removeChild(node: TreeNode<T>): void {
    this.children.delete(node);
  }

  hasChild(node: TreeNode<T>): boolean {
    return this.children.has(node);
  }
}

const foo = {foo: 'foo'};
const bar = {bar: 'bar'};
const baz = {baz: 'baz'};

// Example usage
const root = new TreeNode<Record<string, string>>(foo);
const child1 = new TreeNode<Record<string, string>>(bar);
const child2 = new TreeNode<Record<string, string>>(baz);
root.addChild(child1);
root.addChild(child2);
child1.addChild(new TreeNode<Record<string, string>>(foo));
console.log(root.hasChild(child1)); // true
console.log(root.hasChild(new TreeNode<Record<string, string>>(bar))); // false, because it's a new instance
