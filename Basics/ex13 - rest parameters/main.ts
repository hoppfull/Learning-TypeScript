/* ex13 - rest parameters
 */

function f(n:number, ...ns:number[]):number {
    return n + ns.reduce((a, b) => a + b);
}

console.log(f(1, 1, 1, 1, 1));  // console: 5