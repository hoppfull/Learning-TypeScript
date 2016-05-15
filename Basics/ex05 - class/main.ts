/* ex05 - class
 */

class MyClass {
    // fields:
    private x:number;
    y:string; // public by default
    // initialize fields:
    constructor(public a:string, private b:string, c:number) {
        this.x = c;
        this.y = b;
    }
}

    var myObject = new MyClass("knatte", "fnatte", 12);
    
    console.log(myObject.a);