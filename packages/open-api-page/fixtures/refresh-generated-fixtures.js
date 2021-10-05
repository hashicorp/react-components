import fs from 'fs'
import packerRawSwagger from './raw-schemas/packer.swagger.json'
import boundaryRawSwagger from './raw-schemas/boundary.swagger.json'
import processSchema from '../process-schema'

main()

async function main() {
  if (!fs.existsSync('./fixtures/generated')) {
    fs.mkdirSync('./fixtures/generated')
  }
  // Generate de-referenced Boundary swagger file
  const boundarySwagger = await processSchema(boundaryRawSwagger)
  fs.writeFileSync(
    './fixtures/generated/boundary.swagger.json',
    JSON.stringify(boundarySwagger, null, 2)
  )
  // Generate de-referenced Packer swagger file
  const packerSwagger = await processSchema(packerRawSwagger)
  fs.writeFileSync(
    './fixtures/generated/packer.swagger.json',
    JSON.stringify(packerSwagger, null, 2)
  )
}
