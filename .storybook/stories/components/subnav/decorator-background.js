import BgColor from '../../../components/bg-color'

function DecoratorBackground(Story, { args }) {
  return (
    <div style={{ position: 'relative' }}>
      <BgColor color={args.theme === 'dark' ? 'black' : 'white'} />
      <div style={{ position: 'relative' }}>{Story()}</div>
    </div>
  )
}

export default DecoratorBackground
