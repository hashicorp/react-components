import { makeFetchWithRetry } from '../fetch-with-retry'

jest.useFakeTimers()

describe('fetchWithRetry', () => {
  test('retries without delay', async () => {
    const fn = jest
      .fn()
      .mockRejectedValueOnce({})
      .mockRejectedValueOnce({})
      .mockResolvedValueOnce({})

    const withRetry = makeFetchWithRetry(fn, { retries: 3 })

    await withRetry('https://example.com')

    expect(fn).toHaveBeenCalledTimes(3)
  })

  test('throws after exceeding retry number', async () => {
    const fn = jest.fn().mockRejectedValue(new Error('error'))

    const withRetry = makeFetchWithRetry(fn, { retries: 3 })

    await expect(
      async () => await withRetry('https://example.com')
    ).rejects.toThrow()
    expect(fn).toHaveBeenCalledTimes(4)
  })

  test.only('adds backoff delay', async () => {
    const fn = jest
      .fn()
      .mockRejectedValueOnce({})
      .mockRejectedValueOnce({})
      .mockResolvedValueOnce('resolve')

    const withRetry = makeFetchWithRetry(fn, { retries: 3, delay: 10 })

    const promise = withRetry('https://example.com')

    while (fn.mock.calls.length < 3) {
      await Promise.resolve()
      jest.runOnlyPendingTimers()
    }

    expect(fn).toHaveBeenCalledTimes(3)

    expect(await promise).toEqual('resolve')
  })
})
