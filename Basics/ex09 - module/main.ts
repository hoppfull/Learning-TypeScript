/* ex09 - module
 */
module ex09 {
    export class Program {
        public static x:number = 42;
    }
    
    export function f(x:number) {
        return x + Program.x;
    }
}

console.log(ex09.Program.x);
console.log(ex09.f(7));