import Button from '@hashicorp/react-button'
import s from './style.module.css'

interface DownloadBlockProps {
  heading: string
  description: string
  pdfLink: {
    title: string
    url: string
  }
}

export default function DownloadBlock({
  heading,
  description,
  pdfLink,
}: DownloadBlockProps) {
  return (
    <div className={s.downloadContainer}>
      <h2 className={s.downloadHeading}>{heading}</h2>
      <p className={s.downloadDescription}>{description}</p>
      <Button title={pdfLink.title} url={pdfLink.url} />
    </div>
  )
}
