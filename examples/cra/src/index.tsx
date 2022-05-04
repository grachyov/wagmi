import * as React from 'react'
import * as ReactDOM from 'react-dom/client'

import { Provider, configureChains, createClient, defaultChains } from 'wagmi'
import { alchemyProvider } from 'wagmi/apiProviders/alchemy'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

import { Buffer } from 'buffer'

import { App } from './App'
import reportWebVitals from './reportWebVitals'

// polyfill Buffer for client
if (!window.Buffer) {
  window.Buffer = Buffer
}

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
    new InjectedConnector({ chains, options: { name: 'Injected' } }),
  ],
  provider,
  webSocketProvider,
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Provider client={client}>
      <App />
    </Provider>
  </React.StrictMode>,
)

reportWebVitals()
