import { CanActivate, ExecutionContext, Injectable, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Request, Response } from "express";
import User from "src/user/User.entity";
import User42 from "src/user42/User42.entity";
import RequestLog from "./interface/RequestLog";

@Injectable()
export class VerifGuard implements CanActivate {

	constructor(private authService: AuthService) {}

	async canActivate(
		context: ExecutionContext,
	  ): Promise<boolean> {
		  const request = context.switchToHttp().getRequest();
		//   console.log('- - - - - - -');
		//   console.log(request.cookies);
		//   console.log('- - - - - - -');
		const data = await this.authService.ValidateIsLog(request);
		request.id = data.id;
		request.username = data.username;
		request.mail = data.mail;
		request.is42 = data.is42;
		return true;
	}
}