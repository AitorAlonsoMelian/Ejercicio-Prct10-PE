"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yargs = require("yargs");
const net = require("net");
const client = net.connect({ port: 60300 });
yargs.command({
    command: 'send',
    describe: '',
    builder: {
        comando: {
            describe: 'Comando a ejecutar',
            demandOption: true,
            type: 'string'
        },
        args: {
            describe: 'Argumentos',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        if (typeof argv.comando == 'string' && typeof argv.args == 'string') {
            let object = { command: argv.comando, arguments: argv.args };
            client.write(JSON.stringify(object));
            client.end();
        }
    }
});
yargs.parse();
let wholeData = '';
client.on('data', (data) => {
    wholeData = wholeData + data.toString();
});
client.on('end', () => {
    console.log(JSON.parse(wholeData).out);
});
