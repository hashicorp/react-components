import { render, screen } from '@testing-library/react'
import PricingTierTable from '.'
import { normalizeTableData } from './helpers/normalizeTableData'
import cmsData from './fixtures/cmsData.json'

const rows = [
  {
    header: {
      heading: '<h3>Dynamic Secrets</h3>',
    },
    cells: [false, true],
    isCollapsible: false,
  },
  {
    header: {
      heading: '<h3>Detailed Auto Logs</h3>',
      content:
        '<p>Dynamic secrets are generated on demand and are unique to a client and can be revoked immediately after use, minimizing the life of a secret.</p>',
    },
    cells: [
      true,
      {
        heading: '<h3>Detailed Auto Logs</h3>',
        content:
          '<p>Dynamic secrets are generated on demand and are unique to a client and can be revoked immediately after use, minimizing the life of a secret.</p>',
      },
    ],
    isCollapsible: true,
  },
]

describe('<PricingTierTable />', () => {
  it('should render', () => {
    render(
      <PricingTierTable columns={['', 'Development', 'Starter']} rows={rows} />
    )
    const element = screen.getByTestId('pricing-table')
    expect(element).toBeInTheDocument()
  })
})

const { withColumnHeaders, withoutColumnHeaders, withAllColumnHeaders } =
  cmsData

describe('Format cms data', () => {
  it('should format without a empty first column header', () => {
    const normalized = normalizeTableData(withColumnHeaders)
    const expected = {
      columns: ['', 'Development', 'Starter'],
      rows,
    }

    expect(normalized).toMatchObject(expected)
  })

  it('should format without column headers', () => {
    const normalized = normalizeTableData(withoutColumnHeaders)
    const expected = {
      columns: null,
      rows,
    }
    expect(normalized).toMatchObject(expected)
  })

  it('should format with all column headers', () => {
    const normalized = normalizeTableData(withAllColumnHeaders)
    const expected = {
      columns: ['First', 'Development', 'Starter'],
      rows,
    }
    expect(normalized).toMatchObject(expected)
  })
})
