/** Declares a Queue element
 * @param element value to add to object
 * @param priority priority of element
 */
class QElement{
  constructor(element, priority){
    this.element = element;
    this.priority = priority;
  }
}

/** Declares a priority queue */
class PriorityQueue{
  constructor(){
    this.items = [];
  }

  /** Adds a new element to priority queue
   * @param element value to add
   * @param priority priority for element
   */
  enqueue(element, priority){
    var qElement = new QElement(element, priority);
    var contain = false;
    for (var i = 0; i < this.items.length; i++){
      if(this.items[i].priority > qElement.priority){
        this.items.splice(i, 0, qElement);
        contain = true;
        break;
      }
    }
    if(!contain){
      this.items.push(qElement);
    }
  }

  /** Remove first element from queue */
  dequeue(){
    if(this.isEmpty()){
      return "No elements";
    }
    return this.items.shift();
  }

  /** Get first element in queue */
  front(){
    if(this.isEmpty()){
      return "No elements";
    }
    return this.items[0];
  }

  /** Get last element in queue */
  rear(){
    if(this.isEmpty()){
      return "No elements"
    }
    return this.items[this.items.length - 1];
  }

  /** Check if queue is empty */
  isEmpty(){
    return this.items.length == 0;
  }
}