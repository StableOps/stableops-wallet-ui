# StableOps Wallet UI

[![npm version](https://img.shields.io/npm/v/@stableops/wallet-ui)](https://www.npmjs.com/package/@stableops/wallet-ui) [![npm downloads](https://img.shields.io/npm/dm/@stableops/wallet-ui)](https://www.npmjs.com/package/@stableops/wallet-ui) [![License](https://img.shields.io/npm/l/@stableops/wallet-ui)](./LICENSE) [![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org)

[English docs](./README.md)

StableOps Wallet UI 提供 StableOps 收银台场景共享的 React UI 组件：WalletConnect 支付对话框、钱包 logo 和钱包图标渲染器。这些组件在主收银台流程（`apps/checkout`）和交互式 Playground（`packages/playground`）之间共享，使两种场景呈现相同的钱包选择和二维码支付体验。

本包适用于已集成 `@stableops/wallet-sdk` 且需要现成响应式对话框来处理 WalletConnect 流程的应用。它不包含钱包连接逻辑——该部分由 SDK 处理。

## 文档

完整的指南、API 参考和钱包集成示例，请参阅官方文档：

- 英文文档：https://stableops.dev/en/docs
- 中文文档：https://stableops.dev/zh/docs

## 许可证

本包使用 `Apache-2.0` 许可证。参见 [LICENSE](./LICENSE)。
