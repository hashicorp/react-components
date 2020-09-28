export default function PackerIcon({ title, size, ...props }) {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.879 5.846l13.601 7.857v28.973L8.879 34.82V5.846z"
        fill="#00ACFF"
      />
      <path
        d="M29.21 9.235L14.428.724v5.91l10.053 5.803v17.739l4.729 2.718c2.93 1.686 5.319.676 5.319-2.25v-13c.005-2.941-2.389-6.718-5.32-8.41z"
        fill="#0086D0"
      />
    </svg>
  )
}
