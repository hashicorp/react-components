import useProductMeta from '@hashicorp/platform-product-meta'
import Button from '@hashicorp/react-button'
import s from './style.module.css'
import classNames from 'classnames'

export default function LearnCallout({
  className,
  headline,
  product,
  background,
  items,
}) {
  const { themeClass, slug } = useProductMeta(product)
  return (
    <div
      className={classNames(s.root, className, themeClass || 'brand-neutral')}
      style={{ backgroundImage: background ? `url('${background}')` : 'none' }}
    >
      <div className={s.learnContainer}>
        <div className={s.columnContainer}>
          <div className={s.columnFlexCenterWrapper}>
            <div>
              <h2 className={s.headline}>{headline}</h2>
              <Button
                className={s.desktopButton}
                title="Explore HashiCorp Learn"
                url={`https://learn.hashicorp.com/${slug}`}
                linkType="outbound"
                theme={{ variant: 'primary', brand: product }}
              />
            </div>
          </div>
          {items.map((item) => {
            return (
              <a
                className={s.itemLink}
                key={item.title}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className={s.course}>
                  <div className={s.courseImage}>
                    <div className={s.courseTime}>{item.time}</div>
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className={s.courseContent}>
                    <div>
                      <label className={s.courseLabel}>{item.category}</label>
                      <h4 className={s.courseHeading}>{item.title}</h4>
                    </div>
                  </div>
                </div>
              </a>
            )
          })}
        </div>
        <Button
          className={s.mobileButton}
          title="Explore HashiCorp Learn"
          url={`https://learn.hashicorp.com/${slug}`}
          linkType="outbound"
          theme={{ variant: 'primary', brand: product }}
        />
      </div>
    </div>
  )
}
