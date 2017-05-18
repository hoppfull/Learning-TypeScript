## Client *TypeScript* source
### `package.json`:
Make sure type definitions for *underscore.js* is installed in the local *TypeScript* project directory (This can be done with the command `npm i -S @types/underscore`):
```json
"dependencies": {
    "@types/underscore": "^1.8.0"
}
```
### `tsconfig.json`:
#### Setup *TypeScript* to work natively with *SystemJS*
`module` is set to `"system"` to make *TypeScript* work natively with *SystemJS*. `moduleResolution` is set to `"node"` to allow *TypeScript* to work with type definitions in regular node modules. `outFile` is set to output a single bundled file with modules organized in a way that *SystemJS* can work with:
```json
{
    "compilerOptions": {
        "module": "system",
        "moduleResolution": "node",
        "target": "es6",
        "noImplicitAny": true,
        "strictNullChecks": true,
        "noFallthroughCasesInSwitch": true,
        "outFile": "../bin/app.js"
    }
}
```
### `App.ts`:
#### Import the `'underscore'` module from global namespace
In this example everything is imported from `'underscore'` under the alias `us`:
```typescript
import * as us from 'underscore'
```
#### Setup module `App` structure
The module is exported so that *SystemJS* or other *TypeScript* modules may load it during runtime:
```typescript
export module App {
    ...
}
```
#### Use module with alias `us`
Module can be expected to exist during runtime and be set with the alias `us` for usage in our *TypeScript* module:
```typescript
export function main() {
    us.each(["huey", "dewey", "louie"], s => console.log(s))
}
```
### Console Output (in browser):
```
huey
dewey
louie
```