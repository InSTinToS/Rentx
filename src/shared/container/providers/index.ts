import { IDateProvider } from './DateProvider/IDateProvider'
import { DayjsDateProvider } from './DateProvider/infra/DayjsDateProvider/DayjsDateProvider'
import { IMailProvider } from './MailProvider/IMailProvider'
import { EtherealMailProvider } from './MailProvider/infra/EtherealMailProvider'
import { IStorageProvider } from './StorageProvider/IStorageProvider'
import { LocalStorageProvider } from './StorageProvider/infra/LocalStorageProvider'
import { S3StorageProvider } from './StorageProvider/infra/S3StorageProvider'

import { container } from 'tsyringe'

container.registerSingleton<IDateProvider>(
  'DayjsDateProvider',
  DayjsDateProvider
)

container.registerSingleton<IMailProvider>(
  'EtherealMailProvider',
  EtherealMailProvider
)

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  process.env.LOCAL_STORAGE === 'true'
    ? LocalStorageProvider
    : S3StorageProvider
)
