import { Request } from "express";
import User from "src/user/User.entity";


interface RequestUser extends Request {
	user: User;
}

export default RequestUser;