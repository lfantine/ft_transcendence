import { Request } from "express";
import User from "src/user/User.entity";


interface TokenPayload{
	user: User;
}

export default TokenPayload;