import {Document, model, models, Schema} from "mongoose";

export interface IProduct extends Document {
  _id: string;
  name: string;
  description?: string;
  imageUrl: string;
  price: number;
  category: {_id: string; name: string};
}

const ProductSchema = new Schema({
  name: {type: String, required: true},
  description: {type: String},
  imageUrl: {type: String, required: true},
  price: {type: Number},
  category: {type: Schema.Types.ObjectId, ref: "Category"},
})

const Product = models.Product || model("Product", ProductSchema);

export default Product;
