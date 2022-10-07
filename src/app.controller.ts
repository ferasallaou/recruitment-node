import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { HelpersService } from './user/helpers.service';
import { HelpersService as CertificateHelper } from './carbon/helpers.service';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private userHelper: HelpersService,
    private certificatesHelper: CertificateHelper
  ) { }

  async onModuleInit() {
    await this.userHelper.seed()
    await this.certificatesHelper.seed()

  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
