import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as _ from 'lodash';
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

  async selectCategories(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async selectCategory(category: string): Promise<Category> {
    const cat = await this.categoryModel.findOne({ category }).exec();
    if (_.isNil(cat)) throw new NotFoundException('Category not found.');

    return cat;
  }
}
