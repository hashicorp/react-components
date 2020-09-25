export default function ProductFeaturesList({ heading, features }) {
  return (
    <div className="g-product-features-list g-grid-container">
      <h2 className="g-type-display-2">{heading}</h2>
      <div className="features-container">
        {features.map(({ title, content, icon }) => (
          <div key={title} className="feature">
            <div className="feature-icon">
              <img src={icon} alt={title} />
            </div>
            <div className="content">
              <h4 className="g-type-display-4">{title}</h4>
              <p className="g-type-body-small">{content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
