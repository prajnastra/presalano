import { Network } from '../types'

export const getBlockForestInfo = (network: Network) => {
  if (
    !process.env.MAINNET_BLOCKFOREST_KEY ||
    !process.env.PREPROD_BLOCKFOREST_KEY ||
    !process.env.PREVIEW_BLOCKFOREST_KEY
  ) {
    throw `Blockfrost keys not found for: ${network}`
  }

  if (network === Network.Mainnet) {
    return {
      api: 'https://cardano-mainnet.blockfrost.io/api/v0',
      key: process.env.MAINNET_BLOCKFOREST_KEY,
      explorer: 'https://cardanoscan.io',
      admin_wallet:
        'addr1qxklrkss0l964gt7jnlqaur33mq7dgkpal3tjqp8z68fr9y90dfntwa6aztcej59auqf0x79f3vjlwqscdkeej3vwmtsk5q2ud',
    }
  } else if (network === Network.Preprod) {
    return {
      api: 'https://cardano-preprod.blockfrost.io/api/v0',
      key: process.env.PREPROD_BLOCKFOREST_KEY,
      explorer: 'https://preprod.cardanoscan.io',
      admin_wallet:
        'addr_test1qzklrkss0l964gt7jnlqaur33mq7dgkpal3tjqp8z68fr9y90dfntwa6aztcej59auqf0x79f3vjlwqscdkeej3vwmts4za2sj',
    }
  } else if (network === Network.Preview) {
    return {
      api: 'https://cardano-preview.blockfrost.io/api/v0',
      key: process.env.PREVIEW_BLOCKFOREST_KEY,
      explorer: 'https://preview.cardanoscan.io',
      admin_wallet:
        'addr_test1qzklrkss0l964gt7jnlqaur33mq7dgkpal3tjqp8z68fr9y90dfntwa6aztcej59auqf0x79f3vjlwqscdkeej3vwmts4za2sj',
    }
  }

  throw `Unknown blockfrost network used: ${network}`
}
