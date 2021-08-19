---
'@hashicorp/react-combobox': major
---

Breaking Change: inputProps now handles all input related features to allow more flexibility

### What changed?

Previously `onInputChange` and `onInputBlur` were the only props consumers could use to customize the behavior of the `<input />` internally.

`inputProps` now accepts all InputHTMLElement props for full customization of the input, and importantly allows for adding `name`, `id` or other standard attributes that might be required in certain form implementations.

### How to update your code

Please remove `onInputChange` and `onInputBlur` and use `inputProps` as an object to pass props to the internal `<input />` of the default `Combobox` component.
