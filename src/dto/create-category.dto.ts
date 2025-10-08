import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsString({ message: 'name of the category must be a string' })
    @IsNotEmpty({ message: 'name must not be empty' })
    name: string;
}