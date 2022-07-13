import { normalizeTableData } from './helpers/normalizeTableData'
import cmsData from './fixtures/cmsData.json'

const { withColumnHeaders, withoutColumnHeaders, withAllColumnHeaders } =
  cmsData

describe('Format cms data', () => {
  it('should format without a empty first column header', () => {
    const normalized = normalizeTableData(withColumnHeaders)
    const expected = {
      columns: ['', 'Development', 'Starter', 'Standard'],
      rows: [
        {
          heading: '<p><strong>Dynamic Secrets</strong></p>',
          cells: [false, false, true],
          isCollapsible: false,
        },
        {
          heading: '<p>Detailed Auto Logs</p>',
          cells: [
            '<p><strong>Single node</strong></p><p>Extra small</p>',
            '<a>Single node</a>',
            false,
          ],
          isCollapsible: true,
        },
      ],
    }
    expect(normalized).toMatchObject(expected)
  })

  it('should format without column headers', () => {
    const normalized = normalizeTableData(withoutColumnHeaders)
    const expected = {
      columns: null,
      rows: [
        {
          heading: '<p><strong>Dynamic Secrets</strong></p>',
          cells: [false, false, true],
          isCollapsible: false,
        },
        {
          heading: '<p>Detailed Auto Logs</p>',
          cells: [
            '<p><strong>Single node</strong></p><p>Extra small</p>',
            '<a>Single node</a>',
            false,
          ],
          isCollapsible: true,
        },
      ],
    }
    expect(normalized).toMatchObject(expected)
  })

  it('should format with all column headers', () => {
    const normalized = normalizeTableData(withAllColumnHeaders)
    const expected = {
      columns: ['Development', 'Starter', 'Standard'],
      rows: [
        {
          heading: '<p><strong>Dynamic Secrets</strong></p>',
          cells: [false, true],
          isCollapsible: false,
        },
        {
          heading: '<p><strong>Single node</strong></p><p>Extra small</p>',
          cells: ['<a>Single node</a>', false],
          isCollapsible: true,
        },
      ],
    }
    expect(normalized).toMatchObject(expected)
  })
})
