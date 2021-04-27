function semverSort(a, b, descending = false) {
  const aBeforeB = -1
  const bBeforeA = 1
  const whenAIsLatest = descending ? aBeforeB : bBeforeA
  const whenBIsLatest = descending ? bBeforeA : aBeforeB
  const [ax, ay, az] = a.match(/(\d+)\.(\d+)\.(.+)$/).slice(1)
  const [bx, by, bz] = b.match(/(\d+)\.(\d+)\.(.+)$/).slice(1)
  return ax > bx
    ? whenAIsLatest
    : ax < bx
    ? whenBIsLatest
    : ay > by
    ? whenAIsLatest
    : ay < by
    ? whenBIsLatest
    : az > bz
    ? whenAIsLatest
    : az < bz
    ? whenBIsLatest
    : 0
}

export default semverSort
