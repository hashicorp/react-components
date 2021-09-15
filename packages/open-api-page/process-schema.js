import fs from 'fs'
import RefParser from '@apidevtools/json-schema-ref-parser'
import traverse, { isObject, isArray } from './utils/traverse'
import markdownToHtml from '@hashicorp/platform-markdown-utils/markdown-to-html'

async function dereferenceSchema(schemaJson) {
  return await RefParser.dereference(schemaJson)
}

async function processPropertyOrParameter(value) {
  const clonedValue = { ...value }
  if (value.title) {
    clonedValue.title = await markdownToHtml(value.title)
  }
  if (value.description) {
    clonedValue.description = await markdownToHtml(value.description)
  }
  return clonedValue
}

async function processSchema(schemaJson) {
  const withMarkdownAsHtml = await traverse(schemaJson, async (key, value) => {
    // Only process markdown in specific scenarios
    const isOperationObject = isObject(value) && Boolean(value.operationId)
    const isPropertiesObject = isObject(value) && key === 'properties'
    const isParametersArray = isArray(value) && key === 'parameters'
    // Otherwise, process markdown as needed
    if (isOperationObject) {
      // Operation objects have "summary" values which may contain markdown
      const clonedValue = { ...value }
      if (value.summary) {
        clonedValue.summary = await markdownToHtml(value.summary)
      }
      return clonedValue
    } else if (isPropertiesObject) {
      // Various objects have "properties" which have
      // "title" and "description" values which may contain markdown
      const propertyKeys = Object.keys(value)
      const propertyValues = propertyKeys
        .map((k) => value[k])
        .map(processPropertyOrParameter)
      // Reconstruct the object
      const processedValue = propertyValues.reduce((acc, propValue, idx) => {
        acc[propertyKeys[idx]] = propValue
        return acc
      }, {})
      // Return the reconstructed object
      return processedValue
    } else if (isParametersArray) {
      // Various objects have "parameters" which have
      // "title" and "description" values which may contain markdown
      return await Promise.all(value.map(processPropertyOrParameter))
    }
    // If we get here, there was no need to process markdown,
    // so we return the value unmodified
    return value
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
