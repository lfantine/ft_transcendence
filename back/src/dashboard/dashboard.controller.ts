import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { isAuthGuard } from './guard/isAuthGuard';
import RequestPlus from './interface/myData';
import { UserService } from 'src/user/user.service';
import { User42Service } from 'src/user42/user42.service';

@Controller('dashboard')
export class DashboardController {
	constructor(private readonly dashService: DashboardService, 
				private configService: ConfigService,
				private userService: UserService,
				private user42Service: User42Service,
	) {}

	@Get('info')
	@UseGuards(isAuthGuard)
	async infoProfil(@Req() request: RequestPlus, @Res() response: Response) {
		const { myData } = request;
		let user;
		if (myData.is42 === true) {
			// is a 42 user
			user = await this.user42Service.findById(myData.id);
		}
		else {
			// is a banal user
			user = await this.userService.findById(myData.id);
		}
		const retData = {desc: user.desc, pic: user.pic, username: user.username, level: user.level, MMR: user.MMR, mail: user.mail};
		return response.send(retData);
	}

	@Post('pic')
	@UseGuards(isAuthGuard)
	async postPic(@Req() request: RequestPlus, @Res() response: Response) {
		const { image } = request.body;
		if (image === null || image === undefined)
			return response.send('-1');
		const messRet = await this.dashService.postPic(Buffer.from(image, 'base64'), request.myData.id, request.myData.is42);
		return response.send(messRet);
	}

	@Post('username')
	@UseGuards(isAuthGuard)
	async postUsername(@Req() request: RequestPlus, @Res() response: Response) {
		const newUsername = request.body.username;
		if (newUsername === null || newUsername === undefined)
			return response.send('-1');
		const messRet = await this.dashService.postUsername(newUsername, request.myData.id, request.myData.is42);
		return response.send(messRet);
	}

	@Post('desc')
	@UseGuards(isAuthGuard)
	async postDesc(@Req() request: RequestPlus, @Res() response: Response) {
		const newDesc = request.body.desc;
		if (newDesc === null || newDesc === undefined)
			return response.send('-1');
		const messRet = await this.dashService.postDesc(newDesc, request.myData.id, request.myData.is42);
		return response.send(messRet);
	}
}
