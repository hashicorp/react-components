export function handleTiersLength(tiersLength) {
  if (tiersLength > 5) {
    throw new Error('<PricingTiers /> only supports up to five tiers')
  }
}
