import { IVerifyOptions, Strategy as LocalStrategy } from "passport-local"
import { User } from "../models/users"
import { AppDataSource } from "../dataSource"
import { PassportStatic } from "passport"
import { Repository } from "typeorm"
import * as bcrypt from "bcrypt"

const getUserByName = async (name: string) => {
	const userRepo = AppDataSource.getRepository(User)
	return await userRepo.findOne({
		where: {
			username: name,
		},
	})
}

const getUserById = async (userId: number) => {
	const userRepo = AppDataSource.getRepository(User)
	return await userRepo.findOneBy({
		id: userId
	})
}
export const initializePassport = (passport: PassportStatic) => {
	const authenticateUser = async (username: string, password: string, done: (error: any, user?: any, options?: IVerifyOptions | undefined) => void) => {

		const user = await getUserByName(username)
		if (user == null) {
			return done(null, false, { message: "no user with that username" })
		}

		try {
			if (await bcrypt.compare(password, user.password)) {
				return done(null, user)
			} else {
				return done(null, false, { message: "password incorrect" })
			}
		} catch (err) {
			console.log("error here")
			return done(err)
		}
	}
	passport.use(
		new LocalStrategy(
			{
				usernameField: "username",
			},
			authenticateUser
		)
	)

	passport.serializeUser((user: any, done) => {
		return done(null, user.id)
	})
	passport.deserializeUser(async (id: number, done) => {
		return done(null, await getUserById(id))
	})
}