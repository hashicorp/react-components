const fs = require('fs')
const RefParser = require('@apidevtools/json-schema-ref-parser')

async function dereferenceSchema(schemaJson) {
  return await RefParser.dereference(schemaJson)
}

async function parseSchemaString(jsonString) {
  return await dereferenceSchema(JSON.parse(jsonString))
}

async function parseSchemaFile(filePath) {
  const jsonString = fs.readFileSync(filePath)
  return await parseSchemaString(jsonString)
}

module.exports = dereferenceSchema
module.exports.parseSchemaString = parseSchemaString
module.exports.parseSchemaFile = parseSchemaFile
