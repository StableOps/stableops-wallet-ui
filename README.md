# StableOps Wallet UI

[![npm version](https://img.shields.io/npm/v/@stableops/wallet-ui)](https://www.npmjs.com/package/@stableops/wallet-ui) [![npm downloads](https://img.shields.io/npm/dm/@stableops/wallet-ui)](https://www.npmjs.com/package/@stableops/wallet-ui) [![License](https://img.shields.io/npm/l/@stableops/wallet-ui)](./LICENSE) [![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org)

[中文文档](./README.zh-CN.md)

StableOps Wallet UI provides the shared React UI components used by StableOps
checkout surfaces: a WalletConnect payment dialog, wallet logos, and a wallet
icon renderer. These components are shared between the main checkout flow
(`apps/checkout`) and the interactive playground (`packages/playground`) so that
both surfaces render identical wallet selection and QR-code payment experiences.

This package is intended for applications that already integrate
`@stableops/wallet-sdk` and need a ready-made responsive dialog for WalletConnect
flows. It ships no wallet connection logic — that is handled by the SDK.

## Documentation

For complete guides, API references, and wallet integration examples, see the
official documentation:

- English docs: https://stableops.dev/en/docs
- Chinese docs: https://stableops.dev/zh/docs

## Features

- Responsive WalletConnect payment dialog (bottom sheet on mobile, centered modal
  on desktop) with wallet picker and QR-code scan page.
- Built-in wallet logo data URIs for MetaMask, Trust Wallet, Coinbase, Rainbow,
  OKX, Binance, Zerion, Ledger, WalletConnect, TronLink, and TokenPocket.
- Fallback wallet icon rendering by brand color and inline SVG glyph.
- Configurable copy via a typed `WalletConnectDialogCopy` contract (compatible
  with typesafe-i18n or similar i18n libraries).
- Self-contained; no StableOps workspace dependencies at runtime.
- Dual CJS and ESM builds with generated TypeScript declarations.

## Requirements

- A modern browser environment.
- React 19 or compatible version.
- A `@stableops/wallet-sdk` controller instance for connection management.

## Installation

```bash
pnpm add @stableops/wallet-ui
```

```bash
npm install @stableops/wallet-ui
```

```bash
yarn add @stableops/wallet-ui
```

## Quick Start

Wire the dialog into your checkout page and pass the WalletConnect controller
state from `@stableops/wallet-sdk`.

```tsx
import { useState } from 'react'
import { WalletConnectDialog } from '@stableops/wallet-ui'
import { createWalletConnectController } from '@stableops/wallet-sdk'

function CheckoutPage() {
  const [open, setOpen] = useState(false)
  const [wc, setWc] = useState<WalletConnectControllerState | null>(null)

  // Create the controller on user interaction (not on mount).
  const handlePayWithWallet = async () => {
    const controller = await createWalletConnectController({ /* … */ })
    setWc(controller)
    setOpen(true)
    controller.subscribe((state) => setWc(state))
  }

  return (
    <>
      <button onClick={handlePayWithWallet}>Pay with WalletConnect</button>
      <WalletConnectDialog
        open={open}
        copy={/* Your i18n labels wrapped as WalletConnectDialogCopy */}
        projectId="YOUR_REOWN_PROJECT_ID"
        available={true}
        wallets={/* Your wallet option list */}
        selectedWallet={wc?.selectedWallet ?? null}
        state={wc ?? { status: 'idle' }}
        qrCode={wc?.qrCode ?? null}
        error={null}
        onSelectWallet={(wallet) => wc?.selectWallet(wallet.id)}
        onBack={() => wc?.back()}
        onClose={() => { setOpen(false); wc?.disconnect() }}
      />
    </>
  )
}
```

For a complete integration example, see `apps/checkout` or `packages/playground`.

## Exports

| Export | Description |
|---|---|
| `WalletConnectDialog` | Full responsive dialog with wallet picker and QR-code page |
| `WalletConnectDialogCopy` | Type contract for localised copy strings |
| `WALLET_LOGOS` | Map of wallet id → base64 inline data URI (PNG / WebP) |
| `WalletIcon` | React component that renders a wallet logo or fallback brand glyph |

### `WalletConnectDialog`

A responsive modal component that implements the two-step flow:

1. **Wallet picker** — shows available wallets in a 3-column grid.
2. **QR code page** — displays the WalletConnect URI as a QR code with an
   overlay wallet logo, and offers an "Open Wallet" deep-link button and a
   "Copy URI" button.

On small screens the dialog renders as a bottom sheet; on `sm:` breakpoint and
above it centers as a rounded modal. Animations are handled by inline CSS
keyframes (no external animation library required).

**Props** (see the TypeScript declaration for the full list):

```ts
type WalletConnectDialogProps = {
  open: boolean
  copy: WalletConnectDialogCopy
  projectId: string | undefined
  available: boolean
  wallets: WalletOption[]
  selectedWallet: WalletOption | null
  state: WalletConnectControllerState
  qrCode: string | null
  error: string | null
  themeColor?: string
  walletLinkMode?: boolean
  copied: boolean
  onSelectWallet: (wallet: WalletOption) => void
  onBack: () => void
  onClose: () => void
  onCopyUri: (uri: string) => void
}
```

### `WalletConnectDialogCopy`

A plain-object contract that the dialog calls for every user-facing string.
Adapt your i18n library to this shape:

```ts
type WalletConnectDialogCopy = {
  heading: string
  back: string
  close: string
  qrAlt: string
  payWith: (wallet: string) => string
  scanWithWallet: (wallet: string) => string
  scanAnyWallet: string
  openWallet: (wallet: string) => string
  copyUri: string
  copied: string
  or: string
  connectFailed: string
}
```

### `WALLET_LOGOS`

```ts
const WALLET_LOGOS: Record<string, string>
```

A map of wallet identifiers to inline base64-encoded data URIs. Supported ids:

`metamask`, `trust`, `coinbase`, `rainbow`, `okx`, `binance`, `zerion`,
`ledger`, `walletconnect`, `tronlink`, `tokenpocket`

### `WalletIcon`

```ts
function WalletIcon({ wallet }: { wallet: { name: string; iconUrl?: string; brand?: string; Glyph?: () => ReactNode } }): ReactNode
```

Renders a 48×48 rounded icon. If `iconUrl` is provided it displays the image;
otherwise it falls back to the `brand` background color with an optional inline
SVG glyph.

## Copy Adaptation

The dialog does not import any i18n runtime. To use it with a different i18n
library, create an adapter function that maps your library's translation
function to the `WalletConnectDialogCopy` contract:

```ts
import { LL } from './i18n/i18n-util'

function toCopy(locale: string): WalletConnectDialogCopy {
  const ll = LL[locale]
  return {
    heading: ll.walletConnect.heading(),
    back: ll.walletConnect.back(),
    // …
  }
}
```

## Development

This package is part of the StableOps monorepo. Build and test with:

```bash
pnpm --filter @stableops/wallet-ui build
pnpm --filter @stableops/wallet-ui test
```

## License

This package is licensed under `Apache-2.0`. See [LICENSE](./LICENSE).
