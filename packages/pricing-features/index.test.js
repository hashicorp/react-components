import { render, screen } from '@testing-library/react'
import PricingFeatures from '.'
import { normalizeTableData } from './helpers'
import cms from './fixtures/cms.json'
import download from './fixtures/download.json'
import table from './fixtures/table.json'

describe('<PricingFeatures />', () => {
  it('should render', () => {
    render(
      <PricingFeatures
        features={[
          {
            heading: 'Features',
            content: {
              tabs: [
                {
                  label: 'tab',
                  icon: <span>icon</span>,
                  content: table,
                },
                {
                  label: 'tab 2',
                  icon: <span>icon 2</span>,
                  content: table,
                },
              ],
            },
          },
        ]}
        download={download}
      />
    )
    const element = screen.getByTestId('pricing-features')
    expect(element).toBeInTheDocument()
  })
})

const { withColumnHeaders, withoutColumnHeaders, withAllColumnHeaders } = cms

describe('Format cms data', () => {
  it('should format without a empty first column header', () => {
    const normalized = normalizeTableData(withColumnHeaders)
    const expected = {
      columns: table.columns,
      rows: table.rows,
    }

    expect(normalized).toMatchObject(expected)
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
      columns: ['First', 'Development', 'Starter'],
      rows: table.rows,
    }
    expect(normalized).toMatchObject(expected)
  })
})
