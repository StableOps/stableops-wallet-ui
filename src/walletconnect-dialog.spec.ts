import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { describe, expect, it } from 'vitest'

import { WALLET_LOGOS, walletConnectDialogClassNames, walletLink } from './index'

describe('@stableops/wallet-ui WalletConnectDialog contract', () => {
  it('exports a URL encoder for WalletConnect wallet deep links', () => {
    expect(walletLink('metamask://wc?uri=', 'wc:test uri?x=1')).toBe(
      'metamask://wc?uri=wc%3Atest%20uri%3Fx%3D1',
    )
  })

  it('keeps modal animation styles in the package CSS export', () => {
    const css = readFileSync(resolve(__dirname, 'walletconnect-dialog.css'), 'utf8')

    expect(css).toContain('@keyframes stableops-walletconnect-backdrop-in')
    expect(css).toContain('@keyframes stableops-walletconnect-sheet-in')
    expect(css).toContain('--stableops-wc-backdrop')
    expect(css).toContain('.stableops-wc-wallet-logo')
    expect(css).toContain('.stableops-wc-wallet-fallback')
    expect(css).toContain('.stableops-wc-copy-done')
  })

  it('keeps expensive backdrop blur off the overlay class', () => {
    expect(walletConnectDialogClassNames.backdrop).not.toContain('backdrop-blur')
    expect(walletConnectDialogClassNames.backdrop).toContain('stableops-wc-backdrop')
  })

  it('matches dashboard dialog colors while allowing host design tokens to override them', () => {
    const css = readFileSync(resolve(__dirname, 'walletconnect-dialog.css'), 'utf8')

    expect(css).toContain('--stableops-wc-backdrop: rgb(0 0 0 / 80%)')
    expect(css).toContain('--stableops-wc-surface: var(--background, oklch(1 0 0))')
    expect(css).toContain('--stableops-wc-text: var(--foreground, oklch(0.141 0.005 285.823))')
    expect(css).toContain('--stableops-wc-muted: var(--muted-foreground, oklch(0.552 0.016 285.938))')
    expect(css).toContain('--stableops-wc-border: var(--border, oklch(0.92 0.004 286.32))')
    expect(css).toContain('--stableops-wc-hover: var(--accent, #e8faf7)')
    expect(css).toContain('--stableops-wc-brand: var(--primary, #12233a)')
    expect(css).toContain('0 10px 15px -3px rgb(0 0 0 / 10%)')
  })

  it('isolates dialog internals from host prose typography styles', () => {
    const css = readFileSync(resolve(__dirname, 'walletconnect-dialog.css'), 'utf8')

    expect(css).toContain('.stableops-wc-sheet,')
    expect(css).toContain('.stableops-wc-sheet *')
    expect(css).toContain('.stableops-wc-sheet :where(button, a, p, img)')
    expect(css).toContain('text-decoration: none')
    expect(css).toContain('max-width: 100%')
  })

  it('uses controlled copy state supplied by the host app', () => {
    const source = readFileSync(resolve(__dirname, 'walletconnect-dialog.tsx'), 'utf8')

    expect(source).toContain('copied: boolean')
    expect(source).toContain('onCopyUri: (uri: string) => void')
    expect(source).toContain('stableops-wc-copy-done')
    expect(source).not.toContain('navigator.clipboard')
    expect(source).not.toContain('useState(false)')
  })

  it('keeps connected wallet sessions actionable until the payment tx hash is returned', () => {
    const source = readFileSync(resolve(__dirname, 'walletconnect-dialog.tsx'), 'utf8')

    expect(source).toContain('paymentPrompt:')
    expect(source).toContain('retryPayment:')
    expect(source).toContain('paymentPending?: boolean')
    expect(source).toContain('onRetryPayment?: () => void')
    expect(source).toContain("state.status === 'connected'")
    expect(source).toContain('onRetryPayment()')
  })

  it('keeps the placeholder QR and wallet logo visible on failures while moving text to the footer error', () => {
    const source = readFileSync(resolve(__dirname, 'walletconnect-dialog.tsx'), 'utf8')
    const css = readFileSync(resolve(__dirname, 'walletconnect-dialog.css'), 'utf8')

    expect(source).toContain('CircleAlert')
    expect(source).toContain("state.status === 'failed' ? (")
    expect(source).toContain('stableops-wc-error-icon')
    expect(source).toContain('const visibleError =')
    expect(source).not.toContain('stableops-wc-error-text')
    expect(source).not.toContain('{copy.connectFailed}</span>')
    expect(css).toContain('.stableops-wc-error-icon')
  })

  it('formats known error codes with host i18n and keeps unknown details visible', () => {
    const source = readFileSync(resolve(__dirname, 'walletconnect-dialog.tsx'), 'utf8')

    expect(source).toContain('export type WalletConnectDialogError')
    expect(source).toContain('errorMessage: (code: string) => string | null')
    expect(source).toContain('function formatWalletConnectDialogError')
    expect(source).toContain('copy.errorMessage(error.code) ?? error.message')
    expect(source).toContain('formatWalletConnectDialogError(state.error, copy)')
  })

  it('keeps theming to a single theme color', () => {
    const source = readFileSync(resolve(__dirname, 'walletconnect-dialog.tsx'), 'utf8')
    const css = readFileSync(resolve(__dirname, 'walletconnect-dialog.css'), 'utf8')

    expect(source).toContain('themeColor?: string')
    expect(source).toContain("'--stableops-wc-brand': themeColor")
    expect(css).toContain('color-mix(in srgb, var(--stableops-wc-brand)')
    expect(css).not.toContain('--stableops-wc-brand-strong')
  })

  it('ships wallet logos and default wallet icon rendering', () => {
    const source = readFileSync(resolve(__dirname, 'walletconnect-dialog.tsx'), 'utf8')

    expect(WALLET_LOGOS.metamask).toContain('data:image/')
    expect(source).toContain('renderWalletIcon?:')
    expect(source).toContain('renderWalletIcon ??')
    expect(source).toContain('<WalletIcon wallet={wallet} />')
  })
})
