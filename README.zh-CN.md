# StableOps Wallet UI

[查看英文说明](./README.md)

本包提供 React 钱包付款组件：受控的 WalletConnect 对话框、钱包图标与标志，以及 USDC、USDT 代币图标。钱包连接和转账由 `@stableops/wallet-sdk` 完成。

## 安装

需要 React 和 React DOM 18 或更高版本。

```bash
pnpm add @stableops/wallet-ui @stableops/wallet-sdk react react-dom
```

宿主应用必须引入一次对话框样式文件。仅导入 JavaScript 入口或扫描 Tailwind 类名不会加载这些样式。

```tsx
import { WalletConnectDialog, TokenIcon, WalletIcon } from '@stableops/wallet-ui'
import '@stableops/wallet-ui/walletconnect-dialog.css'

<TokenIcon symbol="USDC" size={24} />
<WalletIcon wallet={{ name: 'MetaMask', brand: 'metamask' }} />
```

## WalletConnect 对话框

通过 `controller.getState()` 和 `controller.subscribe()` 取得连接状态。`qrCode` 是根据 `uri_ready` 状态中的 `uri` 生成的二维码图片地址。宿主应用负责钱包选择、弹窗开关和发起付款。

```tsx
import { WalletConnectDialog, type WalletConnectDialogProps } from '@stableops/wallet-ui'

export function MobileWalletDialog(props: WalletConnectDialogProps<{ id: string; name: string }>) {
  return <WalletConnectDialog {...props} />
}
```

| 必传参数                                           | 用途                             |
| -------------------------------------------------- | -------------------------------- |
| `open`、`projectId`、`available`                   | 控制显示和连接可用性             |
| `wallets`、`selectedWallet`                        | 钱包列表与当前选择               |
| `state`、`qrCode`、`error`、`copied`               | 连接状态、二维码、错误和复制反馈 |
| `onSelectWallet`、`onBack`、`onClose`、`onCopyUri` | 宿主应用提供的交互动作           |

可选参数包括 `themeColor`、`walletLinkMode`、`renderWalletIcon`、`paymentPending`、`onRetryPayment`、`connectionRefreshAvailable` 和 `onRefreshConnection`。选择钱包时由宿主调用 SDK 的 `connect({ walletId })`。连接成功后仍需单独发起付款。

`messageOverrides` 用于覆盖部分提示和错误文案。`createWalletConnectDialogMessages(overrides)` 可创建完整文案集合，再通过 `messages` 传入。

## 图标与辅助导出

- `TokenIcon` 接受 `symbol`（`USDC` 或 `USDT`）、`size`、`className` 和 `style`。
- `WalletIcon` 接受包含钱包名称的对象，还可提供 `brand`、`iconUrl`、`initials` 或 `Glyph`。
- `WALLET_LOGOS` 提供钱包标志，`walletConnectDialogClassNames` 提供样式类名，`walletLink` 用于生成钱包跳转链接。

## 官方文档

- [中文钱包接入指南](https://stableops.dev/zh/docs/sdk/wallet-sdk)
- [英文钱包接入指南](https://stableops.dev/en/docs/sdk/wallet-sdk)

## 许可证

本包使用 `Apache-2.0` 许可证，见 [LICENSE](./LICENSE)。
