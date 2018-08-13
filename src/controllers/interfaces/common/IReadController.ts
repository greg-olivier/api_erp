import * as express from "express";

interface IReadController {
    find: express.RequestHandler;
    findOne: express.RequestHandler;
}
export default IReadController;