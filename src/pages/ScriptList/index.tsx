import { useEffect } from 'react'
import Content from '../../components/Content'
import i18n from '../../utils/i18n'
import styles from './styles.module.scss'
import { MainnetContractHashTags, TestnetContractHashTags } from '../../constants/scripts'
import { isMainnet } from '../../utils/chain'

const scriptDataList = isMainnet() ? MainnetContractHashTags : TestnetContractHashTags

type ScriptAttributes = Record<'name' | 'description', string> &
  Partial<Record<'code' | 'rfc' | 'deprecated' | 'website', string>>

const scripts = new Map<string, ScriptAttributes>([
  [
    'secp256k1_blake160',
    {
      name: 'SECP256K1/blake160',
      description: 'SECP256K1/blake160 is the default lock script to verify CKB transaction signature.',
      rfc: 'https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0024-ckb-genesis-script-list/0024-ckb-genesis-script-list.md#secp256k1blake160',
      code: 'https://github.com/nervosnetwork/ckb-system-scripts/blob/master/c/secp256k1_blake160_sighash_all.c',
    },
  ],
  [
    'secp256k1 / multisig / locktime',
    {
      name: 'SECP256K1/multisig',
      description: 'SECP256K1/multisig is a script which allows a group of users to sign a single transaction.',
      rfc: 'https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0024-ckb-genesis-script-list/0024-ckb-genesis-script-list.md#secp256k1multisig',
      code: 'https://github.com/nervosnetwork/ckb-system-scripts/blob/master/c/secp256k1_blake160_multisig_all.c',
    },
  ],
  [
    'secp256k1 / anyone-can-pay (deprecated)',
    {
      name: 'Anyone-Can-Pay Lock',
      description: 'anyone_can_pay allows a recipient to provide cell capacity in asset transfer.',
      rfc: 'https://github.com/nervosnetwork/rfcs/blob/30980b378fdaccc6e9d21a1c6b53363364fb4abc/rfcs/0026-anyone-can-pay/0026-anyone-can-pay.md',
      code: 'https://github.com/nervosnetwork/ckb-production-scripts/tree/deac6801a95596d74e2da8f2f1a6727309d36100',
      deprecated: 'https://github.com/nervosnetwork/rfcs/commit/89049fe771aae277ef729269c3920db60693aede',
    },
  ],
  [
    'secp256k1 / anyone-can-pay',
    {
      name: 'Anyone-Can-Pay Lock',
      description: 'anyone_can_pay allows a recipient to provide cell capacity in asset transfer.',
      rfc: 'https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0026-anyone-can-pay/0026-anyone-can-pay.md',
      code: 'https://github.com/nervosnetwork/ckb-production-scripts/blob/e570c11aff3eca12a47237c21598429088c610d5/c/anyone_can_pay.c',
    },
  ],
  [
    'nervos dao',
    {
      name: 'Nervos DAO',
      description:
        'Nervos DAO is a smart contract with which users can interact the same way as any smart contract on CKB.',
      rfc: 'https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0023-dao-deposit-withdraw/0023-dao-deposit-withdraw.md',
      code: 'https://github.com/nervosnetwork/ckb-system-scripts/blob/master/c/dao.c',
    },
  ],
  [
    'sudt',
    {
      name: 'Simple UDT',
      description: 'Simple UDT provides a way for dapp developers to issue custom tokens on Nervos CKB.',
      rfc: 'https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0025-simple-udt/0025-simple-udt.md',
      code: 'https://github.com/nervosnetwork/ckb-production-scripts/blob/e570c11aff3eca12a47237c21598429088c610d5/c/simple_udt.c',
    },
  ],
  [
    'unipass v3',
    {
      name: 'Unipass',
      description: 'Simple UDT provides a way for dapp developers to issue custom tokens on Nervos CKB.',
      website: 'https://www.unipass.id/',
    },
  ],
])

const linkLablList: Array<keyof ScriptAttributes> = ['rfc', 'code', 'deprecated', 'website']

const ScriptList = () => {
  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash.slice(1))
    document.getElementById(hash)?.setAttribute('open', 'true')
  }, [])

  return (
    <Content>
      <div className={styles.title}>{i18n.t(`script_list.title`)}</div>
      <div className={styles.container}>
        {[...scripts].map(([label, meta]) => {
          const script = scriptDataList.find(s => s.tag === label)
          return (
            <details key={label} id={label}>
              <summary data-deprecated={!!meta.deprecated} title={meta.deprecated ? 'Deprecated' : undefined}>
                <b>{`${meta.name}:`}</b>
                {meta.description}
              </summary>
              <div>
                <h3>{`${i18n.t('script_list.links')}:`}</h3>
                <div className={styles.links}>
                  {linkLablList.map(key =>
                    meta[key] ? (
                      <a href={meta[key]} target="_blank" rel="noopener noreferrer">
                        {i18n.t(`script_list.link.${key}`)}
                      </a>
                    ) : null,
                  )}
                </div>
                {script ? (
                  <>
                    <h3>{`${i18n.t(`script_list.on_chain_data`)}:`}</h3>
                    {script.codeHashes.map((codeHash: string, idx: number) => (
                      <pre key={codeHash}>
                        {`{
  "code_hash": "${codeHash}",
  "hash_type": "${script.hashType}",
  "out_point": {
    "tx_hash": "${script.txHashes[idx]?.split('-')[0]}",
    "index": "0x${(+script.txHashes[idx]?.split('-')[1]).toString(16)}"
  },
  "dep_type": "${script.depType}"
}`}
                      </pre>
                    ))}
                  </>
                ) : null}
              </div>
            </details>
          )
        })}
      </div>
    </Content>
  )
}

export default ScriptList
