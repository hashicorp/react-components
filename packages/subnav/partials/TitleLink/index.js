import LinkWrap from '@hashicorp/react-link-wrap'

import SvgrConsulLogoColour from '../../icons/consul-logo-color.svgr.js'
import SvgrHCPLogoBlackWhite from '../../icons/hcp-logo-black-white.svgr.js'
import SvgrNomadLogoColour from '../../icons/nomad-logo-color.svgr.js'
import SvgrPackerLogoColour from '../../icons/packer-logo-color.svgr.js'
import SvgrTerraformLogoColour from '../../icons/terraform-logo-color.svgr.js'
import SvgrVagrantLogoColour from '../../icons/vagrant-logo-color.svgr.js'
import SvgrVaultLogoColour from '../../icons/vault-logo-color.svgr.js'

const logoDict = {
  consul: SvgrConsulLogoColour,
  hcp: SvgrHCPLogoBlackWhite,
  nomad: SvgrNomadLogoColour,
  packer: SvgrPackerLogoColour,
  terraform: SvgrTerraformLogoColour,
  vagrant: SvgrVagrantLogoColour,
  vault: SvgrVaultLogoColour,
}

function TitleLink(props) {
  const { text, url, brand, Link } = props
  const Logo = logoDict[text.toLowerCase()]
  return (
    <LinkWrap
      Link={Link}
      className={`title-link brand-${brand} ${!Logo ? 'is-text' : ''}`}
      href={url}
      title={text}
    >
      {Logo ? <Logo /> : text}
    </LinkWrap>
  )
}

export default TitleLink
