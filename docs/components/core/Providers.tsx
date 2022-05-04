import * as React from 'react'

import { Provider, configureChains, createClient, defaultChains } from 'wagmi'

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

import { alchemyProvider } from '../../../packages/core/apiProviders/alchemy'

const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
  alchemyProvider(process.env.NEXT_PUBLIC_ALCHEMY_ID),
])

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: { name: 'Injected' },
    }),
  ],
  provider,
  webSocketProvider,
})

type Props = {
  children?: React.ReactNode
}

export function Providers({ children }: Props) {
  return <Provider client={client}>{children}</Provider>
}
