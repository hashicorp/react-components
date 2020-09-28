export default function NomadIcon({ title, size, ...props }) {
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
        d="M21.67 4.184L5.95 13.264l10.607 6.228 2.143-1.308 5.213 2.91V15.05l4.995-3v6.053l8.739-4.846v-.021L21.669 4.184z"
        fill="#00BC7F"
      />
      <path
        d="M28.91 18.104v6.01l-4.182 2.416-2.925-1.814v15.686l.08.005 15.765-9.058v-18.09h-.292l-8.447 4.845z"
        fill="#009A69"
      />
      <path
        d="M19.69 23.514v6.032l-4.755 3.016v-12.07l1.803-1.111-10.691-6.123-.096.006v18.085l15.851 9.053V24.716l-2.111-1.202z"
        fill="#00BC7F"
      />
    </svg>
  )
}
