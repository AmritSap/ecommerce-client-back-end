

import {performance} from "perf_hooks"//1

const fruitBag=["apple","banana"]//1

const feelsLikeEatin = (array) => {
  //1
  const t0 = performance.now(); //1
  for (let i = 0; i < array.length; i++) {  //n
    if (array[i] === "apple") {
      //n
      console.log("your fruit"); //n
    }
  }
  const t1 = performance.now(); //1
  console.log(`this block of code took ${t1 - t0}ms`); //1
};;;

    feelsLikeEatin(fruitBag);//1

    // what is big o mnaotation

    // total= big O(7+3n)
      
    