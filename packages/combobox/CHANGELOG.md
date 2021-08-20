# @hashicorp/react-combobox

## 1.0.0

### Major Changes

- [#289](https://github.com/hashicorp/react-components/pull/289) [`76895a2`](https://github.com/hashicorp/react-components/commit/76895a24d56ddacba06a331d9c5a1ac146cdaf6f) Thanks [@jmfury](https://github.com/jmfury)! - Breaking Change: inputProps now handles all input related features to allow more flexibility

  ### What changed?

  Previously `onInputChange` and `onInputBlur` were the only props consumers could use to customize the behavior of the interal `<input />` of the `<Combobox />` (the default export of this package).

  `inputProps` now accepts all InputHTMLElement props for full customization of the input, and importantly allows for adding `name`, `id` or other standard attributes that might be required in certain form implementations.

  ### Which components changed?

  - `<Combobox />` - the default export of this package - see above or below for me details
  - `<ComboboxInput />` - a named export of this package - now accepts `<input />`-specific props

  ### How to update your code

  Please remove `onInputChange` and `onInputBlur` and use `inputProps` as an object to pass props to the internal `<input />` of the default `Combobox` component.

  ```diff
        <Combobox
          label="Select your country"
  -       onInputChange={handleInputChange}
  -       onInputBlur={validate}
  +       inputProps={{
  +         onChange: handleInputChange,
  +         onBlur: validate,
  +         name: 'country',
  +       }}
          options={COUNTRY_OPTIONS}
  ```
