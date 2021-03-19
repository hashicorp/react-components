import * as React from 'react'

function SvgColor(props) {
  return (
    <div className="g-svg">
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAP4AAABYAQAAAAD9qHcPAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAnRSTlMAAHaTzTgAAAACYktHRAAB3YoTpAAAAAd0SU1FB+UDExIFFYBZxYAAAAAaSURBVEjH7cExAQAAAMKg9U9tCF+gAACA1wALWAABStLyMwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wMy0xOVQxODowNToyMSswMDowMCdItJAAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDMtMTlUMTg6MDU6MjErMDA6MDBWFQwsAAAAAElFTkSuQmCC"
        className="svg-sizer"
        alt=""
        role="presentation"
      />
      <svg
        width={254}
        height={88}
        viewBox="0 0 254 88"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <g clipPath="url(#color_svg__clip0)">
          <path
            d="M93.002 33.42V64h-7.44V23.68h10.16l15.281 30.61V23.68h7.44V64h-10.16l-15.28-30.58zM136.578 64.58c-10.1 0-12.82-5.57-12.82-11.62v-7.44c0-6 2.72-11.61 12.82-11.61s12.83 5.56 12.83 11.61V53c0 6-2.72 11.58-12.83 11.58zm0-24.38c-3.93 0-5.44 1.75-5.44 5.08v7.92c0 3.33 1.51 5.09 5.44 5.09 3.93 0 5.42-1.76 5.42-5.09v-7.92c0-3.28-1.48-5.08-5.42-5.08zM171.85 64V43.4c0-1.57-.67-2.36-2.36-2.36s-5 1.09-7.68 2.48V64h-7.38V34.51h5.62l.73 2.48a29.583 29.583 0 0111.8-3.08c2.84 0 4.59 1.15 5.56 3.14A28.998 28.998 0 01190 33.91c4.9 0 6.65 3.44 6.65 8.71V64h-7.38V43.4c0-1.57-.66-2.36-2.36-2.36a19.543 19.543 0 00-7.68 2.48V64h-7.38zM224.542 64h-6.05l-.55-2a16.148 16.148 0 01-8.77 2.6c-5.38 0-7.68-3.69-7.68-8.77 0-6 2.6-8.29 8.59-8.29h7.08v-3.11c0-3.26-.91-4.41-5.63-4.41a41.55 41.55 0 00-8.17.9l-.9-5.62a38.26 38.26 0 0110.1-1.39c9.25 0 12 3.26 12 10.64l-.02 19.45zm-7.38-11.13h-5.45c-2.42 0-3.08.67-3.08 2.91 0 2 .66 3 3 3a11.69 11.69 0 005.57-1.51l-.04-4.4zM229.07 44.31c0-6.53 2.9-10.4 9.74-10.4a41.08 41.08 0 017.87.84V22.47l7.38-1V64h-5.87l-.73-2.48a15.457 15.457 0 01-9.31 3.09c-5.93 0-9.08-3.51-9.08-10.23V44.31zM246.68 41a33.057 33.057 0 00-6.54-.78c-2.66 0-3.69 1.27-3.69 3.93v10.39c0 2.42.91 3.75 3.63 3.75a10.428 10.428 0 006.6-2.67V41z"
            fill="#000"
          />
          <path
            d="M29.14 10.19L0 27v33.63l29.12 16.81 29.14-16.81V27L29.14 10.19zm13 37l-7.76 4.48L25 46.54v10.72l-8.81 5.59v-22.4l7-4.28 9.7 5.11V30.34l9.25-5.56v22.41z"
            fill="#00CA8E"
          />
        </g>
        <defs>
          <clipPath id="color_svg__clip0">
            <path fill="#fff" d="M0 0h254v88H0z" />
          </clipPath>
        </defs>
      </svg>
    </div>
  )
}

export default SvgColor
