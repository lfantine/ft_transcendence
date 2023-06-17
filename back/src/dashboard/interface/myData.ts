import { Request } from "express";


interface RequestPlus extends Request {
	myData: any;
	err: number | string;
}

export default RequestPlus;