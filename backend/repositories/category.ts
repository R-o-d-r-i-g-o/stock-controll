import { prisma, prismaTransaction } from './_prisma'
import moment from 'moment'

import * as t from './_types'

const getCategoryBy = async (filter: t.getCategoryByProps) => {
  const category = await prisma.category.findFirstOrThrow({
    where: {
      id: filter.id || undefined,
      name: filter.name || undefined
    },
    include: {
      Shoe: {
        where: { deleted_at: null },
        orderBy: { size: 'asc' },
      },
    },
  })

  return category
}

const getCategoryShoesCount = async (filter: t.getShoesPaginatedProps) => {
  console.log("filters", filter)
  const shoesGroupedByCategory = await prisma.category.count({
    where: { deleted_at: null },
  });

  return shoesGroupedByCategory
}

const getCategoryShoesPaginated = async (filter: t.getShoesPaginatedProps) => {
  const shoesGroupedByCategory = await prisma.category.findMany({
    skip: filter.skip,
    take: filter.take,
    where: { deleted_at: null },
    include: {
      Shoe: {
        where: { deleted_at: null },
        orderBy: { size: 'asc' },
      },
    },
  });

  return shoesGroupedByCategory
}

const deleteCategory = async (id: number) => {
  return await prismaTransaction(async () => {
    const deletedCategory = await prisma.category.update({
      where: { id },
      data: { deleted_at: moment.utc().toDate() }
    })
    return deletedCategory
  })
}

const createCategory = async (data: t.createCategoryProps) => {
  const { id } = await prisma.category.create({
    data: {
      name: data.name,
      sole: data.sole,
      color: data.color,
      description: data.note,
    }
  })
  return id
}

export {
  deleteCategory,
  createCategory,
  getCategoryBy,
  getCategoryShoesCount,
  getCategoryShoesPaginated,
}