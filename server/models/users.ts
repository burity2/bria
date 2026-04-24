'use strict';

import { InferSchemaType, model } from 'mongoose';
import mongoose from './../db.js';
// const mongoose = require('mongoose'); //only for seeding mock data

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export type UserType = InferSchemaType<typeof userSchema>;

export interface IUser extends UserType, Document {}

const User = model<IUser>('User', userSchema);

export default User;
