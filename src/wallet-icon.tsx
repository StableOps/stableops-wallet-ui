import type { ReactNode } from 'react'

export type WalletIconWallet = {
  name: string
  iconUrl?: string
  brand?: string
  initials?: string
  Glyph?: () => ReactNode
}

export function WalletIcon({ wallet }: { wallet: WalletIconWallet }): ReactNode {
  if (wallet.iconUrl) {
    return (
      <img src={wallet.iconUrl} alt={wallet.name} className="stableops-wc-wallet-logo" />
    )
  }

  const Glyph = wallet.Glyph
  return (
    <span
      className="stableops-wc-wallet-fallback"
      style={{ background: wallet.brand ?? '#0F172A' }}>
      {Glyph ? <Glyph /> : wallet.initials ?? wallet.name.slice(0, 1)}
    </span>
  )
}
