import * as repo from '@/backend/repositories'
import * as t from './_types'

const getShoeBy = async (filter: t.getShoeByProps) => {
  const s = await repo.getShoeBy({ ...filter })

  return {
    id: s.id,
    sku: s.hash_code,
    size: s.size,
    price: s.price,
    categoryId: s.category_id,
    createdAt: s.created_at,
    deletedAt: s.deleted_at,
  };
}

const createShoe = async (data: t.createShoeProps) => {
  const shoeId = await repo.createShoe(data)
  return shoeId
}

const updateShoe = async (data: t.updateShoeProps) => {
  const shoe = await repo.updateShoe(data)
  return shoe
}

const deleteShoe = async (id: number) => {
  const shoe = await repo.deleteShoe(id)
  return shoe
}

export {
  getShoeBy,
  createShoe,
  deleteShoe,
  updateShoe
}