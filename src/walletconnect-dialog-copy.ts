export type WalletConnectLocale = 'zh' | 'en'

type CopyMap = {
  heading: string
  back: string
  close: string
  qrAlt: string
  payWith: string
  scanWithWallet: string
  scanAnyWallet: string
  openWallet: string
  paymentPrompt: string
  retryPayment: string
  retryingPayment: string
  refreshConnection: string
  copyUri: string
  copied: string
  or: string
  connectFailed: string
  errors: Record<string, string>
}

const copy: Record<WalletConnectLocale, CopyMap> = {
  zh: {
    heading: '用手机钱包支付',
    back: '返回',
    close: '关闭',
    qrAlt: '支付二维码',
    payWith: '用 {wallet} 支付',
    scanWithWallet: '用手机上的 {wallet} 扫码',
    scanAnyWallet: '用任意支持 WalletConnect 的钱包扫码',
    openWallet: '打开 {wallet}',
    paymentPrompt:
      '已连接 {wallet}，请在钱包 App 内确认交易；如果没有弹出支付界面，可再次触发支付。',
    retryPayment: '再次打开支付',
    retryingPayment: '正在打开支付…',
    refreshConnection: '刷新二维码',
    copyUri: '复制链接',
    copied: '已复制',
    or: '或',
    connectFailed: '连接失败',
    errors: {
      dependencyMissing: '当前环境未加载 WalletConnect 依赖，请刷新后重试。',
      projectIdMissing: '未配置 WalletConnect projectId，无法打开手机钱包支付。',
      initFailed: 'WalletConnect 初始化失败，请检查网络后重试。',
      connectFailed: '连接超时，请刷新二维码再重试',
      noAuthorizedChains: '钱包没有授权订单需要的网络，请返回重连并勾选对应网络。',
      providerMismatch: '钱包返回的网络和订单网络不一致，请切换到正确网络后重试。',
      providerNotFound: '未找到可用于本订单网络的钱包授权，请返回重连并授权网络。',
      txReverted: '链上交易发生回滚，请重新付款或联系商户。',
      tokenContractNotFound: '当前网络缺少默认代币合约配置，请检查测试网配置。',
      paymentInstructionNotFound: '当前订单没有可用的链上支付指令。',
      unsupportedChain: '钱包 SDK 暂不支持当前支付网络。',
    },
  },
  en: {
    heading: 'Pay with mobile wallet',
    back: 'Back',
    close: 'Close',
    qrAlt: 'Payment QR code',
    payWith: 'Pay with {wallet}',
    scanWithWallet: 'Scan with {wallet} on your phone',
    scanAnyWallet: 'Scan with any WalletConnect wallet',
    openWallet: 'Open {wallet}',
    paymentPrompt:
      '{wallet} is connected. Confirm the transaction in your wallet app; if no payment screen appears, trigger payment again.',
    retryPayment: 'Trigger payment again',
    retryingPayment: 'Opening payment…',
    refreshConnection: 'Refresh QR',
    copyUri: 'Copy link',
    copied: 'Copied',
    or: 'or',
    connectFailed: 'Connection failed',
    errors: {
      dependencyMissing:
        'WalletConnect is not loaded in this environment. Refresh the page and try again.',
      projectIdMissing:
        'WalletConnect projectId is not configured, so mobile wallet pay cannot open.',
      initFailed: 'WalletConnect failed to initialize. Check your connection and retry.',
      connectFailed: 'WalletConnect failed to connect. Go back to the wallet list and retry.',
      noAuthorizedChains:
        'Your wallet did not authorize the required networks. Reconnect and select the requested network.',
      providerMismatch:
        'The wallet returned a different network than the order requires. Switch networks and retry.',
      providerNotFound:
        'No wallet authorization was found for this order network. Go back, reconnect, and authorize it.',
      txReverted: 'The on-chain transaction was reverted. Pay again or contact the merchant.',
      tokenContractNotFound:
        'The default token contract is not configured for this network. Check the testnet config.',
      paymentInstructionNotFound:
        'This order does not have an available on-chain payment instruction.',
      unsupportedChain: 'The wallet SDK does not support this payment network.',
    },
  },
}

export function createWalletConnectDialogCopy(locale: WalletConnectLocale, copiedLabel?: string) {
  const t = copy[locale]
  const errors = t.errors
  return {
    heading: t.heading,
    back: t.back,
    close: t.close,
    qrAlt: t.qrAlt,
    payWith: (wallet: string) => t.payWith.replace('{wallet}', wallet),
    scanWithWallet: (wallet: string) => t.scanWithWallet.replace('{wallet}', wallet),
    scanAnyWallet: t.scanAnyWallet,
    openWallet: (wallet: string) => t.openWallet.replace('{wallet}', wallet),
    paymentPrompt: (wallet: string) => t.paymentPrompt.replace('{wallet}', wallet),
    retryPayment: (wallet: string) => t.retryPayment.replace('{wallet}', wallet),
    retryingPayment: t.retryingPayment,
    refreshConnection: t.refreshConnection,
    copyUri: t.copyUri,
    copied: copiedLabel ?? t.copied,
    or: t.or,
    connectFailed: t.connectFailed,
    errorMessage: (code: string) => {
      switch (code) {
        case 'walletconnect_dependency_missing':
          return errors.dependencyMissing
        case 'walletconnect_project_id_missing':
          return errors.projectIdMissing
        case 'walletconnect_init_failed':
          return errors.initFailed
        case 'walletconnect_connect_failed':
          return errors.connectFailed
        case 'walletconnect_no_authorized_chains':
          return errors.noAuthorizedChains
        case 'walletconnect_tron_unsupported':
          return errors.tronUnsupported
        case 'wallet_provider_mismatch':
          return errors.providerMismatch
        case 'wallet_provider_not_found':
          return errors.providerNotFound
        case 'wallet_tx_reverted':
          return errors.txReverted
        case 'token_contract_not_found':
          return errors.tokenContractNotFound
        case 'payment_instruction_not_found':
          return errors.paymentInstructionNotFound
        case 'unsupported_chain':
          return errors.unsupportedChain
        default:
          return null
      }
    },
  }
}
