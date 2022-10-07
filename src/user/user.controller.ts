import { Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    async onModuleInit() {
        await this.userService.seed()
    }

    @Post()
    login(): any {

    }
}
