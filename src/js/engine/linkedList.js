export class LinkedList {
  constructor() {
    this.head = null;
  }

  addFirst( data ) {
    let node = new ListNode( data, this.head );
    this.head = node;
  }

  loopList() {
    let current = this.head;
    while ( current.next ) {
      current = current.next;
    }
    current.next = this.head;
  }
}

export class ListNode {
  constructor( value, next = null ) {
    this.value = value;
    this.next = next;
  }
}
