/**
 * Copyright IBM Corp. 2020, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { PackageManagerConfig } from './'

export function generateDefaultPackageManagers(
  productSlug: string
): PackageManagerConfig[] {
  return [
    {
      label: 'Homebrew',
      commands: [
        `brew tap hashicorp/tap`,
        `brew install hashicorp/tap/${productSlug}`,
      ],
      os: 'darwin',
    },
    {
      label: 'Ubuntu/Debian',
      commands: [
        `wget -O- https://apt.releases.hashicorp.com/gpg | gpg --dearmor | sudo tee /usr/share/keyrings/hashicorp-archive-keyring.gpg`,
        `echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list`,
        `sudo apt update && sudo apt install ${productSlug}`,
      ],
      os: 'linux',
    },
    {
      label: 'CentOS/RHEL',
      commands: [
        `sudo yum install -y yum-utils`,
        `sudo yum-config-manager --add-repo https://rpm.releases.hashicorp.com/RHEL/hashicorp.repo`,
        `sudo yum -y install ${productSlug}`,
      ],
      os: 'linux',
    },
    {
      label: 'Fedora',
      commands: [
        `sudo dnf install -y dnf-plugins-core`,
        `sudo dnf config-manager --add-repo https://rpm.releases.hashicorp.com/fedora/hashicorp.repo`,
        `sudo dnf -y install ${productSlug}`,
      ],
      os: 'linux',
    },
    {
      label: 'Amazon Linux',
      commands: [
        `sudo yum install -y yum-utils`,
        `sudo yum-config-manager --add-repo https://rpm.releases.hashicorp.com/AmazonLinux/hashicorp.repo`,
        `sudo yum -y install ${productSlug}`,
      ],
      os: 'linux',
    },
    {
      label: 'Homebrew',
      commands: [
        `brew tap hashicorp/tap`,
        `brew install hashicorp/tap/${productSlug}`,
      ],
      os: 'linux',
    },
  ]
}

export function generateEnterprisePackageManagers(
  productSlug: string
): PackageManagerConfig[] {
  return [
    {
      label: 'Ubuntu/Debian',
      commands: [
        `wget -O- https://apt.releases.hashicorp.com/gpg | gpg --dearmor | sudo tee /usr/share/keyrings/hashicorp-archive-keyring.gpg`,
        `echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list`,
        `sudo apt update && sudo apt install ${productSlug}-enterprise`,
      ],
      os: 'linux',
    },
    {
      label: 'CentOS/RHEL',
      commands: [
        `sudo yum install -y yum-utils`,
        `sudo yum-config-manager --add-repo https://rpm.releases.hashicorp.com/RHEL/hashicorp.repo`,
        `sudo yum -y install ${productSlug}-enterprise`,
      ],
      os: 'linux',
    },
    {
      label: 'Fedora',
      commands: [
        `sudo dnf install -y dnf-plugins-core`,
        `sudo dnf config-manager --add-repo https://rpm.releases.hashicorp.com/fedora/hashicorp.repo`,
        `sudo dnf -y install ${productSlug}-enterprise`,
      ],
      os: 'linux',
    },
    {
      label: 'Amazon Linux',
      commands: [
        `sudo yum install -y yum-utils`,
        `sudo yum-config-manager --add-repo https://rpm.releases.hashicorp.com/AmazonLinux/hashicorp.repo`,
        `sudo yum -y install ${productSlug}-enterprise`,
      ],
      os: 'linux',
    },
  ]
}
