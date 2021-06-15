import fragment from './fragment.graphql'
import Image from '@hashicorp/react-image'

function AuthorCard({ data }) {
  return <p>{JSON.stringify(data)}</p>
}

AuthorCard.fragmentSpec = { fragment, dependencies: [Image] }

export default AuthorCard
