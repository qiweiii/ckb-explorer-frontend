import React, { useEffect, useContext } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { HomeHeaderPanel, HomeHeaderItemPanel, BlockPanel, ContentTable, TableMorePanel } from './styled'
import Content from '../../components/Content'
import {
  TableTitleRow,
  TableTitleItem,
  TableContentRow,
  TableContentItem,
  TableMinerContentItem,
} from '../../components/Table'
import BlockCard from '../../components/Card/BlockCard'
import BlockHeightIcon from '../../assets/block_height.png'
import TransactionIcon from '../../assets/transactions.png'
import BlockRewardIcon from '../../assets/block_reward_white.png'
import MinerIcon from '../../assets/miner.png'
import TimestampIcon from '../../assets/timestamp.png'
import MoreLeftIcon from '../../assets/more_left.png'
import MoreRightIcon from '../../assets/more_right.png'
import { shannonToCkb } from '../../utils/util'
import { parseTime, parseSimpleDate } from '../../utils/date'
import { BLOCK_POLLING_TIME, CachedKeys } from '../../utils/const'
import { storeCachedData, fetchCachedData } from '../../utils/cached'
import { localeNumberString } from '../../utils/number'
import { isMobile } from '../../utils/screen'
import browserHistory from '../../routes/history'
import { StateWithDispatch, PageActions } from '../../contexts/providers/reducer'
import { AppContext } from '../../contexts/providers'

const BlockchainItem = ({ blockchain }: { blockchain: BlockchainData }) => {
  return (
    <HomeHeaderItemPanel
      clickable={!!blockchain.clickable}
      onKeyPress={() => {}}
      onClick={() => {
        if (blockchain.clickable) browserHistory.push('./charts')
      }}
    >
      <div className="blockchain__item__value">{blockchain.value}</div>
      <div className="blockchain__item__name">{blockchain.name}</div>
      {blockchain.tip && (
        <div className="blockchain__item__tip">
          <div className="blockchain__item__tip__content">{blockchain.tip}</div>
        </div>
      )}
    </HomeHeaderItemPanel>
  )
}

interface BlockchainData {
  name: string
  value: string
  tip: string
  clickable?: boolean
}

const parseHashRate = (hashRate: string | undefined) => {
  return hashRate ? `${localeNumberString((Number(hashRate) * 1000).toFixed(), 10)} gps` : '- -'
}

const parseBlockTime = (blockTime: string | undefined) => {
  return blockTime ? parseTime(Number(blockTime)) : '- -'
}

export default ({ dispatch }: React.PropsWithoutRef<StateWithDispatch & RouteComponentProps>) => {
  const { homeBlocks, statistics } = useContext(AppContext)
  const [t] = useTranslation()

  useEffect(() => {
    const cachedBlocks = fetchCachedData<Response.Wrapper<State.Block>[]>(CachedKeys.Blocks)
    if (cachedBlocks) {
      dispatch({
        type: PageActions.UpdateHomeBlocks,
        payload: {
          homeBlocks: cachedBlocks,
        },
      })
    }
    const cachedStatistics = fetchCachedData<State.Statistics>(CachedKeys.Statistics)
    if (cachedStatistics) {
      dispatch({
        type: PageActions.UpdateStatistics,
        payload: {
          statistics: cachedStatistics,
        },
      })
    }
  }, [dispatch])

  useEffect(() => {
    storeCachedData(CachedKeys.Blocks, homeBlocks)
    storeCachedData(CachedKeys.Statistics, statistics)
  }, [homeBlocks, statistics])

  useEffect(() => {
    dispatch({
      type: PageActions.TriggerHome,
      payload: {
        dispatch,
      },
    })
    const listener = setInterval(() => {
      dispatch({
        type: PageActions.TriggerHome,
        payload: {
          dispatch,
        },
      })
    }, BLOCK_POLLING_TIME)
    return () => {
      if (listener) {
        clearInterval(listener)
      }
    }
  }, [dispatch])

  const BlockchainDatas: BlockchainData[] = [
    {
      name: t('blockchain.best_block'),
      value: localeNumberString(statistics.tip_block_number),
      tip: t('blockchain.best_block_tooltip'),
    },
    {
      name: t('block.difficulty'),
      value: localeNumberString(statistics.current_epoch_difficulty, 10),
      tip: t('blockchain.difficulty_tooltip'),
      clickable: true,
    },
    {
      name: t('blockchain.hash_rate'),
      value: parseHashRate(statistics.hash_rate),
      tip: t('blockchain.hash_rate_tooltip'),
      clickable: true,
    },
    {
      name: t('blockchain.average_block_time'),
      value: parseBlockTime(statistics.current_epoch_average_block_time),
      tip: t('blockchain.average_block_time_tooltip'),
    },
  ]

  return (
    <Content>
      <HomeHeaderPanel>
        <div className="blockchain__item__container">
          {BlockchainDatas.map((data: BlockchainData) => {
            return <BlockchainItem blockchain={data} key={data.name} />
          })}
        </div>
      </HomeHeaderPanel>
      <BlockPanel className="container">
        {isMobile() ? (
          <ContentTable>
            <div className="block__green__background" />
            <div className="block__panel">
              {homeBlocks &&
                homeBlocks.map((block: any, index: number) => {
                  const key = index
                  return block && <BlockCard key={key} block={block.attributes} />
                })}
            </div>
          </ContentTable>
        ) : (
          <ContentTable>
            <TableTitleRow>
              <TableTitleItem image={BlockHeightIcon} title={t('home.height')} />
              <TableTitleItem image={TransactionIcon} title={t('home.transactions')} />
              <TableTitleItem image={BlockRewardIcon} title={t('home.block_reward')} />
              <TableTitleItem image={MinerIcon} title={t('block.miner')} />
              <TableTitleItem image={TimestampIcon} title={t('home.time')} />
            </TableTitleRow>
            {homeBlocks &&
              homeBlocks.map((block: any, index: number) => {
                const key = index
                return (
                  block && (
                    <TableContentRow key={key}>
                      <TableContentItem
                        content={localeNumberString(block.attributes.number)}
                        to={`/block/${block.attributes.number}`}
                      />
                      <TableContentItem content={block.attributes.transactions_count} />
                      <TableContentItem content={localeNumberString(shannonToCkb(block.attributes.reward))} />
                      <TableMinerContentItem content={block.attributes.miner_hash} />
                      <TableContentItem content={parseSimpleDate(block.attributes.timestamp)} />
                    </TableContentRow>
                  )
                )
              })}
          </ContentTable>
        )}
        <TableMorePanel>
          <div>
            <img src={MoreLeftIcon} alt="more left" />
            <Link to="/block/list">
              <div className="table__more">{t('home.more')}</div>
            </Link>
            <img src={MoreRightIcon} alt="more right" />
          </div>
        </TableMorePanel>
      </BlockPanel>
    </Content>
  )
}
