import {model, models, Document, Schema} from "mongoose";

export interface ICategory extends Document {
  _id: string;
  name: string;
  attrs: string[];
}

const CategorySchema = new Schema({
  name: {type: String, required: true, unique: true},
  attrs: {type: [String], required: true}
});

const Category = models.Category || model("Category", CategorySchema);

export default Category;
