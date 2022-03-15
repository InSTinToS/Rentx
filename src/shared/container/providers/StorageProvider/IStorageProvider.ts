type TSave = (file: string, folder: string) => Promise<string>
type TDelete = (file: string, folder: string) => Promise<void>

interface IStorageProvider {
  save: TSave
  delete: TDelete
}

export type { IStorageProvider, TSave, TDelete }
