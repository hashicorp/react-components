export default function TerraformIcon({ title, size, ...props }) {
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
        d="M16.664 7.384l10.468 6.042v12.085L16.664 19.47V7.384z"
        fill="#623CE4"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M28.277 13.426v12.085l10.468-6.042V7.379l-10.468 6.047z"
        fill="#3C2AA8"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.047.634v12.085l10.468 6.048V6.677L5.047.633zM16.664 32.878l10.463 6.048v-12.09l-10.463-6.043v12.085z"
        fill="#623CE4"
      />
    </svg>
  )
}
