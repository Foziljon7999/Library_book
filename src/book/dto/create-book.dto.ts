import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBookDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    author: string;

    @IsNotEmpty()
    @IsNumber()
    year: number;

    @IsNotEmpty()
    @IsString()
    genre: string;

    @IsBoolean()
    isAvailable: boolean;
}
