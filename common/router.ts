import * as rest from 'restify'

export abstract class Router {
    abstract applyRouter(app: rest.Server) : any
}