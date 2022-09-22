import express, { Request, Response, Router } from "express";
import statusCodes from "../../statusCodes/statusCodes";
import { AppDataSource } from "../dataSource";
import { Admin } from "../models/users";

const router: Router = express.Router()
router.route("/:adminId").get(async (req: Request, res: Response) => {
    const { adminId } = req.params
    const adminRepository = AppDataSource.getRepository(Admin)
    try {
        const admin: Admin[] = await adminRepository.find({
            relations: {
                user: true
            }, where: {
                id: Number(adminId)
            }
        })
        res.status(200).json(admin)
    } catch (err) {
        res.status(statusCodes.HTTP_400_BAD_REQUEST).json({ err: "bad request" })

    }
}).put(async (req: Request, res: Response) => {
    const { adminId } = req.params
    const adminRepository = AppDataSource.getRepository(Admin)
    const { isAdmin } = req.body
    try {
        const admin: Admin | null = await adminRepository.findOne({
            where: {
                id: Number(adminId)
            }
        })
        if (admin) {
            admin.isAdmin = isAdmin
            adminRepository.save(admin)
            res.status(statusCodes.HTTP_200_OK).json(admin)
        } else {
            res.status(statusCodes.HTTP_404_NOT_FOUND).json({ msg: "admin doesnt exist" })

        }
    } catch (err) {
        res.status(statusCodes.HTTP_400_BAD_REQUEST).json({ err: "bad request" })

    }
}).delete(async (req: Request, res: Response) => {
    const { adminId } = req.params
    const adminRepository = AppDataSource.getRepository(Admin)
    const admin: Admin | null = await adminRepository.findOne({
        where: {
            id: Number(adminId)
        }
    })
    if (admin) {
        adminRepository.delete(admin)
        res.status(statusCodes.HTTP_200_OK).json({ msg: "admin deleted successfully" })
    } else {
        res.status(statusCodes.HTTP_404_NOT_FOUND).json({ msg: "admin doesnt exist" })
    }

})

export { router as adminDetailRoutes }