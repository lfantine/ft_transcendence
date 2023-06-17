import { Request } from "express";
import User from "src/user/User.entity";


interface RequestLog extends Request {
	id: string;
	mail: string;
	username: string;
	is42: boolean;
	err: number | string;
}

export default RequestLog;