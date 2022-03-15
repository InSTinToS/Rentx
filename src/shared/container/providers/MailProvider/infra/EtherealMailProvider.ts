import { IMailProvider, SendMail } from '../IMailProvider'

import fs from 'fs'
import handlebars from 'handlebars'
import nodemailer, { Transporter } from 'nodemailer'

class EtherealMailProvider implements IMailProvider {
  private client: Transporter

  constructor() {
    nodemailer
      .createTestAccount()
      .then(account => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: { user: account.user, pass: account.pass }
        })

        this.client = transporter
      })
      .catch(error => console.log(error))
  }

  sendMail: SendMail = async ({ to, subject, path, variables }) => {
    const templateFileContent = fs.readFileSync(path).toString('utf-8')
    const templateParse = handlebars.compile(templateFileContent)
    const templateHTML = templateParse(variables)

    const message = await this.client.sendMail({
      to,
      subject,
      html: templateHTML,
      from: 'Rentx <noreply@rentx.com.br>'
    })

    console.table({
      messageSent: message.messageId,
      previewUrl: nodemailer.getTestMessageUrl(message)
    })
  }
}

export { EtherealMailProvider }
