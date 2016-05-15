// ex14 - destructuring

var [a, b] = [3, 1];

console.log(a);  // console: 3
console.log(b);  // console: 1

var myobj = { x: 10, y: 100 };
var {x, y} = myobj;

console.log(x);  // console: 10
console.log(y);  // console: 100