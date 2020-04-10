import CONFIG from '../config'

export const BLOCK_POLLING_TIME = 4000
export const MAX_CONFIRMATION = 1000
export const BLOCKCHAIN_ALERT_POLLING_TIME = 10000
export const RESIZE_LATENCY = 500
export const LOADING_WAITING_TIME = 500
export const DELAY_BLOCK_NUMBER = 11
export const PAGE_CELL_COUNT = 200

export const MAINNET_PRIMARY_THEME_COLOR = '#3cc68a'
export const MAINNET_SECONDARY_THEME_COLOR = '#3cc68a'
export const TESTNET_PRIMARY_THEME_COLOR = '#617bbd'
export const TESTNET_SECONDARY_THEME_COLOR = '#85A1EA'

export const SUDT_EMAIL_SUBJECT = 'Submit sUDT Info'
export const SUDT_EMAIL_BODY = `
Title: Submit sUDT Information%0a%0d
Type Script:%0a%0d
    Code Hash:%0a%0d
    Hash Type:%0a%0d
    Args:%0a%0d

Information:%0a%0d
   Full Name: 32 length max%0a%0d
   Symbol: 8 length max / ASCII%0a%0d
   Decimal: 0~32%0a%0d
   Description:%0a%0d
   Website:%0a%0d
   Icon File: attachment (40 x 40)%0a%0d
   Other Info:%0a%0d
`

export const HttpErrorCode = {
  NOT_FOUND_ADDRESS: 1010,
  ADDRESS_TYPE_ERROR: 1023,
}

export const SearchFailType = {
  CHAIN_ERROR: 'chain_error',
}

export const CachedKeys = {
  AppLanguage: `${CONFIG.CHAIN_TYPE}-AppLanguage`,
}

export enum CellState {
  NONE = 0,
  LOCK = 1,
  TYPE = 2,
  DATA = 3,
}

export enum CellType {
  Input = 'input',
  Output = 'output',
}

export enum DaoType {
  Normal = 'normal',
  Deposit = 'nervos_dao_deposit',
  Withdraw = 'nervos_dao_withdrawing',
  Udt = 'udt',
}

export enum DataType {
  LockScript = 'lock_script',
  TypeScript = 'type_script',
  Data = 'data',
}

export enum PageParams {
  PageNo = 1,
  PageSize = 10,
  MaxPageSize = 100,
}

export enum ListPageParams {
  PageNo = 1,
  PageSize = 25,
  MaxPageSize = 100,
}

export const ChartColors = ['#3182bd', '#66CC99']

export interface ContractHashTag {
  codeHash: string
  txHashes: string[] //  mainnet and aggron contract tx hash
  tag: string
  category: 'lock' | 'type'
}

export const ContractHashTags: ContractHashTag[] = [
  {
    codeHash: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',
    txHashes: [
      '0x6495cede8d500e4309218ae50bbcadb8f722f24cc7572dd2274f5876cb603e4e-0',
      '0x71a7ba8fc96349fea0ed3a5c47992e3b4084b031a42264a018e0072e8172e46c-0',
    ],
    tag: 'secp256k1',
    category: 'lock',
  },
  {
    codeHash: '0x5c5069eb0857efc65e1bca0c07df34c31663b3622fd3876c876320fc9634e2a8',
    txHashes: [
      '0x6495cede8d500e4309218ae50bbcadb8f722f24cc7572dd2274f5876cb603e4e-1',
      '0x71a7ba8fc96349fea0ed3a5c47992e3b4084b031a42264a018e0072e8172e46c-1',
    ],
    tag: 'multi-sig',
    category: 'lock',
  },
  {
    codeHash: '0x6a3982f9d018be7e7228f9e0b765f28ceff6d36e634490856d2b186acf78e79b',
    txHashes: ['0x69c70d65832cdfd97fe78d32eb25f840232f6b8cb6445464f11dad891b11fd83-0'],
    tag: 'anyone-can-pay',
    category: 'lock',
  },
  {
    codeHash: '0x82d76d1b75fe2fd9a27dfbaa65a039221a380d76c926f378d3f81cf3e7e13f2e',
    txHashes: [
      '0x96fea0dfaac1186fbb98fd452cb9b13976f9a00bcce130035fe2e30dac931d1d-2',
      '0xe2fb199810d49a4d8beec56718ba2593b665db9d52299a0f9e6e75416d73ff5c-2',
    ],
    tag: 'nervos dao',
    category: 'type',
  },
  {
    codeHash: '0x48dbf59b4c7ee1547238021b4869bceedf4eea6b43772e5d66ef8865b6ae7212',
    txHashes: ['0x0e7153f243ba4c980bfd7cd77a90568bb70fd393cb572b211a2f884de63d103d-0'],
    tag: 'sudt',
    category: 'type',
  },
]
