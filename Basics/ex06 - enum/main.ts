/* ex06 - enum
 */

enum Choice { five, four };

function f (choice:Choice):number {
    return choice === Choice.five
        ? 5
        : 4;
}

console.log(f(Choice.five));