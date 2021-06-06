import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import * as _ from 'lodash';

export class PlayerParamValitadionPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (_.isEmpty(value))
      throw new BadRequestException(
        `parameter ${metadata.data} should not be empty`,
      );

    return value;
  }
}
