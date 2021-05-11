class MyArray {
  constructor() {
    this.length = 0;
    this.data = {};
  }
  get(index) {
    // o(1)
    return this.data[index]
    
  }

  push(item) {
    // o(1)
    this.data[this.length] = item;
    this.length++;
  }
  pop(){ //o[1]
      const lastItem =this.data[this.length -1] //o[1]
      delete this.data[this.length - 1];//o[1]
      this.length--
      return lastItem
  }
  shift(){
      const firstItem =this.data[0]

      for (let i = 0; i < this.length-1; i++) {

        this.data[i] =this.data[i +1]
    
          
      }
      delete this.data[this.length -1]
      this.length--;
      return firstItem;

  }

  unshift(item){
      const tempArg ={}
  tempArg[0]=item;

    for (let i = 0; i < this.length ; i++) {
     tempArg[i+1] =this.data[i]

    }
    this.length++
    this.data=tempArg
      
  }
}

const myArgs =new MyArray()
myArgs.push("apple")
myArgs.push("mango")
myArgs.push("banana")

myArgs.get(1)
console.log(myArgs.unshift("grapes"));
console.log(myArgs.get(0));
console.log(myArgs);
