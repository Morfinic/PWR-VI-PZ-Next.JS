"use server";

import {CreateProductParams, GetAllProductsParams} from "@/types";
import { connToDb } from "../db";
import Product from "../db/models/product.model";
import Category from "../db/models/category.model";

function mapCategory(query: any) {
  return query
    .populate({
      path: "category",
      model: Category,
      select: "_id name attrs",
    })
}

async function getCategoryName(name: string){
  return Category.findOne({
    name: {$regex: name, $options: "i"},
  })
}

export async function createProduct({product}: CreateProductParams) {
  try {
    await connToDb();

    const newProduct = await Product.create({
      ...product,
      category: product.categoryId
    })

    return JSON.parse(JSON.stringify(newProduct));
  } catch (error) {
    console.log(error);
  }
}

export async function getProductById(productId: String){
  try {
    await connToDb();

    const product = await mapCategory(Product.findOne({_id: productId}))

    if(!product)
      throw new Error("Product not found");

    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    console.log(error);
  }
}

export async function getAllProducts({
  name,
  category,
  limit = 3
}: GetAllProductsParams) {
  try {
    await connToDb();

    const categoryCondition = category ?
      await getCategoryName(category): null;

    const conditions = {
      $and: [
        name ? {name: name}: {},
        categoryCondition ? {category: categoryCondition._id}: {}
      ]
    }

    const products = await mapCategory(Product.find(conditions));

    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.log(error);
  }
}
