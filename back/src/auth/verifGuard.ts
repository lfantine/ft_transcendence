import { CanActivate, ExecutionContext, Injectable, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Request, Response } from "express";
import User from "src/user/User.entity";
import User42 from "src/user42/User42.entity";

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
		const user = await this.authService.ValidateIsLog(request);
		request.user = user;
		return true;
	}
}