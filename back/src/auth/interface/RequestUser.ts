import { Request } from "express";
import User from "src/user/User.entity";


interface RequestUser extends Request {
	user: User;
	err: number | string;
}

export default RequestUser;