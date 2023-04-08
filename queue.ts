type QueueItem<T=unknown> = {
  value: T;
  next?: QueueItem<T>;
};

class Queue<T=unknown> {
  private head?: QueueItem<T>;
  private tail?: QueueItem<T>;
  private items: WeakSet<QueueItem<T>> = new WeakSet();
  public size = 0;

  enqueue(value: T): void {
    const newItem: QueueItem<T> = { value };
    if (!this.head) {
      this.head = newItem;
      this.tail = newItem;
    } else {
      this.tail!.next = newItem;
      this.tail = newItem;
    }
    this.items.add(newItem);
    this.size++;
  }

  dequeue(): T | undefined {
    if (!this.head) return undefined;
    const { value } = this.head;
    this.items.delete(this.head);
    this.head = this.head.next;
    if (!this.head) this.tail = undefined;
    this.size--;
    return value;
  }

  clear(): void {
    this.head = undefined;
    this.tail = undefined;
    this.items = new WeakSet();
  }
}

const queue = new Queue<string>();
queue.enqueue("apple");
queue.enqueue("banana");
queue.enqueue("cherry");

console.log(queue.size); // Output: 3

console.log(queue.dequeue()); // Output: "apple"
console.log(queue.dequeue()); // Output: "banana"

queue.enqueue("date");
