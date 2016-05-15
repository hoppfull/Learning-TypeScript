/* ex07 - generics
 */

function f<T>(x:T):T {
    return x;
}

console.log(f<string>("yo"));
console.log(f<number>(5));