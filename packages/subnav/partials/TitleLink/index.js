import LinkWrap from '@hashicorp/react-link-wrap'

import SvgrTerraformLogoColour from '../../icons/terraform-logo-color.svgr.js'
import SvgrVaultLogoColour from '../../icons/vault-logo-color.svgr.js'
import SvgrConsulLogoColour from '../../icons/consul-logo-color.svgr.js'
import SvgrNomadLogoColour from '../../icons/nomad-logo-color.svgr.js'
import SvgrVagrantLogoColour from '../../icons/vagrant-logo-color.svgr.js'
import SvgrPackerLogoColour from '../../icons/packer-logo-color.svgr.js'

const logoDict = {
  terraform: SvgrTerraformLogoColour,
  vault: SvgrVaultLogoColour,
  consul: SvgrConsulLogoColour,
  nomad: SvgrNomadLogoColour,
  vagrant: SvgrVagrantLogoColour,
  packer: SvgrPackerLogoColour,
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
