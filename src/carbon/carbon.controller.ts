import { Controller, Get, Patch } from '@nestjs/common';

@Controller('carbon')
export class CarbonController {


    @Get('')
    listAll(): any[] {
        return []
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
