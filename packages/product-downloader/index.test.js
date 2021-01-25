import { fireEvent, getByText, render } from '@testing-library/react'
import ProductDownloader from './'
import props from './props'
import { getTestValues } from 'swingset/testing'

const releases = {
  name: 'Waypoint',
  versions: {
    '0.1.0': {
      name: 'Waypoint',
      shasums: 'waypoint_0.1.0_SHA256SUMS',
      shasums_signature: 'waypoint_0.1.0_SHA256SUMS.sig',
      version: '0.1.0',
      builds: [
        {
          name: 'waypoint',
          version: '0.1.0',
          os: 'darwin',
          arch: 'amd64',
          filename: 'waypoint_0.1.0_darwin_amd64.zip',
          url:
            'https://releases.hashicorp.com/waypoint/0.1.0/waypoint_0.1.0_darwin_amd64.zip',
        },
        {
          name: 'waypoint',
          version: '0.1.0',
          os: 'windows',
          arch: 'amd64',
          filename: 'waypoint_0.1.0_windows_amd64.zip',
          url:
            'https://releases.hashicorp.com/waypoint/0.1.0/waypoint_0.1.0_windows_amd64.zip',
        },
        {
          name: 'waypoint',
          version: '0.1.0',
          os: 'linux',
          arch: 'amd64',
          filename: 'waypoint_0.1.0_windows_amd64.zip',
          url:
            'https://releases.hashicorp.com/waypoint/0.1.0/waypoint_0.1.0_windows_amd64.zip',
        },
      ],
    },
    '1.0.0': {
      name: 'Waypoint',
      shasums: 'waypoint_1.0.0_SHA256SUMS',
      shasums_signature: 'waypoint_1.0.0_SHA256SUMS.sig',
      version: '1.0.0',
      builds: [
        {
          name: 'waypoint',
          version: '1.0.0',
          os: 'darwin',
          arch: 'amd64',
          filename: 'waypoint_1.0.0_darwin_amd64.zip',
          url:
            'https://releases.hashicorp.com/waypoint/1.0.0/waypoint_1.0.0_darwin_amd64.zip',
        },
        {
          name: 'waypoint',
          version: '1.0.0',
          os: 'windows',
          arch: 'amd64',
          filename: 'waypoint_1.0.0_windows_amd64.zip',
          url:
            'https://releases.hashicorp.com/waypoint/1.0.0/waypoint_1.0.0_windows_amd64.zip',
        },
      ],
    },
  },
}

const packageManagers = [
  {
    label: 'Homebrew',
    url: '#',
    commands: ['brew tap hashicorp/tap', 'brew install hashicorp/tap/waypoint'],
    os: 'darwin',
  },
  {
    label: 'Ubuntu/Debian',
    os: 'linux',
    commands: [
      'curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo apt-key add -',
      'sudo apt-add-repository "deb [arch=amd64] https://apt.releases.hashicorp.com $(lsb_release -cs) main"',
      'sudo apt-get update && sudo apt-get install waypoint',
    ],
  },
  {
    label: 'CentOS/RHEL',
    os: 'linux',
    commands: [
      'sudo yum install -y yum-utils',
      'sudo yum-config-manager --add-repo https://rpm.releases.hashicorp.com/RHEL/hashicorp.repo',
      'sudo yum -y install waypoint',
    ],
  },
  {
    label: 'Fedora',
    os: 'linux',
    commands: [
      'sudo dnf install -y dnf-plugins-core',
      'sudo dnf config-manager --add-repo https://rpm.releases.hashicorp.com/fedora/hashicorp.repo',
      'sudo dnf -y install waypoint',
    ],
  },
  {
    label: 'Amazon Linux',
    os: 'linux',
    commands: [
      'sudo yum install -y yum-utils',
      'sudo yum-config-manager --add-repo https://rpm.releases.hashicorp.com/AmazonLinux/hashicorp.repo',
      'sudo yum -y install waypoint',
    ],
  },
]

