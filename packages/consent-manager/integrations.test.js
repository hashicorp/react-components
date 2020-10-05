test('fetches integrations from segment, formats them as expected', async () => {
  jest.resetModules()
  global.fetch = () =>
    Promise.resolve({
      ok: true,
      json: () => mockSegmentResponse,
    })
  const getIntegrations = await import('./integrations')
  const resp = await getIntegrations.default(
    mockProps.segmentServices,
    mockProps.additionalServices,
    'XXX - segment key',
    'XXX - util server root'
  )
  expect(resp['Test Category'][0].name).toBe('Test Non-Segment Service')
  expect(resp['Test Category'][0].origin).toBe('custom')
  expect(resp['Test Category'][1].name).toBe('Test Non-Segment Service 2')
  expect(resp['Test Category'][1].origin).toBe('custom')
  expect(resp['Test Category'][2].name).toBe('Google Analytics')
  expect(resp['Test Category'][2].origin).toBe('segment')
  expect(resp['Test Category'][3].name).toBe('LinkedIn Insight Tag')
  expect(resp['Test Category'][3].origin).toBe('segment')
  expect(resp['Email Marketing'][0].name).toBe('Marketo V2')
  expect(resp['Email Marketing'][0].origin).toBe('segment')
})

const mockSegmentResponse = [
  {
    name: 'Google Analytics',
    creationName: 'Google Analytics',
    description:
      'Google Analytics is the most popular analytics tool for the web. It’s free and provides a wide range of features. It’s especially good at measuring traffic sources and ad campaigns.',
    website: 'http://google.com/analytics',
    category: 'Test Category',
  },
  {
    name: 'LinkedIn Insight Tag',
    creationName: 'LinkedIn Insight Tag',
    description:
      'The LinkedIn Insight Tag is a piece of lightweight JavaScript code that you can add to your website to enable in-depth campaign reporting and unlock valuable insights about your website visitors. As a LinkedIn Marketing Solutions customer, you can use the LinkedIn Insight Tag to track conversions, retarget website visitors, and unlock additional insights about members interacting with your ads.',
    website: 'https://www.linkedin.com',
    category: 'Advertising',
  },
  {
    name: 'Marketo V2',
    creationName: 'Marketo V2',
    description:
      'Marketo is a marketing automation tool that can help you engage customers and prospects.',
    website: 'https://www.marketo.com/',
    category: 'Email Marketing',
  },
  {
    name: 'Heap',
    creationName: 'Heap',
    description:
      'Heap is an analytics tool that automatically tracks all of the actions your users perform just by flipping a switch, instead of after adding custom tracking code.',
    website: 'http://heapanalytics.com',
    category: 'Analytics',
  },
  {
    name: 'Google Tag Manager',
    creationName: 'Google Tag Manager',
    description:
      'Google Tag Manager lets you add or update your website tags, easily and for free.',
    website: 'https://www.google.com/analytics/tag-manager/',
    category: 'Tag Managers',
  },
  {
    name: 'Amazon S3',
    creationName: 'Amazon S3',
    description:
      'Our Amazon S3 copies our log files of your raw API calls from our S3 bucket to yours, where you can then perform custom analysis on them.',
    website: 'http://aws.amazon.com/s3',
    category: 'Analytics',
  },
]

const mockProps = {
  segmentServices: [
    {
      name: 'LinkedIn Insight Tag',
      category: 'Test Category',
      description: 'description',
    },
  ],
  additionalServices: [
    {
      name: 'Test Non-Segment Service',
      category: 'Test Category',
      description: 'description',
      body: 'test body',
      url: 'test url',
    },
    {
      name: 'Test Non-Segment Service 2',
      category: 'Test Category',
      description: 'description',
      body: 'test body 2',
      url: 'test url 2',
      async: true,
      addToBody: true,
      dataAttrs: [
        {
          name: 'test',
          value: 'foobar',
        },
      ],
    },
  ],
  categories: [
    {
      name: 'Test Category',
      description: 'description',
    },
  ],
}
