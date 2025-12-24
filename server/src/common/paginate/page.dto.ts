import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";

export class PageDto<T> {
    @IsArray()
    @ApiProperty({ isArray: true })
    readonly data: T[] | {};

    @ApiProperty({ type: 'number' })
    readonly total?: number; // Agrega el campo total

    constructor(data: T[], total?: number) {
        this.data = data;
        this.total = total;
    }
}
