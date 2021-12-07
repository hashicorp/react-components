import { camelCase } from 'camel-case'
import LinkWrap from '@hashicorp/react-link-wrap'
import InlineSvg from '@hashicorp/react-inline-svg'
import s from './style.module.css'
import classNames from 'classnames'
/* main logos, for light theme */
import ConsulLogo from '@hashicorp/mktg-logos/product/consul/primary/color.svg?include'
import ConsulLogoAttr from '@hashicorp/mktg-logos/product/consul/primary/attributed_color.svg?include'
import HCPLogo from '@hashicorp/mktg-logos/product/hcp/primary/black.svg?include'
import NomadLogo from '@hashicorp/mktg-logos/product/nomad/primary/color.svg?include'
import PackerLogo from '@hashicorp/mktg-logos/product/packer/primary/color.svg?include'
import TerraformLogo from '@hashicorp/mktg-logos/product/terraform/primary/color.svg?include'
import VagrantLogo from '@hashicorp/mktg-logos/product/vagrant/primary/color.svg?include'
import VaultLogo from '@hashicorp/mktg-logos/product/vault/primary/color.svg?include'
import VaultLogoAttr from '@hashicorp/mktg-logos/product/vault/primary/attributed_color.svg?include'
import BoundaryLogo from '@hashicorp/mktg-logos/product/boundary/primary/color.svg?include'
import WaypointLogo from '@hashicorp/mktg-logos/product/waypoint/primary/color.svg?include'
import TerraformCloudLogo from '@hashicorp/mktg-logos/product/terraform-cloud/primary/color.svg?include'
/* white logos, for dark theme */
import ConsulLogoWhite from '@hashicorp/mktg-logos/product/consul/primary/colorwhite.svg?include'
import ConsulLogoWhiteAttr from '@hashicorp/mktg-logos/product/consul/primary/attributed_colorwhite.svg?include'
import HCPLogoWhite from '@hashicorp/mktg-logos/product/hcp/primary/white.svg?include'
import NomadLogoWhite from '@hashicorp/mktg-logos/product/nomad/primary/colorwhite.svg?include'
import PackerLogoWhite from '@hashicorp/mktg-logos/product/packer/primary/colorwhite.svg?include'
import TerraformLogoWhite from '@hashicorp/mktg-logos/product/terraform/primary/colorwhite.svg?include'
import VagrantLogoWhite from '@hashicorp/mktg-logos/product/vagrant/primary/colorwhite.svg?include'
import VaultLogoWhite from '@hashicorp/mktg-logos/product/vault/primary/colorwhite.svg?include'
import VaultLogoAttrWhite from '@hashicorp/mktg-logos/product/vault/primary/attributed_colorwhite.svg?include'
import BoundaryLogoWhite from '@hashicorp/mktg-logos/product/boundary/primary/colorwhite.svg?include'
import WaypointLogoWhite from '@hashicorp/mktg-logos/product/waypoint/primary/colorwhite.svg?include'
import TerraformCloudLogoWhite from '@hashicorp/mktg-logos/product/terraform-cloud/primary/colorwhite.svg?include'

const logoDict = {
  light: {
    boundary: BoundaryLogo,
    consul: ConsulLogo,
    hashiCorpConsul: ConsulLogoAttr,
    hcp: HCPLogo,
    nomad: NomadLogo,
    packer: PackerLogo,
    terraform: TerraformLogo,
    tfc: TerraformCloudLogo,
    vagrant: VagrantLogo,
    vault: VaultLogo,
    hashiCorpVault: VaultLogoAttr,
    waypoint: WaypointLogo,
  },
  dark: {
    boundary: BoundaryLogoWhite,
    consul: ConsulLogoWhite,
    hashiCorpConsul: ConsulLogoWhiteAttr,
    hcp: HCPLogoWhite,
    nomad: NomadLogoWhite,
    packer: PackerLogoWhite,
    terraform: TerraformLogoWhite,
    tfc: TerraformCloudLogoWhite,
    vagrant: VagrantLogoWhite,
    vault: VaultLogoWhite,
    hashiCorpVault: VaultLogoAttrWhite,
    waypoint: WaypointLogoWhite,
  },
}

function TitleLink({ text, url, product, Link, theme }) {
  const Logo = logoDict[theme][camelCase(text)]
  return (
    <LinkWrap
      Link={Link}
      className={classNames(s.root, s[`brand-${product}`], s[camelCase(text)])}
      href={url}
      title={text}
    >
      {Logo ? <InlineSvg src={Logo} /> : text}
    </LinkWrap>
  )
}

export default TitleLink
