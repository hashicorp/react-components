export function handleTiersLength(tiersLength) {
  if (tiersLength > 5) {
    throw new Error('<PricingTierList /> only supports up to five tiers')
  }
}
