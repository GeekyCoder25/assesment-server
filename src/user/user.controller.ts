import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private cloudinary: CloudinaryService,
  ) {}
  @Get('')
  getUsers(): Promise<UserDto[]> {
    return this.userService.findAllUsers();
  }

  @Get(':email')
  async getUser(@Param('email') email): Promise<UserDto> {
    const result = await this.userService.findUser(email);
    if (!result) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Post()
  createUser(@Body() user: UserDto): Promise<UserDto> {
    const data = {
      email: user.email,
      role: 'user',
    };
    return this.userService.create(data);
  }

  @Put(':email/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPhoto(
    @Param('email') email: string,
    @UploadedFile()
    file: Express.Multer.File,
  ): Promise<string> {
    if (!file.mimetype.startsWith('image')) {
      throw new HttpException(
        'File uploaded is not an image',
        HttpStatus.BAD_REQUEST,
      );
    } else if (file.size > Number(process.env.MAX_FILE_UPLOAD) * 1024 * 1024) {
      throw new HttpException(
        `Please upload an image less than ${Number(
          process.env.MAX_FILE_UPLOAD,
        )}MB`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const saveFileName = `user_photo_${email}`;
    const result = await this.userService.findUser(email);
    if (!result) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    let response = '';
    await this.cloudinary
      .uploadImage(file, saveFileName)
      .then((result) => {
        this.userService.updatePhoto(email, {
          photo: result.secure_url,
        });
        response = result.secure_url;
      })
      .catch(() => {
        throw new HttpException(
          'Error uploading file to server',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });

    return response;
  }
}
