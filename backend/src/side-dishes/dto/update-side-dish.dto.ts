import { PartialType } from '@nestjs/mapped-types';
import { CreateSideDishDto } from './create-side-dish.dto';

export class UpdateSideDishDto extends PartialType(CreateSideDishDto) {}
