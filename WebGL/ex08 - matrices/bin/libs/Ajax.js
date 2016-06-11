var Ajax;
(function (Ajax) {
    Ajax.loadText = (source) => ajax(source, response => response);
    Ajax.loadJSON = (source) => ajax(source, JSON.parse);
    const ajax = (source, callback) => new Promise(resolve => {
        const req = new XMLHttpRequest();
        req.onreadystatechange = () => req.readyState === 4 && req.status === 200
            ? resolve(callback(req.responseText)) : null;
        req.open('GET', source, true);
        req.send();
    });
    Ajax.loadImage = (source) => new Promise(resolve => {
        const image = new Image();
        image.onload = () => {
            resolve(image);
        };
        image.src = source;
    });
})(Ajax || (Ajax = {}));
