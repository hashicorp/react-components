# CodeBlock Component

In this folder you'll find a React component that has the job of rendering CodeBlocks where codefence syntax is used:

In your MDX

````md
     ```shell-session
      $ terraform plan
      ###
      ### This will render in a CodeBlock
      ###
    ```
````

Result

![screenshot](https://user-images.githubusercontent.com/7191639/75790695-2db77580-5d31-11ea-8a6e-83b8064fa3b1.png)

### Hide Clipboard

In your MDX

````md
     ```shell-session hideClipboard
      $ terraform plan
      ###
      ### This will render in a CodeBlock
      ###
    ```
````

Result

![screenshot](https://user-images.githubusercontent.com/7191639/75790988-8ab32b80-5d31-11ea-9bd4-06a5e2a243d4.png)

### Component Props

We currently support the following properties for customization.

| Property        | Type     | Required | Description                                                        |
| --------------- | -------- | -------- | ------------------------------------------------------------------ |
| `hideClipboard` | `string` | no       | Hides the copy-to-clipboard button on hover of the `<CodeBlock />` |
