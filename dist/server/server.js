"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rest = __importStar(require("restify"));
const mongoose_1 = __importDefault(require("mongoose"));
const restify_cors_middleware_1 = __importDefault(require("restify-cors-middleware"));
const error_handler_1 = require("./error.handler");
class Server {
    constructor() {
        this.app = rest.createServer({
            name: "Servidor",
            version: "0.1"
        });
    }
    initializeDb() {
        mongoose_1.default.Promise = global.Promise;
        return mongoose_1.default.connect("mongodb://localhost/zumbi");
    }
    initRouters(routers) {
        return new Promise((resolve, reject) => {
            try {
                const corsOptions = {
                    preflightMaxAge: 86400,
                    origins: ["*"],
                    allowHeaders: ["authorization"],
                    exposeHeaders: ["x-custom-header"]
                };
                const cors = restify_cors_middleware_1.default(corsOptions);
                this.app.pre(cors.preflight);
                this.app.use(cors.actual);
                // this.app.use(rest.plugins.)
                this.app.use(rest.plugins.queryParser());
                this.app.use(rest.plugins.bodyParser());
                for (let router of routers) {
                    router.applyRouter(this.app);
                }
                this.app.listen(3000, () => {
                    resolve(this.app);
                });
                this.app.on("restifyError", error_handler_1.handleError);
            }
            catch (err) {
                reject(err);
            }
        });
    }
    bootstrap(routers = []) {
        return this.initializeDb().then(() => this.initRouters(routers).then(() => this));
    }
}
exports.Server = Server;
