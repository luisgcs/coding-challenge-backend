"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../common/router");
const zumbi_model_1 = require("./zumbi.model");
class ZumbiRouter extends router_1.Router {
    applyRouter(app) {
        app.get('/zombies', (req, resp, next) => {
            zumbi_model_1.Zumbi.find().then(zombies => {
                resp.json(zombies);
                return next();
            }).catch(next);
        });
        app.get('/zombie/:id', (req, resp, next) => {
            zumbi_model_1.Zumbi.findById(req.params.id).then(zombie => {
                if (zombie) {
                    resp.json(zombie);
                    return next();
                }
                resp.send(404);
                return next();
            }).catch(next);
        });
        // app.get('/zombie/:armor', (req, resp, next) => {
        // 	Zumbi.findById(req.params.armor).then(zombie => {
        // 		if(zombie) {
        // 			resp.json(zombie)
        // 			return next()
        // 		}
        // 		resp.send(404)
        // 		return next()
        // 	}).catch(next)
        // })
        // app.get('/zombie/:weapon', (req, resp, next) => {
        // 	Zumbi.findById(req.params.weapon).then(zombie => {
        // 		if(zombie) {
        // 			resp.json(zombie)
        // 			return next()
        // 		}
        // 		resp.send(404)
        // 		return next()
        // 	}).catch(next)
        // })
        app.post('/zombie', (req, resp, next) => {
            let zombie = new zumbi_model_1.Zumbi(req.body);
            zombie.save().then(zombie => {
                resp.json(zombie);
            }).catch(next);
            return next();
        });
        app.del('/zombie/:id', (req, resp, next) => {
            zumbi_model_1.Zumbi.remove({ _id: req.params.id }).exec().then((result) => {
                if (result.n) {
                    resp.send(204);
                }
                else {
                    resp.send(404);
                }
            }).catch(next);
        });
        app.patch('/zombie/:id', (req, resp, next) => {
            const options = { new: true };
            zumbi_model_1.Zumbi.findByIdAndUpdate(req.params.id, req.body, options).then(zombie => {
                resp.json(zombie);
                return next();
            }).catch(next);
        });
    }
}
exports.zombieRouter = new ZumbiRouter;
