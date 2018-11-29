import { Server } from './server/server'
import { zombieRouter } from './zumbi/zumbi.router'

const server: Server = new Server

server.bootstrap([zombieRouter]).then(server => {
    console.log(`Servidor executando na porta ${server.app.address().port}`)
}).catch( error => {
    console.log(`Servidor nao foi iniciado pois: ${error}`)
    process.exit(1)
})