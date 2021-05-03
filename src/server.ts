import * as net from 'net'
import {spawn} from 'child_process'

net.createServer({allowHalfOpen: true}, (connection) => {

    let wholeData: string = ''
    connection.on('data', (data) => {
        wholeData += data
        console.log(wholeData)
    })

    connection.on('end', () => {
        let object = JSON.parse(wholeData)
        let command = spawn(object.command, [object.arguments])
        let wholeMessage: string = ''
        command.stdout.on('data', (chunk) => {
            wholeMessage += chunk
        })
        command.on('close', () => {
            let objectToSend = {out: wholeMessage}
            connection.write(JSON.stringify(objectToSend))
            connection.end()
        })
    })

}).listen(60300, () => {
    console.log('Waiting')
})
