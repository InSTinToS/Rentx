import { IMailProvider, SendMail } from './IMailProvider'

class MailProviderInMemory implements IMailProvider {
  sendMail: SendMail = async () => {
    console.log('E-mail sent! (MOCK)')
  }
}

export { MailProviderInMemory }
