import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './interface/category.interface';

@Controller('api/v1/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async categoryPost(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Get()
  async categoryGet(): Promise<Category[]> {
    return this.categoryService.selectCategories();
  }

  @Get('/:_id')
  async selectCategoryById(@Param('_id') _id: string): Promise<Category> {
    return this.categoryService.selectCategory(_id);
  }
}
