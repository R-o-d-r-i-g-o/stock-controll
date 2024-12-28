import * as repo from '@/backend/repositories'
import * as t from './_types'

const getCategoryBy = async (filter: t.getCategoryByProps) => {
  const category = await repo.getCategoryBy(filter)
  const { id, name, sole, description, color, created_at, deleted_at, Shoe } = category;

  return {
    id, name, sole, color,
    note: description,
    createdAt: created_at,
    deletedAt: deleted_at,
    shoes: Shoe?.map(s => ({
      id: s.id,
      sku: s.hash_code,
      size: s.size,
      price: s.price.toNumber(),
      createdAt: s.created_at,
      deletedAt: s.deleted_at,
    })),
  };
}

const getShoesGroupedByCategoryPaginated = async (filter: t.getShoesGroupedByCategoryPaginatedProps) => {
  const parsedFilter = {
    skip: (filter.page - 1) * filter.size,
    take: filter.size
  }

  const categoryCount = await repo.getCategoryShoesCount(parsedFilter)
  const categoryList = await repo.getCategoryShoesPaginated(parsedFilter)

  const categoriesGrouped = categoryList?.map(category => {
    const { id, name, sole, description, color, created_at, deleted_at, Shoe } = category;

    const shoesGroupedBySize = Object.values(
      Shoe?.reduce<t.Accumulator>((acc, shoe) => {
        if (!acc[shoe.size])
          acc[shoe.size] = { size: shoe.size, shoes: [] };

        acc[shoe.size].shoes.push({ id: shoe.id, price: shoe.price.toNumber() });
        return acc;
      }, {})
    );

    return {
      id, name, sole, color,
      note: description,
      createdAt: created_at,
      deletedAt: deleted_at,
      groupedShoes: shoesGroupedBySize,
    };
  })

  return {
    meta: { ...filter, total: categoryCount },
    categories: categoriesGrouped
  }
}

const deleteCategory = async (id: number) => {
  const category = await repo.deleteCategory(id)
  return category
}

const createCategory = async (data: t.createCategoryProps) => {
  return await repo.createCategory(data)
}

const updateCategory = async (data: t.updateCategoryProps) => {
  await repo.updateCategory(data)
}

export {
  getShoesGroupedByCategoryPaginated,
  getCategoryBy,
  createCategory,
  deleteCategory,
  updateCategory
}