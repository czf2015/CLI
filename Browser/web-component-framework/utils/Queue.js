class Queue {
    constructor(members = []) {
      this.queue = [...members];
    }
    
    pop() {
      const value = this.queue[0];
      this.queue.splice(0, 1);
      return value;
    }
  }


  // function cycle(arr) {
//     for (let i = 0;;) {

//     }
// }