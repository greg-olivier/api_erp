import * as express from "express";

interface IReadController {
    find: express.RequestHandler;
    findById: express.RequestHandler;
}
export default IReadController;