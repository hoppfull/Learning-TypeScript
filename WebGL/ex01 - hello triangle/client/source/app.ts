module App {
    export function main() {
        // Retrieve canvas reference:
        const canvas = <HTMLCanvasElement | null>document.getElementById('myCanvas');
        if (!canvas) throw "myCanvas does not exist!"
    }
}
