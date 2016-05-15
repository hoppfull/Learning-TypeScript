/* ex11 - optional parameters
 */

function f(x:number, y?:number) {
    return x + (y ? y : 1);
}

console.log(f(5));  // console: 6
console.log(f(5, 10));  // console: 15