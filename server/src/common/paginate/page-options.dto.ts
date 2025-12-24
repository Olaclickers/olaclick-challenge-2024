import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsOptional, Max, Min } from "class-validator";

export class PageOptionsDto {

    @ApiPropertyOptional({
        minimum: 1,
        description: 'Número de página',
        required: false,
        example: 1,
        type: Number
    })
    @Type(() => Number)
    @Min(1)
    @IsOptional()
    @IsInt()
    page?: number;

    @ApiPropertyOptional({
        minimum: 1,
        maximum: 50,
        description: 'Número de elementos por página.',
        required: false,
        example: 10,
        type: Number
    })
    @Type(() => Number)
    @Min(1)
    @Max(50)
    @IsOptional()
    @IsInt()
    limit?: number;

    get skip(): number | null {
        if (this.page && this.limit) {
            return (this.page - 1) * this.limit;
        }
        return null
    }
}