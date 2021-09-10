const RefParser = require('@apidevtools/json-schema-ref-parser')

export default async function parseSchema(fileString) {
  const rawSchema = JSON.parse(fileString)
  const schema = await RefParser.dereference(rawSchema)
  return schema
}
