import { CanActivate, ExecutionContext, Injectable, Req } from "@nestjs/common";
import { DashboardService } from "../dashboard.service";

@Injectable()
export class isAuthGuard implements CanActivate {

	constructor(private dashService: DashboardService) {}

	async canActivate(
		context: ExecutionContext,
	  ): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const need = await this.dashService.isAuthVerif(request);
		if (need === undefined)
			return false;
		request.myData = need;
		return true;
	}
}