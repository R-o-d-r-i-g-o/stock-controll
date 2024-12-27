import * as repo from '@/backend/repositories'
import * as t from './_types'

const getShoesGroupedByCategoryPaginated = async (filter: t.getShoesGroupedByCategoryPaginatedProps) => {
  const parsedFilter = {
    skip: (filter.page - 1) * filter.size,
    take: filter.size
  }

  const categoryCount = await repo.getShoesGroupedByCategoryCount(parsedFilter)
  const categoryList = await repo.getShoesGroupedByCategoryPaginated(parsedFilter)

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

export { getShoesGroupedByCategoryPaginated }