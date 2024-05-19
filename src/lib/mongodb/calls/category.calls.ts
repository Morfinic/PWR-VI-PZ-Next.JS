"use server";

import {CreateCategoryParams} from "@/types";
import {connToDb} from "@/lib/mongodb/db";
import Category from "@/lib/mongodb/db/models/category.model";

export async function createCategory({name, attrs}: CreateCategoryParams) {
  try {
    await connToDb();

    const newCategory = await Category.create({
      name: name,
      attrs: attrs
    });

    return JSON.parse(JSON.stringify(newCategory));
  } catch (error) {
    console.error(error);
  }
}

export async function getAllCategories() {
  try {
    await connToDb();

    const categories = await Category.find();

    return JSON.parse(JSON.stringify(categories))
  } catch (error) {
    console.error(error);
  }
}
