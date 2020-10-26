import { fireEvent, render } from '@testing-library/react'
import transformProps from '../../__test-helpers/transform-props'
import ProductDownloader from './'

const defaultProps = transformProps(__dirname)

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

describe('<ProductDownloader />', () => {
  test('should show download cards', () => {
    const { getByText } = render(
      <ProductDownloader {...defaultProps} releases={releases} />
    )

    expect(getByText('Package Manager')).toBeInTheDocument()
    expect(getByText('Binary Download')).toBeInTheDocument()
  })

  it('should switch to a different OS when clicking a tab', () => {
    const { getByText, queryByText, getAllByText } = render(
      <ProductDownloader {...defaultProps} releases={releases} />
    )
    expect(getByText('Package Manager')).toBeInTheDocument() // default OS has a package manager
    fireEvent.click(getAllByText('Windows')[0])
    expect(queryByText('Package Manager')).not.toBeInTheDocument() // next OS has no package manager
  })

  it('should allow selecting older releases', () => {
    const { getByText, queryByText } = render(
      <ProductDownloader {...defaultProps} releases={releases} />
    )

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
})
