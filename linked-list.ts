class ListNode<T=unknown> {
  data: T;
  next: ListNode<T> | null;

  constructor(data: T) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList<T=unknown> {
  head: ListNode<T> | null;
  size: number;
  nodeSet: WeakSet<ListNode<T>>;

  constructor() {
    this.head = null;
    this.size = 0;
    this.nodeSet = new WeakSet();
  }

  // add a new node to the end of the list
  add(data: T) {
    const node = new ListNode<T>(data);

    // add the node to the WeakSet
    this.nodeSet.add(node);

    // if the list is empty, make the new node the head
    if (this.head === null) {
      this.head = node;
    } else {
      let current = this.head;

      // traverse to the end of the list
      while (current.next !== null) {
        current = current.next;
      }

      // add the new node
      current.next = node;
    }

    this.size++;
  }

  // remove a node from the list
  remove(data: T) {
    let current = this.head;
    let prev: ListNode<T> | null = null;

    // traverse the list to find the node to remove
    while (current !== null) {
      if (current.data === data) {
        if (prev === null) {
          // if the head node is being removed
          this.head = current.next;
        } else {
          // remove the current node
          prev.next = current.next;
        }

        // remove the node from the WeakSet
        this.nodeSet.delete(current);

        this.size--;
        return current.data;
      }

      prev = current;
      current = current.next;
    }

    // node was not found
    return null;
  }

  // As alternative, not so good, because we assume that we remove element by reference
  compareRemove(comparer: (data: T) => boolean) {
    let current = this.head;
    let prev: ListNode<T> | null = null;

    // traverse the list to find the node to remove
    while (current !== null) {
      if (comparer(current.data)) {
        if (prev === null) {
          // if the head node is being removed
          this.head = current.next;
        } else {
          // remove the current node
          prev.next = current.next;
        }

        // remove the node from the WeakSet
        this.nodeSet.delete(current);

        this.size--;
        return current.data;
      }

      prev = current;
      current = current.next;
    }

    // node was not found
    return null;
  }

  // get the size of the list
  getSize() {
    return this.size;
  }

  // print the contents of the list
  print() {
    let current = this.head;

    while (current !== null) {
      console.log(current.data);
      current = current.next;
    }
  }
}

// create a new linked list
const list = new LinkedList<Record<string, string>>();

const foo = {foo: 'foo'};
const bar = {bar: 'bar'};
const baz = {baz: 'baz'};

// add some nodes
list.add(foo);
list.add(bar);
list.add(baz);

// remove a node
// list.remove(bar);
list.compareRemove((data) => 'bar' in data)

// print the contents of the list
list.print();
