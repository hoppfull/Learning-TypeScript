const fs = require('fs')

const filename = process.argv[2]

fs.readFile(filename + '.ply', 'utf8', (err, data) => {
    const lines = data.split('\n').filter(line => line !== '')

    const rec = (head, tail) =>
        head === 'end_header' ? tail : rec(tail[0], tail.slice(1))
    const modelData = rec(lines[0], lines.slice(1))

    const indexDataPattern = /(\d)\s(\d)+\s(\d)+\s(\d)+/
    const meshData = modelData.filter(d => !d.match(indexDataPattern))
    const indexData = modelData.filter(d => d.match(indexDataPattern))

    const json = [
        '{\n',
        '\t"mesh": [\n',
        meshData.map(d => '\t\t' + d.split(' ').join(', ')).join(',\n') + '\n',
        '\t],\n',
        '\t"indices": [\n',
        indexData.map(d => '\t\t' + d.slice(2).split(' ').join(', ')).join(',\n') + '\n',
        '\t]\n',
        '}'
    ]

    fs.writeFile(filename + '.json', json.reduce((acc, line) => acc + line, ""), err => { })
})
