/* ex04 - interface
 */

interface Point {
    x:number;
    y:number;
}

function distance(p1:Point, p2:Point) {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

console.log(distance({x:0, y:0}, {x:1, y:1}));