const defaultProps = {
  ...getTestValues(props),
  releases,
  packageManagers,
}

function setup(props) {
  return render(<ProductDownloader {...defaultProps} {...props} />)
}

describe('<ProductDownloader />', () => {
  describe('Download Cards', () => {
    let platform

    beforeEach(() => {
      platform = jest.spyOn(window.navigator, 'platform', 'get')
    })

    test('should show both cards if available', () => {
      const { getByText } = setup()

      expect(getByText('Package Manager')).toBeInTheDocument()
      expect(getByText('Binary Download')).toBeInTheDocument()
    })

    it('should switch to a different OS when clicking a tab', () => {
      const { getByText, queryByText, getAllByText } = setup()

      expect(getByText('Package Manager')).toBeInTheDocument() // default OS has a package manager
      fireEvent.click(getAllByText('Windows')[0])
      expect(queryByText('Package Manager')).not.toBeInTheDocument() // next OS has no package manager
    })

    it('should set a default tab based on OS', () => {
      platform.mockReturnValue('Linux')
      const { getByTestId } = setup()
      const downloadCards = getByTestId('download-cards')

      expect(getByText(downloadCards, 'Ubuntu/Debian')).toBeInTheDocument()
    })

    it('should support choosing a different package manager for an OS', () => {
      platform.mockReturnValue('Linux')
      const { getByTestId } = setup()
      const downloadCards = getByTestId('download-cards')

      expect(
        getByText(
          downloadCards,
          'curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo apt-key add -'
        )
      ).toBeInTheDocument()

      fireEvent.click(getByText(downloadCards, 'CentOS/RHEL'))

      expect(
        getByText(downloadCards, 'sudo yum install -y yum-utils')
      ).toBeInTheDocument()
    })
  })

  describe('Release Information', () => {
    it('should allow selecting older releases', () => {
      const { getByText, queryByText } = setup()

      expect(getByText('Waypoint 0.1.0 (latest)')).toBeInTheDocument()
      expect(queryByText('Waypoint 1.0.0')).not.toBeInTheDocument()
      expect(
        queryByText('Package Downloads for Waypoint 1.0.0', { exact: false })
      ).not.toBeInTheDocument()

      fireEvent.click(getByText('Waypoint 0.1.0 (latest)'))

      expect(getByText('Waypoint 1.0.0')).toBeInTheDocument()

      fireEvent.click(getByText('Waypoint 1.0.0'))

      expect(
        getByText('Package Downloads for Waypoint 1.0.0', { exact: false })
      ).toBeInTheDocument()
    })

    it('should render the default changelog', () => {
      const { getByText } = setup()
      expect(getByText('Changelog')).toHaveAttribute(
        'href',
        'https://github.com/hashicorp/waypoint/blob/v0.1.0/CHANGELOG.md'
      )
    })

    it('should render a custom changelog if provided', () => {
      const { getByText } = setup({ changelog: 'https://www.hashicorp.com' })
      expect(getByText('Changelog')).toHaveAttribute(
        'href',
        'https://www.hashicorp.com'
      )
    })

    it('should list install links for all package managers with links', () => {
      const { getAllByText } = setup()
      expect(getAllByText('Install with')).toHaveLength(1)
    })

    it('should render tutorials if provided', () => {
      const { getByText } = setup({
        tutorials: [{ href: '#', label: 'Tutorial #1' }],
      })
      expect(getByText('Tutorial #1')).toBeInTheDocument()
      expect(getByText('Tutorials')).toBeInTheDocument()
    })

    it('should render container information if provided', () => {
      const { getByText } = setup({
        containers: [{ href: '#', label: 'Container #1' }],
      })
      expect(getByText('Container #1')).toBeInTheDocument()
      expect(getByText('Containers')).toBeInTheDocument()
    })
  })
})
