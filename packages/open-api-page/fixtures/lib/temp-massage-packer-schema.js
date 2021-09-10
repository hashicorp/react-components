const traverse = require('./traverse')

/**
 *
 * Note: this is a stopgap function to make some
 * modifications to Packer Cloud's auto-generated schema
 * in order to better render using our OpenAPI docs implementation.
 *
 * We likely want to aim to do something like:
 * - Roll these changes back into the process that generates the schema?
 * - Formalize that these changes are being made, so changes to the
 *   underlying scheme don't end up breaking things at this layer?
 *   (Modifying the schema at the source seems preferable, if possible).
 * - Undoing these changes and going with a less organized rendering
 *   using our OpenAPI Docs component?
 *
 * @param schema
 * @returns
 */
async function temp_massagePackerSchema(schema) {
  // Modify each "operationId" in order to better
  // group operations in the OpenAPI docs sidebar
  const opIdMap = {
    GetBuild: 'BuildService_GetBuild',
    DeleteBuild: 'BuildService_DeleteBuild',
    UpdateBuild: 'BuildService_UpdateBuild',
    ListBuckets: 'BucketService_ListBuckets',
    CreateBucket: 'BucketService_CreateBucket',
    GetBucket: 'BucketService_GetBucket',
    DeleteBucket: 'BucketService_DeleteBucket',
    UpdateBucket: 'BucketService_UpdateBucket',
    ListChannels: 'ChannelService_ListChannels',
    CreateChannel: 'ChannelService_CreateChannel',
    GetChannel: 'ChannelService_GetChannel',
    DeleteChannel: 'ChannelService_DeleteChannel',
    UpdateChannel: 'ChannelService_UpdateChannel',
    GetIteration: 'IterationService_GetIteration',
    ListIterations: 'IterationService_ListIterations',
    CreateIteration: 'IterationService_CreateIteration',
    CreateBuild: 'BuildService_CreateBuild',
    GetAncestorImages: 'BucketService_GetAncestorImages',
    GetChildImages: 'BucketService_GetChildImages',
    ListBuilds: 'BuildService_ListBuilds',
    DeleteIteration: 'IterationService_DeleteIteration',
    UpdateIteration: 'IterationService_UpdateIteration',
  }
  const withGroupedOperations = await traverse(schema, (key, value) => {
    // If this isn't an operationId, do nothing.
    if (key !== 'operationId') return value
    // If it is an operationId, prefix with an appropriate / guessed group.
    const prefixedOpId = opIdMap[value]
    return prefixedOpId || value
  })
  // Return the modified schema
  return withGroupedOperations
}

module.exports = temp_massagePackerSchema
