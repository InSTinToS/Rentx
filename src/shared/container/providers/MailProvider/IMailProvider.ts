interface ISendMailParams {
  to: string
  path: string
  variables: any
  subject: string
}

type SendMail = (params: ISendMailParams) => Promise<void>

interface IMailProvider {
  sendMail: SendMail
}

export type { IMailProvider, SendMail }
