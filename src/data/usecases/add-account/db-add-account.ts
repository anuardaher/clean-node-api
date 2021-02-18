import { AddAccountRespository } from '../../protocols/add-account-repository'
import { AddAccount, Encrypter, AccountModel, AddAccountModel } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  private readonly accountRepository: AddAccountRespository

  constructor (encrypter: Encrypter, accountRepository: AddAccountRespository) {
    this.encrypter = encrypter
    this.accountRepository = accountRepository
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password)
    return this.accountRepository.add(({ ...accountData, password: hashedPassword }))
  }
}
