import { type CSSProperties, type ReactNode } from 'react'

import type { WalletConnectControllerState } from '@stableops/wallet-sdk'
import {
  ArrowLeft,
  Check,
  CircleAlert,
  Copy,
  ExternalLink,
  Loader2,
  RotateCw,
  X,
} from 'lucide-react'

import { WalletIcon, type WalletIconWallet } from './wallet-icon'
import {
  createWalletConnectDialogCopy,
  type WalletConnectLocale,
} from './walletconnect-dialog-copy'
import './walletconnect-dialog.css'

const PLACEHOLDER_QR_CODE =
  'data:image/png;base64,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'

type WalletConnectThemeStyle = CSSProperties & {
  '--stableops-wc-brand'?: string
}

export type WalletConnectDialogWallet = WalletIconWallet & {
  id: string
  links?: {
    native?: string
    universal?: string
  }
}

export type WalletConnectDialogCopy = {
  heading: string
  back: string
  close: string
  qrAlt: string
  payWith: (wallet: string) => string
  scanWithWallet: (wallet: string) => string
  scanAnyWallet: string
  openWallet: (wallet: string) => string
  paymentPrompt: (wallet: string) => string
  retryPayment: (wallet: string) => string
  retryingPayment: string
  copyUri: string
  copied: string
  or: string
  connectFailed: string
  refreshConnection: string
  errorMessage: (code: string) => string | null
}

export type WalletConnectDialogError =
  | string
  | {
      code?: string
      message: string
    }

export type WalletConnectDialogProps<TWallet extends WalletConnectDialogWallet> = {
  open: boolean
  copy?: WalletConnectDialogCopy
  locale?: WalletConnectLocale
  projectId: string | null | undefined
  available: boolean
  wallets: readonly TWallet[]
  selectedWallet: TWallet | null
  state: WalletConnectControllerState
  qrCode: string | null
  error: WalletConnectDialogError | null
  walletLinkMode?: boolean
  themeColor?: string
  copied: boolean
  paymentPending?: boolean
  connectionRefreshAvailable?: boolean
  renderWalletIcon?: (wallet: TWallet) => ReactNode
  onSelectWallet: (wallet: TWallet) => void
  onRetryPayment?: () => void
  onRefreshConnection?: () => void
  onBack: () => void
  onClose: () => void
  onCopyUri: (uri: string) => void
}

export const walletConnectDialogClassNames = {
  backdrop: 'stableops-wc-backdrop',
  sheet: 'stableops-wc-sheet',
  qrFrame: 'stableops-wc-qr-frame',
} as const

export function walletLink(prefix: string, uri: string): string {
  return `${prefix}${encodeURIComponent(uri)}`
}

function formatWalletConnectDialogError(
  error: WalletConnectDialogError,
  copy: WalletConnectDialogCopy,
): string {
  if (typeof error === 'string') return error
  if (error.code) return copy.errorMessage(error.code) ?? error.message
  return error.message
}

