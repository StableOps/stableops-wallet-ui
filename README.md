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

## License

This package is licensed under `Apache-2.0`. See [LICENSE](./LICENSE).
