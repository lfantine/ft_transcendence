import { Body, Controller, HttpCode, Post, UseGuards, Req, Res} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { LocalAuthGuard } from './localAuthGuard';
import { request } from 'http';
import RequestUser from './interface/RequestUser';
import { MyAuthGuard } from './myAuthGuard';

@Controller('auth')
export class AuthController {

	constructor(private readonly authService: AuthService) {}

	@Post('register')
	async register(@Body('mail') mail: string, @Body('password') password: string){
		return this.authService.register({mail, password});
	}

	@HttpCode(200)
	@Post('login')
	@UseGuards(MyAuthGuard)
	async login(@Req() request: RequestUser, @Res() response: Response){
		const cookie = await this.authService.login(request);
		response.setHeader('Set-Cookie', cookie);
		return response.send(request.user);
	}
}
