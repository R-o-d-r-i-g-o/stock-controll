import moment from 'moment'
import { prisma, prismaTransaction } from './_prisma'
import * as t from './_types'

const createShoe = async (shoe: t.createShoeProps) => {
  return await prismaTransaction(async () => {
    const { id } = await prisma.shoe.create({ data: shoe })
    return id
  })
}

const updateShoe = async (data: t.updateShoeProps) => {
  return await prismaTransaction(async () => {
    const shoe = await prisma.shoe.update({
      where: { id: data.id },
      data: {
        size: data.size || undefined,
        price: data.price || undefined,
        hash_code: data.sku || undefined,
        category_id: data.categoryId || undefined,
      }
    })
    return shoe
  })
}

const deleteShoe = async (id: number) => {
  return await prismaTransaction(async () => {
    const deletedShoe = await prisma.shoe.update({
      where: { id },
      data: { deleted_at: moment.utc().toDate() }
    })
    return deletedShoe
  })
}

const getShoeBy = async (filter: t.getShoeByProps) => {
  return await prisma.shoe.findFirstOrThrow({
    where: {
      id: filter.id || undefined,
      size: filter.size || undefined,
      price: filter.price || undefined,
      hash_code: filter.sku || undefined,
    }
  })
}

export {
  getShoeBy,
  deleteShoe,
  createShoe,
  updateShoe,
}