/* ex12 - default parameters
 */

function f(x:number, y = 10):number {
    return x + y;
}

console.log(f(5));  // console: 15
console.log(f(5, 100));  // console: 105