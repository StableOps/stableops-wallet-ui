# StableOps Wallet UI

[![npm version](https://img.shields.io/npm/v/@stableops/wallet-ui)](https://www.npmjs.com/package/@stableops/wallet-ui) [![npm downloads](https://img.shields.io/npm/dm/@stableops/wallet-ui)](https://www.npmjs.com/package/@stableops/wallet-ui) [![License](https://img.shields.io/npm/l/@stableops/wallet-ui)](./LICENSE) [![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org)

[English docs](./README.md)

StableOps Wallet UI 提供 StableOps 收银台场景共享的 React UI 组件：WalletConnect 支付对话框、钱包 logo 和钱包图标渲染器。这些组件在主收银台流程（`apps/checkout`）和交互式 Playground（`packages/playground`）之间共享，使两种场景呈现相同的钱包选择和二维码支付体验。

本包适用于已集成 `@stableops/wallet-sdk` 且需要现成响应式对话框来处理 WalletConnect 流程的应用。它不包含钱包连接逻辑——该部分由 SDK 处理。

## 文档

完整的指南、API 参考和钱包集成示例，请参阅官方文档：

- 英文文档：https://stableops.dev/en/docs
- 中文文档：https://stableops.dev/zh/docs

## 特性

- 响应式 WalletConnect 支付对话框（移动端底部抽屉，桌面端居中弹窗），包含钱包选择器和二维码扫码页。
- 内置钱包 logo 的 base64 data URI（MetaMask、Trust Wallet、Coinbase、Rainbow、OKX、Binance、Zerion、Ledger、WalletConnect、TronLink、TokenPocket）。
- 通过品牌色和内联 SVG 图标兜底渲染钱包图标。
- 通过 `WalletConnectDialogCopy` 类型合约配置文案（兼容 typesafe-i18n 等 i18n 库）。
- 自包含，运行时无 StableOps 工作空间依赖。
- 双构建（CJS + ESM），含 TypeScript 类型声明。

## 要求

- 现代浏览器环境。
- React 19 或兼容版本。
- 用于连接管理的 `@stableops/wallet-sdk` 控制器实例。

## 安装

```bash
pnpm add @stableops/wallet-ui
```

```bash
npm install @stableops/wallet-ui
```

```bash
yarn add @stableops/wallet-ui
```

## 快速开始

在收银台页面接入对话框，并将 `@stableops/wallet-sdk` 的 WalletConnect 控制器状态传入。

```tsx
import { useState } from 'react'
import { WalletConnectDialog } from '@stableops/wallet-ui'
import { createWalletConnectController } from '@stableops/wallet-sdk'

function CheckoutPage() {
  const [open, setOpen] = useState(false)
  const [wc, setWc] = useState<WalletConnectControllerState | null>(null)

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
        copy={/* 你的 i18n 标签包装为 WalletConnectDialogCopy */}
        projectId="YOUR_REOWN_PROJECT_ID"
        available={true}
        wallets={/* 你的钱包选项列表 */}
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

完整的集成示例见 `apps/checkout` 或 `packages/playground`。

## 导出

| 导出 | 说明 |
|---|---|
| `WalletConnectDialog` | 完整的响应式对话框，含钱包选择器和二维码扫码页 |
| `WalletConnectDialogCopy` | 本地化文案的类型合约 |
| `WALLET_LOGOS` | 钱包 id → base64 内联 data URI 映射（PNG / WebP） |
| `WalletIcon` | React 组件，渲染钱包 logo 或品牌色兜底图标 |

### `WalletConnectDialog`

两步流程的响应式弹窗组件：

1. **钱包选择器** — 以三列网格展示可用钱包。
2. **二维码页** — 将 WalletConnect URI 显示为二维码（中心叠加钱包 logo），提供「打开 App」深链按钮和「复制 URI」按钮。

小屏幕显示为底部抽屉，`sm:` 断点及以上居中显示为圆角弹窗。动画通过内联 CSS keyframes 实现（无需外部动画库）。

**Props**（完整列表见 TypeScript 类型声明）：

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

对话框使用的纯对象文案合约。将你的 i18n 库适配为此结构：

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

钱包标识符到内联 base64 data URI 的映射。支持以下 id：

`metamask`、`trust`、`coinbase`、`rainbow`、`okx`、`binance`、`zerion`、
`ledger`、`walletconnect`、`tronlink`、`tokenpocket`

### `WalletIcon`

```ts
function WalletIcon({ wallet }: { wallet: { name: string; iconUrl?: string; brand?: string; Glyph?: () => ReactNode } }): ReactNode
```

渲染 48×48 的圆角图标。如果提供了 `iconUrl` 则显示图片；否则使用 `brand` 背景色，可选内联 SVG 图标兜底。

## 文案适配

对话框不引入任何 i18n 运行时。如需使用不同的 i18n 库，编写适配函数将翻译函数映射到 `WalletConnectDialogCopy` 合约：

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

## 开发

本包是 StableOps 单体仓库的一部分。构建和测试命令：

```bash
pnpm --filter @stableops/wallet-ui build
pnpm --filter @stableops/wallet-ui test
```

## 许可证

本包使用 `Apache-2.0` 许可证。参见 [LICENSE](./LICENSE)。
