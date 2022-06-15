import { render, waitFor } from '@testing-library/react'
import useErrorPageAnalytics from '../use-error-page-analytics'

function HookTestComponent({ statusCode }) {
  useErrorPageAnalytics(statusCode)
  return <div>Testing the useErrorPageAnalytics hook...</div>
}

describe('useErrorPageAnalytics', () => {
  it('calls window.analytics.track with the provided error code', async () => {
    // Mock window.analytics
    const forMockRestore = window.analytics
    // $TSFixMe loosens window.analytics type to diverge from Segment type
    // defined in @hashicorp/platform-types
    window.analytics = { track: jest.fn() } as $TSFixMe
    // Render and assert
    render(<HookTestComponent statusCode={404} />)
    await waitFor(() => expect(window.analytics.track).toHaveBeenCalledTimes(1))
    expect(window.analytics.track).toBeCalledWith('Error Page Loaded', {
      http_status_code: 404,
    })
    // Cleanup
    window.analytics = forMockRestore
  })
})
