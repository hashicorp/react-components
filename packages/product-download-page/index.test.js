import { fireEvent, screen, getByText, render } from '@testing-library/react'
import ProductDownloadsPage from './'
import props from './props'
import { getTestValues } from 'swingset/testing'

function setup(props) {
  return render(<ProductDownloadsPage {...defaultProps} {...props} />)
}

describe('<ProductDownloadsPage />', () => {
  describe('Download Cards', () => {
    let platform

    beforeEach(() => {
      platform = jest.spyOn(window.navigator, 'platform', 'get')
    })

    test('should show both cards if available', () => {
      setup()

      expect(screen.getByText('Package Manager')).toBeInTheDocument()
      expect(screen.getByText('macOS Binary Download')).toBeInTheDocument()
    })

    it('should switch to a different OS when clicking a tab', () => {
      setup()

      expect(screen.getByText('Package Manager')).toBeInTheDocument() // default OS has a package manager
      fireEvent.click(screen.getAllByText('Windows')[0])
      expect(screen.queryByText('Package Manager')).not.toBeInTheDocument() // next OS has no package manager
    })

    it('should set a default tab based on OS', () => {
      platform.mockReturnValue('Linux')
      setup()
      const downloadCards = screen.getByTestId('download-cards')

      expect(getByText(downloadCards, 'Ubuntu/Debian')).toBeInTheDocument()
    })

    it('should support choosing a different package manager for an OS', () => {
      platform.mockReturnValue('Linux')
      setup()
      const downloadCards = screen.getByTestId('download-cards')

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

    it('should allow addition of new package managers if passed as a prop', () => {
      setup({
        packageManagerOverrides: [
          {
            label: 'Extra',
            commands: ['__TEST_COMMAND__'],
            url: '#',
            os: 'linux',
          },
        ],
      })
      expect(screen.getByText('Extra')).toBeInTheDocument()
      fireEvent.click(screen.getByText('Extra')) // click on "extra" package manager tab
      expect(screen.getByText('__TEST_COMMAND__')).toBeInTheDocument()
    })

    it('should allow overrides of package managers if passed as a prop', async () => {
      setup({
        packageManagerOverrides: [
          {
            label: 'Ubuntu/Debian',
            commands: ['__OVERRIDE__'],
            url: '#',
            os: 'linux',
          },
        ],
      })
      fireEvent.click(screen.getAllByText('Linux')[0])
      expect(screen.getByText('Ubuntu/Debian')).toBeInTheDocument()
      fireEvent.click(screen.getByText('Ubuntu/Debian'))
      expect(await screen.findByText('__OVERRIDE__')).toBeInTheDocument()
    })
  })

  describe('Release Information', () => {
    it('should allow selecting older releases', () => {
      setup()

      expect(screen.getByText('Waypoint 0.1.0 (latest)')).toBeInTheDocument()
      expect(screen.queryByText('Waypoint 1.0.0')).not.toBeInTheDocument()
      expect(
        screen.queryByText('Package Downloads for Waypoint 1.0.0', {
          exact: false,
        })
      ).not.toBeInTheDocument()

      fireEvent.click(screen.getByText('Waypoint 0.1.0 (latest)'))

      expect(screen.getByText('Waypoint 1.0.0')).toBeInTheDocument()

      fireEvent.click(screen.getByText('Waypoint 1.0.0'))

      expect(
        screen.getByText('Package Downloads for Waypoint 1.0.0', {
          exact: false,
        })
      ).toBeInTheDocument()
    })

    it('should filter out any enterprise releases by default', () => {
      setup()
      fireEvent.click(screen.getByTestId('version-dropdown'))
      expect(screen.queryByText('Waypoint 0.1.0+ent')).not.toBeInTheDocument()
      expect(
        screen.queryByText('Waypoint 0.1.0+ent-beta')
      ).not.toBeInTheDocument()
    })

    it('should only show enterprise releases if enterpriseMode is true', () => {
      setup({ enterpriseMode: true, latestVersion: '0.1.0' })
      fireEvent.click(screen.getByTestId('version-dropdown'))
      expect(screen.getByText('0.1.0+ent')).toBeInTheDocument()
      expect(screen.queryByText('1.0.0')).not.toBeInTheDocument()
    })

    it('should hide all package managers if showPackageManagers is set to false', () => {
      setup({ showPackageManagers: false })
      expect(screen.queryByText('Package Manager')).not.toBeInTheDocument()
    })

    it('should render the default changelog', () => {
      setup()
      expect(screen.getByText('Changelog')).toHaveAttribute(
        'href',
        'https://github.com/hashicorp/waypoint/blob/v0.1.0/CHANGELOG.md'
      )
    })

    it('should render a custom changelog if provided', () => {
      setup({ changelog: 'https://www.hashicorp.com' })
      expect(screen.getByText('Changelog')).toHaveAttribute(
        'href',
        'https://www.hashicorp.com'
      )
    })

    it('should render tutorials if provided', () => {
      setup({
        tutorials: [{ href: '#', label: 'Tutorial #1' }],
      })
      expect(screen.getByText('Tutorial #1')).toBeInTheDocument()
      expect(screen.getByText('Tutorials')).toBeInTheDocument()
    })

    it('should render container information if provided', () => {
      setup({
        containers: [{ href: '#', label: 'Container #1' }],
      })
      expect(screen.getByText('Container #1')).toBeInTheDocument()
      expect(screen.getByText('Containers')).toBeInTheDocument()
    })
  })

  describe('Page Settings', () => {
    it('should render a generated page title if no pageTitle prop is provided', () => {
      setup()
      const expectedTitle = screen.getByText('Download Waypoint')
      expect(expectedTitle).toBeInTheDocument()
      expect(expectedTitle.tagName).toBe('H1')
    })

    it('should allow the pageTitle prop to override the generated page title', () => {
      const pageTitle = 'My Special Custom Title'
      setup({ pageTitle })
      const expectedTitle = screen.getByText(pageTitle)
      expect(expectedTitle).toBeInTheDocument()
      expect(expectedTitle.tagName).toBe('H1')
    })
  })
})

// Fixture Data

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
    '0.1.0+ent': {
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
    '0.1.0+ent-beta': {
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
