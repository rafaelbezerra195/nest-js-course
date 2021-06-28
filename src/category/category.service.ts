import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './interface/category.interface';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const { category } = createCategoryDto;
    const categoryFound = await this.categoryModel.findOne({ category }).exec();

    if (categoryFound) {
      throw new BadRequestException(`Category ${category} already exists.`);
    }

    const categoryCreated = new this.categoryModel(createCategoryDto);
    return categoryCreated.save();
  }
}
