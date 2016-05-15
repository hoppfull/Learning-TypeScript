/* ex08 - inheritance
 */
interface Animal {
    sound:() => void;
}

class Mammal implements Animal {
    noise:string;
    
    constructor(noise:string) {
        this.noise = noise;
    }
    
    public sound():void {
        console.log(this.noise);
    }
}

class Dog extends Mammal {
    constructor(bark:string) {
        super(bark);
    }
}

var doggy = new Dog("woff");
doggy.sound();