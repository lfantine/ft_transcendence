import { Body, Controller, HttpCode, Post, Get, UseGuards, Req, Res, HttpException, HttpStatus} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { LocalAuthGuard } from './localAuthGuard';
import { request } from 'http';
import RequestUser from './interface/RequestUser';
import { MyAuthGuard } from './myAuthGuard';
import { VerifGuard } from './verifGuard';

@Controller('auth')
export class AuthController {

	constructor(private readonly authService: AuthService) {}

	@Post('register')
	async register(@Body('mail') mail: string, @Body('password') password: string, @Body('username') username: string, @Body('confirmPassword') confirmPassword: string, @Res() response: Response){
		if (password != confirmPassword)
		{throw new HttpException('Please enter 2 times the same password', HttpStatus.BAD_REQUEST);}
		const data = await this.authService.register({mail, password, username});
		return response.send(data);
	}

	@HttpCode(200)
	@Post('login')
	@UseGuards(MyAuthGuard)
	async login(@Req() request: RequestUser, @Res() response: Response){
		const { err } = request;
		if (err === '1' || err === '2')
			return response.send(err);
		const cookie = await this.authService.login(request);
		request.res.setHeader('Set-Cookie', cookie);
		return response.send(request.user);
	}

	@HttpCode(200)
	@Get('isLogin')
	@UseGuards(VerifGuard)
	async isLogin(@Req() request: RequestUser, @Res() response: Response){
		console.log(`user = ${ request.user }`);
		if (request.user === undefined){
			const userF = {id: undefined, mail: undefined, password: undefined, username: undefined};
			request.user = userF;
		}
		return response.send(request.user);
	}

	@HttpCode(200)
	@Post('logout')
	@UseGuards(VerifGuard)
	async logout(@Req() request: RequestUser, @Res() response: Response){
		response.setHeader('Set-Cookie', this.authService.getCookieForLogout());
		response.send();
	}
}
