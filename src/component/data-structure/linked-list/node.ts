export default class Node {
  value: number;

  next: any | null;

  constructor(value: number, nextNode: Node | null) {
    this.value = value;
    this.next = nextNode;
  }
}
