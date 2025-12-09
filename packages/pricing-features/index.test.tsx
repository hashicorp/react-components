/**
 * Copyright IBM Corp. 2020, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { render } from '@testing-library/react'
import PricingFeatures from '.'
import { normalizeTableData } from './helpers'
import cms from './fixtures/cms.json'
import table from './fixtures/table.json'

describe('<PricingFeatures />', () => {
  it('should render', () => {
    const { getByTestId } = render(<PricingFeatures {...defaultProps} />)
    getByTestId('pricing-features')
  })

  it('should show toggle button on collapsible row', () => {
    const { getByLabelText } = render(
      <PricingFeatures
        download={defaultProps.download}
        features={[defaultProps.features[1]]}
      />
    )
    getByLabelText('toggle row content')
  })

  it('should throw error with 1 tab', () => {
    expect(() =>
      render(
        <PricingFeatures
          features={[
            {
              heading: 'Features',
              content: {
                tabs: [defaultTabs[0]],
              },
            },
          ]}
          download={defaultProps.download}
        />
      )
    ).toThrow('<PricingFeatureTabs /> only supports between 2 and 7 tabs')
  })

  it('should throw with more than 7 tabs', () => {
    expect(() =>
      render(
        <PricingFeatures
          features={[
            {
              heading: 'Features',
              content: {
                tabs: Array.from(Array(8).keys()).map((key) => ({
                  label: {
                    heading: `tab ${key}`,
                    icon: <span>icon</span>,
                  },
                  content: { table },
                })),
              },
            },
          ]}
          download={defaultProps.download}
        />
      )
    ).toThrow('<PricingFeatureTabs /> only supports between 2 and 7 tabs')
  })
})

const { withColumnHeaders, withoutColumnHeaders, withAllColumnHeaders } = cms

describe('Format cms data', () => {
  it('should format without a empty first column header', () => {
    const normalized = normalizeTableData(withColumnHeaders)
    expect(normalized).toMatchObject(table)
  })

  it('should format without column headers', () => {
    const normalized = normalizeTableData(withoutColumnHeaders)
    const expected = {
      columns: null,
      rows: table.rows,
    }
    expect(normalized).toMatchObject(expected)
  })

  it('should format with all column headers', () => {
    const normalized = normalizeTableData(withAllColumnHeaders)
    const expected = {
      columns: ['First', 'Col 1', 'Col 2'],
      rows: table.rows,
    }
    expect(normalized).toMatchObject(expected)
  })
})

const defaultTabs = [
  {
    label: {
      heading: 'tab',
      icon: <span>icon</span>,
    },
    content: { table },
  },
  {
    label: {
      heading: 'tab 2',
      icon: <span>icon</span>,
    },
    content: { table },
  },
]

const defaultProps = {
  features: [
    {
      heading: 'Features Section',
      content: {
        tabs: defaultTabs,
      },
    },
    {
      heading: 'Features Section 2',
      content: {
        table,
      },
    },
  ],
  download: {
    heading: 'Download the entire feature edition chart',
    description:
      'Ultricies risus molestie cursus metus mattis consectetur amet vitae eu. A diam tellus id neque urna auctor cursus ipsum.',
    pdfLink: {
      title: 'Download PDF',
      url: 'https://www.datocms-assets.com/2885/1654902115-hashicorp_a_cloud_operating_model_for_platform_teams.pdf',
    },
  },
}
