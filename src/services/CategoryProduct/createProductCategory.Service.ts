import AppDataSource from '../../data-source';
import { CategoryFood } from '../../entities/categoryFoodEntity';
import { CategoryProduct, CategoryProductCreate } from './../../interfaces/category/categoryFood.interface';
export async function createProductCategoryService(category: CategoryProductCreate): Promise<CategoryProduct> {

    const categoryProductsRepository = AppDataSource.getRepository(CategoryFood)

    const exist = await categoryProductsRepository.findOneBy({ name: category.name })

    if (exist) {
        throw new Error('Category as already exist')
    }

    const newCategory = categoryProductsRepository.create(category)

    await categoryProductsRepository.save(newCategory)

    return newCategory

}