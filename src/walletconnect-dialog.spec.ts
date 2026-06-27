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

  it('uses controlled copy state supplied by the host app', () => {
    const source = readFileSync(resolve(__dirname, 'walletconnect-dialog.tsx'), 'utf8')

    expect(source).toContain('copied: boolean')
    expect(source).toContain('onCopyUri: (uri: string) => void')
    expect(source).toContain('stableops-wc-copy-done')
    expect(source).not.toContain('navigator.clipboard')
    expect(source).not.toContain('useState(false)')
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
