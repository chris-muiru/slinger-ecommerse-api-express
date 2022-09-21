// import { Request, Response, NextFunction } from "express";
// import { User } from "../models/connection";
// 
// interface Auth {
//     username: string,
//     password: string
// }
// export const Authentication = async (req: Request, res: Response, next: NextFunction) => {
//     let data: Auth = req.body
//     let user = await User.findOne({
//         where: {
//             username: data.username
//         }
//     })
//     res.status(200).json(data)
// 
// }
