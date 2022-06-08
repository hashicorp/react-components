export type Renderable = JSX.Element | string | null

export type ValueFunction<TValue, TArg> = (arg: TArg) => TValue
export type ValueOrFunction<TValue, TArg> = TValue | ValueFunction<TValue, TArg>

const isFunction = <TValue, TArg>(
  valOrFunction: ValueOrFunction<TValue, TArg>
): valOrFunction is ValueFunction<TValue, TArg> =>
  typeof valOrFunction === 'function'

export const resolveValue = <TValue, TArg>(
  valOrFunction: ValueOrFunction<TValue, TArg>,
  arg: TArg
): TValue => (isFunction(valOrFunction) ? valOrFunction(arg) : valOrFunction)

export interface Notification {
  createdAt: number
  id: string
  message: ValueOrFunction<Renderable, Notification>
  duration?: number
  pauseDuration: number
  visible: boolean
}

export type NotificationOptions = Partial<Pick<Notification, 'id' | 'duration'>>
