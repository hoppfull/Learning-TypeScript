var Async;
(function (Async) {
    function start(generator) {
        const iterator = generator();
        const rec = i => !i.done ? i.value.then(arg => rec(iterator.next(arg))) : i.value;
        return rec(iterator.next());
    }
    Async.start = start;
})(Async || (Async = {}));
