export default function VaultIcon({ title, size, ...props }) {
  return (
    <svg
      width={size || 44}
      height={size || 44}
      viewBox="0 0 44 44"
      fill="none"
      role="presentation"
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <path
        d="M4.754 5.484l17.128 34.383L39.137 5.484H4.754zM23.903 12.4h1.995v1.979h-1.995v-1.979zm-3.968 7.979H17.96v-2.01h1.99l-.016 2.01zm0-2.99H17.96v-2.01h1.99l-.016 2.01zm0-2.989H17.96v-2.01h1.99l-.016 2.01zm2.99 8.974H20.95v-2.016h1.99l-.017 2.016zm0-2.995H20.95v-2.01h1.99l-.017 2.01zm0-2.99H20.95v-2.01h1.99l-.017 2.01zm0-2.989H20.95v-2.01h1.99l-.017 2.01zm.978.979h1.995v1.99h-1.995v-1.99zm0 4.979v-1.99h1.99v1.99h-1.99z"
        fill="#000"
      />
    </svg>
  )
}
