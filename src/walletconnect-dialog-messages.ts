export type WalletConnectDialogMessagesMap = {
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
  errors: {
    dependencyMissing: string
    projectIdMissing: string
    initFailed: string
    connectFailed: string
    noAuthorizedChains: string
    tronUnsupported: string
    providerMismatch: string
    providerNotFound: string
    txReverted: string
    tokenContractNotFound: string
    paymentInstructionNotFound: string
    unsupportedChain: string
  }
}

export type WalletConnectDialogMessageOverrides = Partial<
  Omit<WalletConnectDialogMessagesMap, 'errors'>
> & {
  errors?: Partial<WalletConnectDialogMessagesMap['errors']>
}

const defaultMessages: WalletConnectDialogMessagesMap = {
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
    tronUnsupported: 'WalletConnect TRON payment is not supported in this wallet.',
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
}

function createMessagesMap(
  overrides?: WalletConnectDialogMessageOverrides,
): WalletConnectDialogMessagesMap {
  return {
    ...defaultMessages,
    ...overrides,
    errors: {
      ...defaultMessages.errors,
      ...overrides?.errors,
    },
  }
}

function format(template: string, wallet: string): string {
  return template.replace('{wallet}', wallet)
}

export function createWalletConnectDialogMessages(
  overrides?: WalletConnectDialogMessageOverrides,
) {
  const t = createMessagesMap(overrides)
  const errors = t.errors
  return {
    heading: t.heading,
    back: t.back,
    close: t.close,
    qrAlt: t.qrAlt,
    payWith: (wallet: string) => format(t.payWith, wallet),
    scanWithWallet: (wallet: string) => format(t.scanWithWallet, wallet),
    scanAnyWallet: t.scanAnyWallet,
    openWallet: (wallet: string) => format(t.openWallet, wallet),
    paymentPrompt: (wallet: string) => format(t.paymentPrompt, wallet),
    retryPayment: (wallet: string) => format(t.retryPayment, wallet),
    retryingPayment: t.retryingPayment,
    refreshConnection: t.refreshConnection,
    copyUri: t.copyUri,
    copied: t.copied,
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
