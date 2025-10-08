import { IsNotEmpty } from "class-validator";

export class UpdateCategoryDto {
    @IsNotEmpty({ message: 'name must not be empty' })
    @IsNotEmpty()
    name: string;
}