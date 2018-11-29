import * as rest from "restify";
import mongoose from "mongoose";
import corsMiddleware from "restify-cors-middleware";
import { Router } from "../common/router";
import { handleError } from "./error.handler";

export class Server {
	app: rest.Server = rest.createServer({
		name: "Servidor",
		version: "0.1"
	});

	initializeDb(): any {
		(<any>mongoose).Promise = global.Promise;
		return mongoose.connect("mongodb://localhost/zumbi");
	}

	initRouters(routers: Router[]): Promise<any> {
		return new Promise((resolve, reject) => {
			try {
				const corsOptions: corsMiddleware.Options = {
					preflightMaxAge: 86400,
					origins: ["*"],
					allowHeaders: ["authorization"],
					exposeHeaders: ["x-custom-header"]
				};
				const cors: corsMiddleware.CorsMiddleware = corsMiddleware(corsOptions);

				this.app.pre(cors.preflight);
				this.app.use(cors.actual);
				this.app.use(rest.plugins.queryParser());
				this.app.use(rest.plugins.bodyParser());

				for (let router of routers) {
					router.applyRouter(this.app);
				}

				this.app.listen(3000, () => {
					resolve(this.app);
				});

				this.app.on("restifyError", handleError);
			} catch (err) {
				reject(err);
			}
		});
	}

	bootstrap(routers: Router[] = []): Promise<Server> {
		return this.initializeDb().then(() =>
			this.initRouters(routers).then(() => this)
		);
	}
}
