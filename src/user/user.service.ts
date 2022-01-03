import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './schema/user.schema';
import * as mongoose from 'mongoose';
import { FilterQuery, UpdateWriteOpResult, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly model: Model<UserDocument>,
  ) {}
  hashPassword(plainPassword: string): Promise<string> {
    return Promise.resolve(plainPassword);
  }
  verifyPassword(
    id: mongoose.Types.ObjectId,
    plainPassword: string,
    hashedPassword?: string,
  ): Promise<boolean> {
    return Promise.resolve(true);
  }
  async create(
    userData: Omit<User, 'id' | '_id' | 'createdAt' | 'updatedAt'>,
  ): Promise<User> {
    return await new this.model({
      //   email: 'piyush@mithyalabs.com',
      //   fullName: 'Piyush Arya',
      //   password: '1234',
      ...userData,
    }).save();
  }
  async updateOne(
    query: FilterQuery<UserDocument>,
    userData: Partial<Omit<User, 'id' | '_id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<UpdateWriteOpResult> {
    // return {
    //   id: '124556',
    //   createdAt: Date.now(),
    //   updatedAt: Date.now(),
    //   email: 'piyush@mithyalabs.com',
    //   fullName: 'Piyush Arya',
    //   password: '1234',
    // };
    return await this.model.updateOne(query, userData);
  }
  async findByEmail(email: string): Promise<User> {
    return await this.model.findOne({ email: email });

    // {
    //   //   id: '124556',
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    //   email: 'piyush@mithyalabs.com',
    //   fullName: 'Piyush Arya',
    //   password: '1234',
    // };
  }
  async findById(id: mongoose.Types.ObjectId): Promise<User> {
    // return Promise.resolve({
    //   id: '124556',
    //   createdAt: Date.toString(),
    //   updatedAt: Date.now(),
    //   email: 'piyush@mithyalabs.com',
    //   fullName: 'Piyush Arya',
    //   password: '1234',
    // });
    return await this.model.findById(id);
  }
  isRegistered(email: string): Promise<boolean> {
    return Promise.resolve(true);
  }
}
