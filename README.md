# StableOps Wallet UI

[![npm version](https://img.shields.io/npm/v/@stableops/wallet-ui)](https://www.npmjs.com/package/@stableops/wallet-ui) [![npm downloads](https://img.shields.io/npm/dm/@stableops/wallet-ui)](https://www.npmjs.com/package/@stableops/wallet-ui) [![License](https://img.shields.io/npm/l/@stableops/wallet-ui)](./LICENSE) [![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org)

[中文文档](./README.zh-CN.md)

StableOps Wallet UI provides React components for wallet payments: a controlled
WalletConnect dialog, wallet icons and logos, and USDC/USDT token icons. Wallet
connections and transfers are handled by `@stableops/wallet-sdk`.

## Installation

Requires React and React DOM 18 or newer.

```bash
pnpm add @stableops/wallet-ui @stableops/wallet-sdk react react-dom
```

Import the dialog stylesheet once. Importing the JavaScript entry or scanning
Tailwind classes does not load these styles:

```tsx
import { WalletConnectDialog, TokenIcon, WalletIcon } from '@stableops/wallet-ui'
import '@stableops/wallet-ui/walletconnect-dialog.css'

<TokenIcon symbol="USDC" size={24} />
<WalletIcon wallet={{ name: 'MetaMask', brand: 'metamask' }} />
```

## Controlled WalletConnect dialog

Pass connection state from `controller.getState()` and `controller.subscribe()`.
`qrCode` is a QR image data URL generated from the `uri_ready` state's `uri`.
The host owns wallet selection, opening and closing the dialog, and payment:

```tsx
import { WalletConnectDialog, type WalletConnectDialogProps } from '@stableops/wallet-ui'

export function MobileWalletDialog(props: WalletConnectDialogProps<{ id: string; name: string }>) {
  return <WalletConnectDialog {...props} />
}
```

| Required props                                     | Purpose                                               |
| -------------------------------------------------- | ----------------------------------------------------- |
| `open`, `projectId`, `available`                   | Visibility and connection availability                |
| `wallets`, `selectedWallet`                        | Wallet list and selection                             |
| `state`, `qrCode`, `error`, `copied`               | Connection state, QR image, errors, and copy feedback |
| `onSelectWallet`, `onBack`, `onClose`, `onCopyUri` | Host actions                                          |

Optional props include `themeColor`, `walletLinkMode`, `renderWalletIcon`,
`paymentPending`, `onRetryPayment`, `connectionRefreshAvailable`, and
`onRefreshConnection`. Selecting a wallet should call the SDK controller's
`connect({ walletId })`. A successful connection does not itself submit payment.

`messageOverrides` customizes individual labels and error text.
`createWalletConnectDialogMessages(overrides)` creates a full message set that can
also be passed through `messages`. `TokenIcon` accepts `symbol` (`USDC` or `USDT`),
`size`, `className`, and `style`. `WalletIcon` accepts a wallet name and optional
`brand`, `iconUrl`, `initials`, or `Glyph`. `WALLET_LOGOS`,
`walletConnectDialogClassNames`, and `walletLink` are also exported.

## Documentation

For complete guides, API references, and wallet integration examples, see the
official documentation:

- English docs: https://stableops.dev/en/docs
- Chinese docs: https://stableops.dev/zh/docs

## License

This package is licensed under `Apache-2.0`. See [LICENSE](./LICENSE).
