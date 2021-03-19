import * as React from 'react'

function SvgColor(props) {
  return (
    <div className="g-svg">
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOYAAABYAQAAAADJ0bYTAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAnRSTlMAAHaTzTgAAAACYktHRAAB3YoTpAAAAAd0SU1FB+UDExIFLahbfR4AAAAZSURBVEjH7cExAQAAAMKg9U9tB2+gAADgNwpQAAHTJ3rHAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTAzLTE5VDE4OjA1OjQ1KzAwOjAwFWiZBAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wMy0xOVQxODowNTo0NSswMDowMGQ1IbgAAAAASUVORK5CYII="
        className="svg-sizer"
        alt=""
        role="presentation"
      />
      <svg
        width={230}
        height={88}
        viewBox="0 0 230 88"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <g clipPath="url(#color_svg__clip0)">
          <path
            d="M75.84 23.69h15.73c9.31 0 12.76 3.81 12.76 10.89v5.5c0 7-3.75 10.83-13.13 10.83h-7.74V64h-7.62V23.69zm15.3 6.72h-7.68V44.2h7.68c4.3 0 5.57-1.58 5.57-4.9v-4.11c0-3.33-1.41-4.78-5.57-4.78zM130.09 64h-6l-.54-2a16.153 16.153 0 01-8.77 2.6c-5.39 0-7.68-3.69-7.68-8.77 0-6 2.6-8.29 8.58-8.29h7.08v-3.1c0-3.27-.91-4.42-5.62-4.42a41.477 41.477 0 00-8.17.91l-.91-5.62a38.372 38.372 0 0110.1-1.39c9.26 0 12 3.26 12 10.64L130.09 64zm-7.38-11.12h-5.41c-2.42 0-3.09.66-3.09 2.9 0 2 .67 3 3 3a11.571 11.571 0 005.56-1.51l-.06-4.39zM134.5 53.27v-8c0-7.93 3.45-11.31 12.7-11.31 2.437.003 4.862.353 7.2 1.04l-.91 6c-2-.492-4.05-.754-6.11-.78-4.23 0-5.5 1.27-5.5 4.9v8.16c0 3.63 1.27 4.9 5.5 4.9a24.58 24.58 0 006.11-.79l.91 6a24.117 24.117 0 01-7.2 1.09c-9.25.1-12.7-3.29-12.7-11.21zM159.061 64V22.49l7.37-1V64h-7.37zm25-29.45l-8.61 14.55 9 14.87h-8.11l-8.88-14.87 8.41-14.58 8.19.03zM199.45 58.53a30.714 30.714 0 009-1.39l1.15 5.56a31.558 31.558 0 01-10.82 1.88c-9.26 0-12.46-4.3-12.46-11.37v-7.8c0-6.23 2.78-11.49 12.22-11.49 9.44 0 11.55 5.5 11.55 11.85v6.29h-16.38v1.51c0 3.57 1.27 4.96 5.74 4.96zm-5.74-12.4h9.37v-1.45c0-2.78-.84-4.72-4.47-4.72s-4.9 1.94-4.9 4.72v1.45zM229.811 40.69a58.126 58.126 0 00-7.8 4.29V64h-7.38V34.52h6.23l.48 3.27a32.936 32.936 0 017.75-3.87l.72 6.77z"
            fill="#000"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 16.27l22.69 13.11v48.34L0 64.61V16.27z"
            fill="#02A8EF"
          />
          <path
            d="M33.92 21.92L9.3 7.72v9.86l16.77 9.68v29.6l7.89 4.53c4.89 2.82 8.88 1.13 8.88-3.75V35.92c-.04-4.92-4.03-11.18-8.92-14z"
            fill="#02A8EF"
          />
        </g>
        <defs>
          <clipPath id="color_svg__clip0">
            <path fill="#fff" d="M0 0h230v88H0z" />
          </clipPath>
        </defs>
      </svg>
    </div>
  )
}

export default SvgColor
