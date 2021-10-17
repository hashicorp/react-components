export interface Parameter {
  /** The name of the parameter. Parameter names are case sensitive. */
  name: string
  /** A brief, plain text description of the parameter. Note that [GitHub-flavor markdown](https://guides.github.com/features/mastering-markdown/#GitHub-flavored-markdown) is not currently supported. */
  description: string
  /** Indicates whether this parameter is mandatory. */
  required: boolean
  /** The location of the parameter. Note: `formData` and `header` are not currently supported in the UI. */
  in: 'query' | 'path' | 'body'
  /** Schema is used for "body" parameters. */
  schema: Record<string, unknown>
  /** Type defines the parameter type, for non-"body" parameters. */
  type: 'array' | 'boolean' | 'integer' | 'number' | 'object' | 'string'
}

export interface Response {
  /** Passed to the <ResponseObject /> component. We only support "200" response codes, for now. */
  200: Record<string, unknown>
}

export interface OperationObjectType {
  /** Flag whether this operation is deprecated */
  deprecated: boolean
  /** A unique string used to identify the operation.*/
  operationId: string
  /** A short summary of the operation. Markdown is supported. */
  summary?: string
  /** Responses object, keys are HTTP response codes */
  responses: Response
  /** Array of parameter objects. In the UI, parameters are grouped by "query" / "path" / "body". */
  parameters: Parameter[]
}
