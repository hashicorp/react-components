import Button from '@hashicorp/react-button'
import s from './style.module.css'

export default function ProductFeaturesList({ heading, features }) {
  return (
    <div className={s.root}>
      <h2 className={s.heading}>{heading}</h2>
      <div className={s.featuresContainer}>
        {features.map(({ title, content, icon, link }) => (
          <div key={title} className={s.feature}>
            <div className={s.featureIcon}>
              <img src={icon} alt={title} />
            </div>
            <div>
              <h4 className={s.featureHeading}>{title}</h4>
              <p className={s.featureContent}>{content}</p>
              {link && (
                <Button
                  className={s.featureButton}
                  linkType={link.type}
                  theme={{ variant: 'tertiary-neutral' }}
                  title={link.text}
                  url={link.url}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
