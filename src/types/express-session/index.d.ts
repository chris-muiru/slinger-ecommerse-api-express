import { User } from "../../models/users";
import "express-session";

declare module "express-session" {
    interface SessionData {
        user: User;
        isAuthenticated: boolean
    }
}