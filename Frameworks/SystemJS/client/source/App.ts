import * as us from 'underscore'

export module App {
    export function main() {
        us.each(["huey", "dewey", "louie"], s => console.log(s))
    }
}
