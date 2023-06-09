import { Module } from '@nestjs/common';
import { User42Service } from './user42.service';
import { User42Controller } from './user42.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import User42 from './User42.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User42])],
  providers: [User42Service],
  controllers: [User42Controller],
  exports: [User42Service]
})
export class User42Module {}
