import LinkWrap from '@hashicorp/react-link-wrap'

import SvgrConsulLogoColour from '../../icons/consul-logo-color.svgr.js'
import SvgrHCPLogoBlackWhite from '../../icons/hcp-logo-black.svgr.js'
import SvgrNomadLogoColour from '../../icons/nomad-logo-color.svgr.js'
import SvgrPackerLogoColour from '../../icons/packer-logo-color.svgr.js'
import SvgrTerraformLogoColour from '../../icons/terraform-logo-color.svgr.js'
import SvgrVagrantLogoColour from '../../icons/vagrant-logo-color.svgr.js'
import SvgrVaultLogoColour from '../../icons/vault-logo-color.svgr.js'
import SvgrBoundaryLogoColour from '../../icons/boundary-logo-color.svgr.js'
import SvgrWaypointLogoColour from '../../icons/waypoint-logo-color.svgr.js'
import SvgrTerraformCloudLogoColour from '../../icons/terraform-cloud-logo-color.svgr.js'

const logoDict = {
  consul: SvgrConsulLogoColour,
  hcp: SvgrHCPLogoBlackWhite,
  nomad: SvgrNomadLogoColour,
  packer: SvgrPackerLogoColour,
  terraform: SvgrTerraformLogoColour,
  vagrant: SvgrVagrantLogoColour,
  vault: SvgrVaultLogoColour,
  boundary: SvgrBoundaryLogoColour,
  waypoint: SvgrWaypointLogoColour,
  tfc: SvgrTerraformCloudLogoColour,
}

function TitleLink(props) {
  const { text, url, product, Link } = props
  const Logo = logoDict[text.toLowerCase()]
  return (
    <LinkWrap
      Link={Link}
      className={`title-link brand-${product} ${!Logo ? 'is-text' : ''}`}
      href={url}
      title={text}
    >
      {Logo ? <Logo /> : text}
    </LinkWrap>
  )
}

export default TitleLink
