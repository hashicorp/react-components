import { normalizeTableData } from './helpers/normalizeTableData'
import cmsData from './fixtures/cmsData.json'

const { withColumnHeaders, withoutColumnHeaders, withAllColumnHeaders } =
  cmsData

const expectedRows = [
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

describe('Format cms data', () => {
  it('should format without a empty first column header', () => {
    const normalized = normalizeTableData(withColumnHeaders)
    const expected = {
      columns: ['', 'Development', 'Starter'],
      rows: expectedRows,
    }

    expect(normalized).toMatchObject(expected)
  })

  it('should format without column headers', () => {
    const normalized = normalizeTableData(withoutColumnHeaders)
    const expected = {
      columns: null,
      rows: expectedRows,
    }
    expect(normalized).toMatchObject(expected)
  })

  it('should format with all column headers', () => {
    const normalized = normalizeTableData(withAllColumnHeaders)
    const expected = {
      columns: ['First', 'Development', 'Starter'],
      rows: expectedRows,
    }
    expect(normalized).toMatchObject(expected)
  })
})
