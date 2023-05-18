import { Injectable, Body, Req } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";
import { Request } from "express";
import { string } from "joi";

@Injectable()
export class LocalAuthStrategy extends PassportStrategy(Strategy) {
	constructor(private authService: AuthService) {
		super({
			usernameField: 'mail',
			confirmPassword: string,
		});
	}

	async validate(mail: string, password: string,): Promise<any> {
		return this.authService.validateUser(mail, password);
	}
}