var Ajax;
(function (Ajax) {
    Ajax.loadText = (filename) => ajax(filename, response => response);
    Ajax.loadJSON = (filename) => ajax(filename, JSON.parse);
    const ajax = (filename, callback) => new Promise(resolve => {
        const req = new XMLHttpRequest();
        req.onreadystatechange = () => req.readyState === 4 && req.status === 200
            ? resolve(callback(req.responseText)) : null;
        req.open('GET', filename, true);
        req.send();
    });
})(Ajax || (Ajax = {}));
