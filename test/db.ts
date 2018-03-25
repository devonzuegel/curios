import * as Sequelize from 'sequelize'
import {sequelize} from '@server/models'
import {createNamespace} from 'continuation-local-storage'

// Establish a CLS transaction: http://bit.ly/2CYhODh
// Basically, everything executed inside `withinTransaction` will implicitly run
// inside the transaction.
const transactionNamespace = createNamespace('curios-web/sequelize-transaction')
Sequelize.useCLS(transactionNamespace)

const ROLLBACK_MSG =
  'Error: Transaction cannot be committed because it has been finished with state: rollback'

export const withinTransaction = async (
  cb: (t: Sequelize.Transaction) => Promise<void>
) => {
  try {
    await sequelize.transaction(
      {
        isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE,
        autocommit: false,
      },
      async transaction => {
        await cb(transaction)
        await transaction.rollback()
        return true
      }
    )
    return true
  } catch (error) {
    if (error.toString() === ROLLBACK_MSG) return true
    throw error
  }
}
