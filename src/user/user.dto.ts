import { IsEmail, IsNotEmpty } from "class-validator"

export class UserData {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    password: string
}