export function WalletConnectDialog<TWallet extends WalletConnectDialogWallet>({
  open,
  copy: copyProp,
  locale = 'en',
  projectId,
  available,
  wallets,
  selectedWallet,
  state,
  qrCode,
  error,
  walletLinkMode = false,
  themeColor,
  copied,
  paymentPending = false,
  connectionRefreshAvailable = false,
  renderWalletIcon,
  onSelectWallet,
  onRetryPayment,
  onRefreshConnection,
  onBack,
  onClose,
  onCopyUri,
}: WalletConnectDialogProps<TWallet>): ReactNode {
  if (!open) return null

  const copy = copyProp ?? createWalletConnectDialogCopy(locale)

  const appLink = selectedWallet?.links?.native ?? selectedWallet?.links?.universal ?? null
  const appLinkIsUniversal =
    !selectedWallet?.links?.native && Boolean(selectedWallet?.links?.universal)
  const readyUri = state.status === 'uri_ready' ? state.uri : null
  const walletHref =
    walletLinkMode && readyUri
      ? readyUri
      : appLink && readyUri
        ? walletLink(appLink, readyUri)
        : undefined
  const showRefreshControl = connectionRefreshAvailable && Boolean(onRefreshConnection)
  const visibleQrCode = showRefreshControl ? null : qrCode
  const qrLoading =
    selectedWallet &&
    !visibleQrCode &&
    (state.status === 'connecting' || state.status === 'uri_ready')
  const paymentReady =
    Boolean(selectedWallet) && state.status === 'connected' && Boolean(onRetryPayment)
  const disabledList = (!walletLinkMode && !projectId) || !available
  const renderIcon = renderWalletIcon ?? ((wallet: TWallet) => <WalletIcon wallet={wallet} />)
  const themeStyle: WalletConnectThemeStyle | undefined = themeColor
    ? { '--stableops-wc-brand': themeColor }
    : undefined
  const visibleError =
    error !== null
      ? formatWalletConnectDialogError(error, copy)
      : state.status === 'failed'
        ? formatWalletConnectDialogError(state.error, copy)
        : null

  return (
    <div className={walletConnectDialogClassNames.backdrop} style={themeStyle} onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        className={walletConnectDialogClassNames.sheet}
        onClick={(event) => event.stopPropagation()}>
        <div className="stableops-wc-header">
          {selectedWallet ? (
            <>
              <button
                type="button"
                aria-label={copy.back}
                onClick={onBack}
                className="stableops-wc-icon-button stableops-wc-back-button">
                <ArrowLeft className="stableops-wc-icon" />
              </button>
              <div className="stableops-wc-title">{copy.payWith(selectedWallet.name)}</div>
            </>
          ) : (
            <div className="stableops-wc-title">{copy.heading}</div>
          )}
          <button
            type="button"
            aria-label={copy.close}
            onClick={onClose}
            className="stableops-wc-icon-button stableops-wc-close-button">
            <X className="stableops-wc-icon" />
          </button>
        </div>

        {selectedWallet ? (
          <div className="stableops-wc-body">
            <div className={walletConnectDialogClassNames.qrFrame}>
                {visibleQrCode ? (
                  <>
                    <img src={visibleQrCode} alt={copy.qrAlt} className="stableops-wc-qr-image" />
                    <div
                      className={
                        paymentReady
                          ? 'stableops-wc-loading-overlay'
                          : 'stableops-wc-centered-overlay'
                      }>
                      <div
                        className={`stableops-wc-wallet-chip${
                          paymentReady ? ' stableops-wc-wallet-chip-connected' : ''
                        }`}>
                        {renderIcon(selectedWallet)}
                        {paymentReady ? (
                          <span className="stableops-wc-connected-badge" aria-hidden="true">
                            <Check className="stableops-wc-connected-badge-icon" strokeWidth={3} />
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </>
                ) : qrLoading ? (
                <>
                  <img
                    src={PLACEHOLDER_QR_CODE}
                    alt=""
                    className="stableops-wc-qr-image stableops-wc-qr-placeholder"
                    aria-hidden="true"
                  />
                  <div className="stableops-wc-centered-overlay">
                    <div
                      className={`stableops-wc-wallet-chip${
                        paymentReady ? ' stableops-wc-wallet-chip-connected' : ''
                      }`}>
                      {renderIcon(selectedWallet)}
                      {paymentReady ? (
                        <span className="stableops-wc-connected-badge" aria-hidden="true">
                          <Check className="stableops-wc-connected-badge-icon" strokeWidth={3} />
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="stableops-wc-loading-overlay">
                    <Loader2 className="stableops-wc-spinner stableops-wc-muted-spinner" />
                  </div>
                </>
              ) : (
                <>
                  <img
                    src={PLACEHOLDER_QR_CODE}
                    alt=""
                    className="stableops-wc-qr-image stableops-wc-qr-placeholder"
                    aria-hidden="true"
                  />
                  <div className="stableops-wc-loading-overlay">
                    {showRefreshControl ? (
                      <button
                        type="button"
                        className="stableops-wc-refresh-button"
                        onClick={() => {
                          if (onRefreshConnection) onRefreshConnection()
                        }}>
                        <RotateCw className="stableops-wc-refresh-icon" />
                        {copy.refreshConnection}
                      </button>
                    ) : (
                      <div
                        className={`stableops-wc-wallet-chip${
                          paymentReady ? ' stableops-wc-wallet-chip-connected' : ''
                        }`}>
                        {renderIcon(selectedWallet)}
                        {paymentReady ? (
                          <span className="stableops-wc-connected-badge" aria-hidden="true">
                            <Check className="stableops-wc-connected-badge-icon" strokeWidth={3} />
                          </span>
                        ) : null}
                      </div>
                    )}
                  </div>
                  {state.status === 'failed' && !showRefreshControl ? (
                    <div className="stableops-wc-loading-overlay">
                      <CircleAlert className="stableops-wc-error-icon" aria-hidden="true" />
                    </div>
                  ) : null}
                </>
              )}
            </div>

            <p className="stableops-wc-help-text">
              {paymentReady
                ? copy.paymentPrompt(selectedWallet.name)
                : walletLinkMode || selectedWallet.links
                  ? copy.scanWithWallet(selectedWallet.name)
                  : copy.scanAnyWallet}
            </p>

            {walletLinkMode || appLink ? (
              <div className="stableops-wc-separator">
                <div className="stableops-wc-line" />
                <span>{copy.or}</span>
                <div className="stableops-wc-line" />
              </div>
            ) : (
              <div className="stableops-wc-spacer" />
            )}

            <div className="stableops-wc-actions">
              {paymentReady ? (
                <button
                  type="button"
                  className="stableops-wc-primary-action stableops-wc-button-action"
                  onClick={() => {
                    if (onRetryPayment) onRetryPayment()
                  }}>
                  {paymentPending ? (
                    <Loader2 className="stableops-wc-action-icon stableops-wc-spinner" />
                  ) : (
                    <ExternalLink className="stableops-wc-action-icon" />
                  )}
                  <span className="stableops-wc-action-label">
                    {paymentPending ? copy.retryingPayment : copy.retryPayment(selectedWallet.name)}
                  </span>
                </button>
              ) : null}
              {!paymentReady && (walletLinkMode || appLink) ? (
                <a
                  className={`stableops-wc-primary-action ${
                    walletHref ? '' : 'stableops-wc-disabled-link'
                  }`}
                  aria-disabled={walletHref ? false : true}
                  href={walletHref}
                  {...((walletLinkMode || appLinkIsUniversal) && walletHref
                    ? { target: '_blank', rel: 'noreferrer' }
                    : {})}>
                  <ExternalLink className="stableops-wc-action-icon" />
                  <span className="stableops-wc-action-label">
                    {copy.openWallet(selectedWallet.name)}
                  </span>
                </a>
              ) : null}
              <button
                type="button"
                disabled={!readyUri}
                onClick={() => {
                  if (readyUri) onCopyUri(readyUri)
                }}
                className={`stableops-wc-secondary-action ${
                  copied ? 'stableops-wc-copy-done' : ''
                }`}>
                {copied ? (
                  <>
                    <Check
                      className="stableops-wc-action-icon stableops-wc-check-icon"
                      strokeWidth={3}
                    />
                    <span className="stableops-wc-action-label">{copy.copied}</span>
                  </>
                ) : (
                  <>
                    <Copy className="stableops-wc-action-icon" />
                    <span className="stableops-wc-action-label">{copy.copyUri}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="stableops-wc-wallet-grid">
            {wallets.map((wallet) => (
              <button
                key={wallet.id}
                type="button"
                className="stableops-wc-wallet-button"
                disabled={disabledList}
                onClick={() => onSelectWallet(wallet)}>
                {renderIcon(wallet)}
                <span>{wallet.name}</span>
              </button>
            ))}
          </div>
        )}

        {visibleError ? <div className="stableops-wc-error-box">{visibleError}</div> : null}
      </div>
    </div>
  )
}
