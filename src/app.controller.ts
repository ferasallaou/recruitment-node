import { Controller, Get, UseGuards } from '@nestjs/common';
import { HelpersService } from './user/helpers.service';
import { HelpersService as CertificateHelper } from './carbon/helpers.service';
@Controller()
export class AppController {
  constructor(
    private userHelper: HelpersService,
    private certificatesHelper: CertificateHelper
  ) { }

  async onModuleInit() {
    await this.userHelper.seed()
    await this.certificatesHelper.seed()

  }
}
