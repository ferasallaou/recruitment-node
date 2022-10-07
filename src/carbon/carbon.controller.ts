import { Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/user/user.guard';
import { CarbonService } from './carbon.service';
import { User } from 'src/user/user.decorator';
@Controller('carbon')
@UseGuards(AuthGuard)
export class CarbonController {
    constructor(
        private carbonCertificateService: CarbonService) { }

    @Get('')
    async get() {
        return await this.carbonCertificateService.listAll()
    }


    @Get('me')
    async getCarbonByOwner(@User() { userId }: { userId: string }) {
        return await this.carbonCertificateService.findByOwner(userId)
    }


    @Patch('transfer/:certificateId/:userId')
    async transferCertificate(
        @Param('userId') newUserId: string,
        @Param('certificateId') certificateId: string,
        @User() { userId: ownerId }: { userId: string }
    ) {
        return await this.carbonCertificateService.transfer(certificateId, newUserId, ownerId)
    }


}
