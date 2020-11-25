import React, { useState, useEffect } from 'react'

function UsageDetails({ packageName }) {
  const [data, setData] = useState(null)

  useEffect(() => {
    async function getDetails() {
      const response = await fetch(`/api/fetch-usage-details/${packageName}`)
      const data = await response.json()
      setData(data)
    }

    getDetails()
  }, [packageName])

  return (
    <div>
      <pre>
        <code>
          {packageName}
          <br />
          <br />
          {data ? JSON.stringify(data, null, 2) : 'Loading usage details...'}
        </code>
      </pre>
    </div>
  )
}

export default UsageDetails
