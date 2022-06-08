import type { ValueFunction, ValueOrFunction } from '../types'

export const genId = (() => {
  let count = 0
  return () => {
    return (++count).toString()
  }
})()

const isFunction = <TValue, TArg>(
  valOrFunction: ValueOrFunction<TValue, TArg>
): valOrFunction is ValueFunction<TValue, TArg> =>
  typeof valOrFunction === 'function'

export const renderNotification = <TValue, TArg>(
  valOrFunction: ValueOrFunction<TValue, TArg>,
  arg: TArg
): TValue => (isFunction(valOrFunction) ? valOrFunction(arg) : valOrFunction)
