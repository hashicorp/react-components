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
  ['hashicorp/nextjs-scripts', '/packages/docs-mdx'],
  'hashicorp/terraform-website-next',
  'hashicorp/how-hashicorp-works',
  ['hashicorp/waypoint', '/website'],
  ['hashicorp/boundary', '/website'],
  ['hashicorp/nomad', '/website'],
  ['hashicorp/consul', '/website'],
  ['hashicorp/vault', '/website'],
  ['hashicorp/vagrant', '/website'],
  ['hashicorp/packer', '/website'],
  ['hashicorp/sentinel', '/website'],
].map((e) => {
  if (typeof e === 'string') return { repo: e, dir: '' }
  return { repo: e[0], dir: e[1] }
})

export default PROJECT_LIST
