import * as repo from '@/backend/repositories'

/**
 * Função para verificar a conexão com o banco de dados.
 * @returns {Promise<boolean>} Retorna `true` se a conexão foi bem-sucedida, `false` caso contrário.
 */
const pingDatabase = async () => {
  try {
    await repo.pingDatabase()
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}

export { pingDatabase }
