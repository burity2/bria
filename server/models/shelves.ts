'use strict';

import { InferSchemaType, model, Types } from 'mongoose';
import mongoose from './../db.js';
// const mongoose = require('mongoose'); //only for seeding mock data

const shelfSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export type ShelfType = InferSchemaType<typeof shelfSchema>;

export interface IShelf extends ShelfType, Document {
  userId: Types.ObjectId;
}
const Shelf = model<IShelf>('Shelf', shelfSchema);

export default Shelf;
