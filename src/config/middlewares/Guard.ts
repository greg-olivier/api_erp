import jwt from '../../tools/token';
import {NextFunction, Request, Response} from "express";

export const guard = (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers['authorization'];

    if (token) {
            token = token.split('Bearer ' || 'Basic ')[1];
            jwt.verify(token).then( () => {
                next();
            }).catch(err => {
                return res.status(500).send({
                    success: false,
                    message: err.name + ': ' + err.message
                });
            })

    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
};