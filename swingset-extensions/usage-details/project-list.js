/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

/**
 * PROJECT_LIST ends up being an array
 * of { repo, dir } items, the initial
 * array format is just for brevity
 */
const PROJECT_LIST = [
  ['hashicorp/web', '/apps/hashiconf'],
  ['hashicorp/web', '/apps/hashidays'],
  ['hashicorp/web', '/apps/internal-www'],
  ['hashicorp/web', '/apps/help-hashicorp-services'],
  ['hashicorp/web', '/apps/how-hashicorp-works'],
  ['hashicorp/web-platform-packages', '/packages/docs-mdx'],
  'hashicorp/hashicorp-www-next',
  'hashicorp/terraform-website',
  'hashicorp/dev-portal',
].map((e) => {
  if (typeof e === 'string') return { repo: e, dir: '' }
  return { repo: e[0], dir: e[1] }
})

export default PROJECT_LIST
