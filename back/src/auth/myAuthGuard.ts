import { CanActivate, ExecutionContext, Injectable, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Request, Response } from "express";
import { log } from "console";

@Injectable()
export class MyAuthGuard implements CanActivate {

	constructor(private authService: AuthService) {}

	async canActivate(
		context: ExecutionContext,
	  ): Promise<boolean> {
		try {
			const request = context.switchToHttp().getRequest();
			const user = await this.authService.myValidate(request);
			if (user === '1' || user === '2')
			{
				request.err = user;
				return true;
			}
			request.user = user;
			return true;
		} catch (e) { return false;}
	}
}