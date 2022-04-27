/**
 * PROJECT_LIST ends up being an array
 * of { repo, dir } items, the initial
 * array format is just for brevity
 */
const PROJECT_LIST = [
  'hashicorp/hashicorp-www-next',
  'hashicorp/hashiconf-next',
  'hashicorp/cloud.hashicorp.com',
  'hashicorp/learn',
  ['hashicorp/web-platform-packages', '/packages/docs-mdx'],
  'hashicorp/terraform-website',
  'hashicorp/how-hashicorp-works',
  'hashicorp/dev-portal',
].map((e) => {
  if (typeof e === 'string') return { repo: e, dir: '' }
  return { repo: e[0], dir: e[1] }
})

export default PROJECT_LIST
