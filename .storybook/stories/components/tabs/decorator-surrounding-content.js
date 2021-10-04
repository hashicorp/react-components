function DecoratorSurroundingContent(Story, { args }) {
  return (
    <div
      style={{
        color: args.theme === 'dark' ? 'white' : 'black',
        background: args.theme === 'dark' ? 'black' : 'white',
      }}
    >
      <div
        style={{
          background: args.theme === 'dark' ? 'black' : 'aliceblue',
          paddingTop: '2vh',
          paddingBottom: '2vh',
        }}
      >
        <div className="g-grid-container">
          Hello world! This is an alert banner or something.
        </div>
      </div>
      <div
        style={{
          background: args.theme === 'dark' ? 'black' : 'aliceblue',
          textAlign: 'center',
        }}
      >
        <div
          className="g-grid-container"
          style={{
            background: args.theme === 'dark' ? '#111111' : 'lavender',
            padding: '10vh 0',
          }}
        >
          Hello world! this is some centered page content in g-grid-container.
          <br />
          It just needs to take up some space on the page.
        </div>
      </div>
      <Story args={args} />
      <div
        style={{
          background: args.theme === 'dark' ? 'black' : 'aliceblue',
          textAlign: 'center',
        }}
      >
        <div className="g-grid-container" style={{ minHeight: '200vh' }}>
          <div
            style={{
              background: args.theme === 'dark' ? '#111111' : 'lavender',
              padding: '10vh 0',
            }}
          >
            Hello world! this is some centered page content in g-grid-container.
            <br />
            It just needs to take up some space on the page.
          </div>
        </div>
        <div className="g-grid-container" style={{ padding: '10vh 0' }}>
          Okay, that's enough.
        </div>
      </div>
    </div>
  )
}

export default DecoratorSurroundingContent
