import { IMailProvider, SendMail } from '../IMailProvider'

import { SES } from 'aws-sdk'
import fs from 'fs'
import handlebars from 'handlebars'
import nodemailer, { Transporter } from 'nodemailer'

class SESMailProvider implements IMailProvider {
  private client: Transporter

  constructor() {
    this.client = nodemailer.createTransport({
      SES: new SES({
        apiVersion: '2010-02-01',
        region: process.env.AWS_REGION
      })
    })
  }

  sendMail: SendMail = async ({ to, subject, path, variables }) => {
    const templateFileContent = fs.readFileSync(path).toString('utf-8')
    const templateParse = handlebars.compile(templateFileContent)
    const templateHTML = templateParse(variables)

    await this.client.sendMail({
      to,
      subject,
      html: templateHTML,
      from: 'Rentx <noreply@rentx.com.br>'
    })
  }
}

export { SESMailProvider }
