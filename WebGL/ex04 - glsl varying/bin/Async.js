var Async;
(function (Async) {
    function start(generator) {
        const iterator = generator();
        function rec(iteration) {
            iteration.value.then(arg => {
                const nextIteration = iterator.next(arg);
                if (!nextIteration.done)
                    rec(nextIteration);
            });
        }
        rec(iterator.next());
    }
    Async.start = start;
    function loadDoc(filename) {
        return new Promise(resolve => {
            const req = new XMLHttpRequest();
            req.onreadystatechange = () => {
                if (req.readyState === 4 && req.status === 200)
                    resolve(req.responseText);
            };
            req.open('GET', filename, true);
            req.send();
        });
    }
    Async.loadDoc = loadDoc;
})(Async || (Async = {}));
