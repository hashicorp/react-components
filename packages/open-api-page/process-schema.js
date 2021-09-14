import fs from 'fs'
import RefParser from '@apidevtools/json-schema-ref-parser'
import traverse from './utils/traverse'
import markdownToHtml from '@hashicorp/platform-markdown-utils/markdown-to-html'

async function dereferenceSchema(schemaJson) {
  return await RefParser.dereference(schemaJson)
}

async function processSchema(schemaJson) {
  const withMarkdownAsHtml = await traverse(schemaJson, async (key, value) => {
    // If this isn't a description or summary, do nothing.
    if (key !== 'description' && key !== 'summary') return value
    // If it is a description or summary, process it as markdown, and output HTML
    return await markdownToHtml(value)
  })
  return await dereferenceSchema(withMarkdownAsHtml)
}

async function processSchemaString(jsonString) {
  return await processSchema(JSON.parse(jsonString))
}

async function processSchemaFile(filePath) {
  const jsonString = fs.readFileSync(filePath)
  return await processSchemaString(jsonString)
}

export default processSchema
export { processSchemaFile, processSchemaString }
