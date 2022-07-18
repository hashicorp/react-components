import { render, screen } from '@testing-library/react'
import PricingTierTable from '.'
import { normalizeTableData } from './helpers/normalizeTableData'
import cmsData from './fixtures/cmsData.json'
import rowsData from './fixtures/rowsData.json'
import downloadSectionData from './fixtures/downloadSectionData.json'

describe('<PricingTierTable />', () => {
  it('should render', () => {
    render(
      <PricingTierTable
        columns={['', 'Development', 'Starter']}
        rows={rowsData.rows}
        downloadSection={downloadSectionData.downloadSection}
      />
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
      rows: rowsData.rows,
    }

    expect(normalized).toMatchObject(expected)
  })

  it('should format without column headers', () => {
    const normalized = normalizeTableData(withoutColumnHeaders)
    const expected = {
      columns: null,
      rows: rowsData.rows,
    }
    expect(normalized).toMatchObject(expected)
  })

  it('should format with all column headers', () => {
    const normalized = normalizeTableData(withAllColumnHeaders)
    const expected = {
      columns: ['First', 'Development', 'Starter'],
      rows: rowsData.rows,
    }
    expect(normalized).toMatchObject(expected)
  })
})
