class Stack<T extends object> {
  private items: T[];
  private readonly stackSet: WeakSet<T>;

  constructor() {
    this.items = [];
    this.stackSet = new WeakSet();
  }

  push(item: T): void {
    if (!this.stackSet.has(item)) {
      this.items.push(item);
      this.stackSet.add(item);
    }
  }

  pop(): T | undefined {
    const poppedItem = this.items.pop();
    if (poppedItem) {
      this.stackSet.delete(poppedItem);
    }
    return poppedItem;
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }
}


const foo = {foo: 'foo'};
const bar = {bar: 'bar'};
const baz = {baz: 'baz'};

const stack = new Stack();
stack.push(foo);
stack.push(bar);
stack.push(baz);
console.log(stack.pop()); // baz
console.log(stack.peek()); // bar
console.log(stack.size()); // 2
console.log(stack.isEmpty()); // false
