import './style.css'
import { fetch } from '@hashicorp/nextjs-scripts/dato/client'
import query from './query.graphql'
import { PersonRecord } from '../../types/dato'

export interface <%= pageClass %>Props {
  person: PersonRecord
}

function <%= pageClass %>({ person }: <%= pageClass %>Props) {
  return <div id='p-<%= page %>'>{person}</div>
}

// This is just an example of a data fetch from the CMS, please replace
// with your own data!
<%= pageClass %>.getInitialProps = async () => {
  const { person } = await fetch({ query })
  return { person }
}

export default <%= pageClass %>
