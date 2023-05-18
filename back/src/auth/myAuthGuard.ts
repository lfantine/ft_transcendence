import { CanActivate, ExecutionContext, Injectable, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Request, Response } from "express";

@Injectable()
export class MyAuthGuard implements CanActivate {

	constructor(private authService: AuthService) {}

	async canActivate(
		context: ExecutionContext,
	  ): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const user = await this.authService.myValidate(request);
		request.user = user;
		return true;
	}
}