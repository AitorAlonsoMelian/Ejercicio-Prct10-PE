"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net = require("net");
const child_process_1 = require("child_process");
net.createServer({ allowHalfOpen: true }, (connection) => {
    let wholeData = '';
    connection.on('data', (data) => {
        wholeData += data;
        console.log(wholeData);
    });
    connection.on('end', () => {
        let object = JSON.parse(wholeData);
        let command = child_process_1.spawn(object.command, [object.arguments]);
        let wholeMessage = '';
        command.stdout.on('data', (chunk) => {
            wholeMessage += chunk;
        });
        command.on('close', () => {
            let objectToSend = { out: wholeMessage };
            connection.write(JSON.stringify(objectToSend));
            connection.end();
        });
    });
}).listen(60300, () => {
    console.log('Waiting');
});
