import { Body, Controller, Post } from '@nestjs/common';
import { HelpersService } from './helpers.service';
import { UserData } from './user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService,
        private helpersService: HelpersService) { }

    async onModuleInit() {
        await this.helpersService.seed()
    }


    @Post('/login')
    async login(@Body() userData: UserData): Promise<any> {
        return await this.userService.findOne(userData)
    }
}
