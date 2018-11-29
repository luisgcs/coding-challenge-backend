"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server/server");
const zumbi_router_1 = require("./zumbi/zumbi.router");
const server = new server_1.Server;
server.bootstrap([zumbi_router_1.zombieRouter]).then(server => {
    console.log(`Servidor executando na porta ${server.app.address().port}`);
}).catch(error => {
    console.log(`Servidor nao foi iniciado pois: ${error}`);
    process.exit(1);
});
