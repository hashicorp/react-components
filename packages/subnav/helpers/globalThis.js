!(function t(e) {
  e
    ? typeof globalThis == 'object' ||
      e.prototype.__defineGetter__('_', t) ||
      // eslint-disable-next-line no-undef
      _ ||
      delete e.prototype._
    : (this.globalThis = this)
})(Object)
