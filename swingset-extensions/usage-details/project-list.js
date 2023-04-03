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
  'hashicorp/hashicorp-www-next',
  'hashicorp/web/hashiconf',
  'hashicorp/web/hashidays',
  'hashicorp/web/internal-www',
  ['hashicorp/web-platform-packages', '/packages/docs-mdx'],
  'hashicorp/terraform-website',
  'hashicorp/web/help-hashicorp-services',
  'hashicorp/web/how-hashicorp-works',
  'hashicorp/dev-portal',
].map((e) => {
  if (typeof e === 'string') return { repo: e, dir: '' }
  return { repo: e[0], dir: e[1] }
})

export default PROJECT_LIST
