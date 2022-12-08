import { useEffect, useLayoutEffect } from 'react'

export const useSafeLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect
