import AccordionItems from './'
import PropTypes from 'prop-types'

function AccordionItemsProps(props) {
  return <AccordionItems {...props} />
}

AccordionItemsProps.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      heading: PropTypes.string,
      content: PropTypes.oneOfType(PropTypes.string, PropTypes.func),
    })
  ),
}

AccordionItemsProps.defaultProps = {}

export default AccordionItemsProps
