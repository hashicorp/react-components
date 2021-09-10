const fs = require('fs')
const packerRawSwagger = require('./raw-schemas/packer.swagger.json')
const boundaryRawSwagger = require('./raw-schemas/boundary.swagger.json')
const dereferenceSchema = require('../dereference-schema')
const temp_massagePackerSchema = require('./lib/temp-massage-packer-schema')

main()

async function main() {
  if (!fs.existsSync('./fixtures/generated')) {
    fs.mkdirSync('./fixtures/generated')
  }
  // Generate de-referenced Boundary swagger file
  const boundarySwagger = await dereferenceSchema(boundaryRawSwagger)
  fs.writeFileSync(
    './fixtures/generated/boundary.swagger.json',
    JSON.stringify(boundarySwagger, null, 2)
  )
  // Generate de-referenced Packer swagger file
  const packerSwagger = await dereferenceSchema(packerRawSwagger)
  const packerMassagedSwagger = await temp_massagePackerSchema(packerSwagger)
  fs.writeFileSync(
    './fixtures/generated/packer.swagger.json',
    JSON.stringify(packerMassagedSwagger, null, 2)
  )
}
