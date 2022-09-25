import express, { NextFunction, Request, Response } from "express"
import { Session } from "express-session";
import { User } from "../models/users";
import statusCodes from "../statusCodes/statusCodes"
// import { ISession } from "../types";


export const checkisAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.session.isAuthenticated) {
        console.log("authenticated")
        next()
    } else {
        res.status(statusCodes.HTTP_401_UNAUTHORISED).json({ message: "not authenticated" })
    }

}