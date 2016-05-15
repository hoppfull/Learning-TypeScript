/* ex01 - hello types
 * Javascript with types!
 */

// Type declaration! 
function f (x:number):number {
    return x * 2;
}

var x:number = 5;
x = 4;

// Type sensitivity:
document.body.textContent = f(x).toString();

/* The typesafety isn't entirely strict.
 * The compilation will go through with only a warning. Boo!
 */