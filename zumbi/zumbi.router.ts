import * as rest from 'restify'
import { Router } from '../common/router';
import { Zumbi } from './zumbi.model'

class ZumbiRouter extends Router {
    applyRouter(app: rest.Server) {
        app.get('/zombies', (req,resp,next) => {
            Zumbi.find().then(zombies => {
                resp.json(zombies)
                return next()
            }).catch(next)
        })
        
        app.get('/zombie/:id', (req,resp,next) => {
            Zumbi.findById(req.params.id).then(zombie => {
                if(zombie) {
                    resp.json(zombie)
                    return next()
                }
                resp.send(404)
                return next()
            }).catch(next)
        })
		
		app.get('/zombie/:armor', (req, resp, next) => {
			Zumbi.findById(req.params.id).then(zombie => {
				if(zombie) {
					resp.json(zombie)
					return next()
				}
				resp.send(404)
				return next()
			}).catch(next)
		})

        app.post('/zombie', (req, resp, next) => {
            let zombie = new Zumbi(req.body)
            zombie.save().then(zombie => {
                resp.json(zombie)
            }).catch(next)
            return next()
        })

        app.del('/zombie/:id', (req, resp, next) => {
            Zumbi.remove({_id:req.params.id}).exec().then((result) => {
                if (result.n) {
                    resp.send(204)
                } else {
                    resp.send(404)
                }
            }).catch(next)
        })

        app.patch('/zombie/:id', (req, resp, next) => {
            const options = {new : true}
            Zumbi.findByIdAndUpdate(req.params.id, req.body, options).then(zombie => {
                resp.json(zombie)
                return next()
            }).catch(next)
        })
    }
}

export const zombieRouter = new ZumbiRouter