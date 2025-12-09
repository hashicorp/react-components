/**
 * Copyright IBM Corp. 2020, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { fireEvent, render, screen } from '@testing-library/react'
import { renderHook } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import {
  useNotifications,
  notification,
  Notifications,
  Notification,
  NotificationWithProduct,
  NotificationWithLanguage,
  NotificationWithResource,
  NotificationWithThumbnail,
  NotificationWithActions,
} from '.'

const defaultProps = {
  description:
    'lAliquet in lacus, scelerisque tristique purus. Lob ortis felis orci lacus egestas et turpis.',
  cta: {
    title: 'Standalone link',
    url: '/',
  },
  onDismiss: () => {},
}

describe('useNotifications()', () => {
  it('should handle managing notifications', () => {
    const { result } = renderHook(() => useNotifications())
    expect(result.current.notifications.length).toBe(0)
    act(() => {
      notification(() => {}, { id: 'test-id' })
    })
    expect(result.current.notifications.length).toBe(1)
    expect(result.current.notifications[0]).toMatchObject({
      createdAt: expect.any(Number),
      visible: true,
      message: expect.any(Function),
      pauseDuration: 0,
      id: expect.any(String),
      duration: 6000,
    })
    act(() => {
      notification.remove('test-id')
    })
    expect(result.current.notifications.length).toBe(0)
  })

  it('accepts custom options', () => {
    const { result } = renderHook(() => useNotifications())
    act(() => {
      notification(() => {}, { id: 'test-id', duration: 8000 })
    })
    expect(result.current.notifications[0]).toMatchObject({
      createdAt: expect.any(Number),
      visible: true,
      message: expect.any(Function),
      pauseDuration: 0,
      id: 'test-id',
      duration: 8000,
    })
  })
})

describe('<Notifications />', () => {
  it('should render notification container', () => {
    render(<Notifications />)
    screen.getByTestId('notifications')
  })
})

describe('<Notification />', () => {
  it('should render with defaults', () => {
    render(<Notification {...defaultProps} />)
    const notification = screen.getByTestId('notification')
    const description = screen.getByText(defaultProps.description)
    const cta = screen.getByText(defaultProps.cta.title).closest('a')
    expect(notification).toBeInTheDocument()
    expect(description).toBeInTheDocument()
    expect(cta).toBeInTheDocument()
    expect(cta).toHaveAttribute('href', defaultProps.cta.url)
  })

  it('should handle onDismiss handler', () => {
    const mockCallBack = jest.fn()
    render(<Notification {...defaultProps} onDismiss={mockCallBack} />)
    const closeButton = screen.getByLabelText('Dimiss notification')
    fireEvent.click(closeButton)
    expect(mockCallBack).toHaveBeenCalled()
  })
})

describe('<NotificationWithProduct />', () => {
  it('should render with defaults with product', () => {
    render(<NotificationWithProduct {...defaultProps} product="vault" />)
    const notification = screen.getByTestId('notification')
    expect(notification).toBeInTheDocument()
    expect(screen.getByText('Vault')).toBeInTheDocument()
  })
})

describe('<NotificationWithLanguage />', () => {
  it('should render defaults with language', () => {
    render(<NotificationWithLanguage {...defaultProps} language="en" />)
    const notification = screen.getByTestId('notification')
    expect(notification).toBeInTheDocument()
    expect(screen.getByAltText('en')).toBeInTheDocument()
  })
})

describe('<NotificationWithResource />', () => {
  it('should render defaults with resource', () => {
    render(<NotificationWithResource {...defaultProps} type="webinar" />)
    const notification = screen.getByTestId('notification')
    expect(notification).toBeInTheDocument()
    expect(screen.getByText('Webinar')).toBeInTheDocument()
  })
})

describe('<NotificationWithThumbnail />', () => {
  it('should render defaults with thumbnail', () => {
    render(
      <NotificationWithThumbnail
        {...defaultProps}
        thumbnail={{
          src: 'https://www.datocms-assets.com/2885/1651495958-infrastructure.png',
          alt: 'Notification alt',
        }}
      />
    )
    const notification = screen.getByTestId('notification')
    expect(notification).toBeInTheDocument()
    expect(screen.getByAltText('Notification alt')).toBeInTheDocument()
  })
})

describe('<NotificationWithActions />', () => {
  it('should render defaults with actions', () => {
    render(
      <NotificationWithActions
        heading="Notification heading"
        description="Notification description"
        actions={[
          {
            title: 'Primary action',
            onClick: () => {},
          },
          {
            title: 'Secondary action',
            onClick: () => {},
          },
        ]}
      />
    )
    const notification = screen.getByTestId('notification')
    expect(notification).toBeInTheDocument()
    expect(screen.getByText('Primary action')).toBeInTheDocument()
    expect(screen.getByText('Secondary action')).toBeInTheDocument()
  })

  it('should handle on click events', () => {
    const mockCallBack = jest.fn()
    render(
      <NotificationWithActions
        heading="Notification heading"
        description="Notification description"
        actions={[
          {
            title: 'Primary action',
            onClick: mockCallBack,
          },
          {
            title: 'Secondary action',
            onClick: mockCallBack,
          },
        ]}
      />
    )
    const primaryAction = screen.getByText('Primary action')
    const secondaryAction = screen.getByText('Secondary action')
    fireEvent.click(primaryAction)
    expect(mockCallBack).toHaveBeenCalledTimes(1)
    fireEvent.click(secondaryAction)
    expect(mockCallBack).toHaveBeenCalledTimes(2)
  })
})
