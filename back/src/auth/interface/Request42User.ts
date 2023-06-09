import { Request } from "express";
import User42 from "src/user42/User42.entity";


interface Request42User extends Request {
	user42: User42;
	err: number | string;
}

export default Request42User;