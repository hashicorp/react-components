import Button from '@hashicorp/react-button'
import s from './style.module.css'

export default function DownloadSection({ heading, description, pdfLink }) {
  return (
    <div className={s.downloadContainer}>
      <h2 className={s.downloadHeading}>{heading}</h2>
      <p className={s.downloadDescription}>{description}</p>
      <Button title={pdfLink.title} url={pdfLink.url} />
    </div>
  )
}
