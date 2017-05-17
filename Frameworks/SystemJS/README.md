# SystemJS example
Relevant code and further details can be found in `./client/source` and `./client/html`
### Requirements:
* Node.js
* TypeScript
* ts-node
### Usage:
1. Download this repo
2. Run `install.bat` to download dependencies for server and client (Nothing is installed on your system)
3. Run `compile.bat` to compile TypeScript client source code
4. Run `start.bat` to start server
5. Navigate to `localhost:8000` in your favorite web browser to see result of application

**Warning:** Always read foreign .bat-files to make sure they aren't harmful!

---
## Description
This example demonstrates how you can use *SystemJS* and *TypeScript* to bundle your code and modules, and still use modules downloaded at runtime from a *cdn* such as `cdnjs.com`.

This is in my opinion vastly more simpler than using whatever combination of *webpack*, *browserify*, *babel* or whatevs...

It is my understanding that this technique has the advantage that browsers can cache modules downloaded from sites like `cdnjs.com`. Thus if a user has already visited your site before or any other site that uses the same module, your site will load much quicker for the user.