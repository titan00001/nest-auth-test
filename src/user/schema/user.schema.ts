import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = User & Document;

export class Phone {
  number: string;

  countryCode: string;
}

@Schema()
export class User {
  @Prop()
  id: mongoose.Types.ObjectId;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  email?: string;

  // emailVerified?: boolean;

  // phone?: Phone;

  // phoneVerified?: boolean;

  @Prop()
  fullName: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
