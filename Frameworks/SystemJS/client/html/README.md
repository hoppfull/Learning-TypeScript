## Client html source
#### Import *SystemJS* module
By importing this module we can use it to manage other modules located in our global namespace:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/systemjs/0.20.12/system.js"
        integrity="sha256-Aoj16fina1TqHL4PHoZ7swSL79hpfmgRSild8mste+U="
        crossorigin="anonymous"></script>
```
#### Import module of choice
In this example I've decided to import the `underscore.js`-module for the sake of simplicity.
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"
        integrity="sha256-obZACiHd7gkOk9iIL/pimWMTJ4W/pBsKu+oZnSeBIek="
        crossorigin="anonymous"></script>
```
#### Import file including our *TypeScript* application
Since we've told the *TypeScript*-compiler to output everything into a single file, we only need to import that single file here. No need to account for all source files in `index.html`:
```html
<script src="app.js"></script>
```
#### Manage modules in the global namespace with *SystemJS*
Once the *SystemJS* module is downloaded, the variable `_` will be available in the global namespace but in our TypeScript `import`-statement we want to import aspects of the underscore-module with the `import`-statement using `'underscore'` so we arrange this setup with the following code. And we manage the `App` module we've implemented by importing it with a `Promise` so that we can use it once it's finished loading:
```html
<script>
    System.set('underscore', System.newModule(_))
    const appPromise = System.import('App')
</script>
```
#### Start the `App` module
When the body has loaded and the `App` module has finished loading, run `App.main()` to start the application:
```html
<body onload="appPromise.then(module => module.App.main())">
</body>
```