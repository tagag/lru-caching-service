export default class LRUCache {
  private _size: number = 0;
  private capacity: number;
  private head: NullableDoublyLinkedNode = null;
  private tail: NullableDoublyLinkedNode = null;
  private cache: Map<Key, Value> = new Map<Key, Value>();

  // set default limit of 10 if limit is not passed.
  constructor(capacity: number = 10) {
    this.capacity = capacity;
  }

  // Write Node to head of LinkedList and update cache with Node key and Node reference
  write(key: Key, value: Value): void {
    this.removeDuplicate(key);
    this.trim();

    const entry = this.createEntry(key, value);
    this.cache.set(key, entry);
    this.incrementSize();
  }

  // Read from cache map and make that node as new Head of LinkedList
  read(key: Key): Value {
    const hit = this.cache.get(key);

    if (!hit) {
      return null;
    }

    this.write(hit.key, hit.value);
    return hit.value;
  }

  get size(): number {
    return this._size;
  }

  private incrementSize(): void {
    this._size++;
  }

  private decrementSize(): void {
    this._size--;
  }

  private isFull(): boolean {
    return this.size === this.capacity;
  }

  private trim() {
    if (this.isFull() && this.tail) {
      this.remove(this.tail.key);
    }
  }

  private removeDuplicate(key: Key) {
    if (this.cache.get(key)) {
      this.remove(key);
    }
  }

  remove(key: Key): void {
    const node = this.cache.get(key);

    if (!node) return;

    if (node.prev !== null) {
      node.prev.next = node.next;
    } else {
      this.head = node.next;
    }

    if (node.next !== null) {
      node.next.prev = node.prev;
    } else {
      this.tail = node.prev
    }

    this.cache.delete(key);
    this.decrementSize();
  }

  private createEntry(key: Key, value: Value): NullableDoublyLinkedNode {
    const entry = new DoublyLinkedNode(key, value, this.head);
    if (!this.head) {
      this.head = this.tail = entry;
      return entry;
    }

    this.head.prev = entry;
    this.head = entry;
    return entry;
  }

  clear(): void {
    this.head = null;
    this.tail = null;
    this._size = 0;
    this.cache.clear();
  }
}

class DoublyLinkedNode {
  key: string | number;
  value: any;
  next: NullableDoublyLinkedNode;
  prev: NullableDoublyLinkedNode;

  constructor(key: Key, value: Value, next: NullableDoublyLinkedNode = null, prev: NullableDoublyLinkedNode = null) {
    this.key = key;
    this.value = value;
    this.next = next;
    this.prev = prev;
  }
}

type Key = string | number;
type Value = any;
type NullableDoublyLinkedNode = DoublyLinkedNode | null;
