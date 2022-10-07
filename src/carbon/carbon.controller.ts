import { Controller, forwardRef, Get, Inject, Patch } from '@nestjs/common';
import { CarbonService } from './carbon.service';

@Controller('carbon')
export class CarbonController {
    constructor(
        private carbonCertificateService: CarbonService) { }

    @Get('')
    async get() {
        return await this.carbonCertificateService.listAll()
    }


    @Get('me')
    getCarbonByOwner(): any[] {
        return []
    }


    @Patch('transfer')
    transferCertificate() {
        return true
    }


}
