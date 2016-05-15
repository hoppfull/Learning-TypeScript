/* ex05 - class
 */
var MyClass = (function () {
    // initialize fields:
    function MyClass(a, b, c) {
        this.a = a;
        this.b = b;
        this.x = c;
        this.y = b;
    }
    return MyClass;
})();
var myObject = new MyClass("knatte", "fnatte", 12);
console.log(myObject.a);
