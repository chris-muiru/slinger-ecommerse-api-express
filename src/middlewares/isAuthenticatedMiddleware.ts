import express, { NextFunction, Request, Response } from "express"
import statusCodes from "../../statusCodes/statusCodes"

export const checkisAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        console.log("authenticated")
        next()
    } else {
        res.status(statusCodes.HTTP_401_UNAUTHORISED).json({ message: "not authenticated" })
    }

}