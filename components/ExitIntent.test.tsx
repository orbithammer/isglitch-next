import { describe, it, expect, vi, beforeEach, afterEach, Mock } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import ExitIntent from './ExitIntent'
import { useExitIntent } from 'use-exit-intent'

interface HandlerConfig {
  id: string;
  handler: () => void;
}

type RegisterHandlerFn = (config: HandlerConfig) => void;

vi.mock('next/image', () => ({
  default: (props: any) => {
    return <img {...props} />
  }
}))

vi.mock('use-exit-intent', () => ({
  useExitIntent: vi.fn()
}))

describe('ExitIntent Component', () => {
  let mockRegisterHandler: Mock;
  
  beforeEach(() => {
    localStorage.clear()
    global.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve(['/image1.jpg', '/image2.jpg', '/image3.jpg'])
    })
    mockRegisterHandler = vi.fn() as Mock<RegisterHandlerFn>
    ;(useExitIntent as any).mockReturnValue({
      registerHandler: mockRegisterHandler
    })
  })
  
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should not render when no cookie consent is present', () => {
    render(<ExitIntent />)
    expect(screen.queryByText('Before You Go!')).not.toBeInTheDocument()
  })

  it('should not render when marketing cookies are disabled', () => {
    localStorage.setItem('cookieConsent', JSON.stringify({ marketing: false }))
    render(<ExitIntent />)
    expect(screen.queryByText('Before You Go!')).not.toBeInTheDocument()
  })

  it('should register handler when marketing cookies are enabled', async () => {
    localStorage.setItem('cookieConsent', JSON.stringify({ marketing: true }))
    await act(async () => {
      render(<ExitIntent />)
    })
    expect(mockRegisterHandler).toHaveBeenCalled()
  })

  it('should not show modal if last shown within 30 days', async () => {
    const recentDate = new Date()
    localStorage.setItem('cookieConsent', JSON.stringify({ marketing: true }))
    localStorage.setItem('marketingCookie', JSON.stringify({
      lastExitIntent: recentDate.toISOString()
    }))

    await act(async () => {
      render(<ExitIntent />)
    })
    expect(screen.queryByText('Before You Go!')).not.toBeInTheDocument()
  })

  it('should show modal if last shown more than 30 days ago', async () => {
    const oldDate = new Date()
    oldDate.setDate(oldDate.getDate() - 31)
    
    localStorage.setItem('cookieConsent', JSON.stringify({ marketing: true }))
    localStorage.setItem('marketingCookie', JSON.stringify({
      lastExitIntent: oldDate.toISOString()
    }))

    let handlerCallback: () => void = () => {}
    mockRegisterHandler.mockImplementation((config: HandlerConfig) => {
      handlerCallback = config.handler
    })

    await act(async () => {
      render(<ExitIntent />)
    })

    act(() => {
      handlerCallback()
    })
    expect(screen.getByText('Before You Go!')).toBeInTheDocument()
  })

  it('should handle image navigation correctly', async () => {
    localStorage.setItem('cookieConsent', JSON.stringify({ marketing: true }))
    
    let handlerCallback: () => void = () => {}
    mockRegisterHandler.mockImplementation((config: HandlerConfig) => {
      handlerCallback = config.handler
    })
  
    await act(async () => {
      render(<ExitIntent />)
    })
  
    act(() => {
      handlerCallback()
    })
  
    // Navigate using next button
    const nextButton = screen.getByLabelText('Next image')
    fireEvent.click(nextButton)
    expect(screen.getByAltText('Store preview')).toHaveAttribute('src', '/image2.jpg')
  
    // Navigate using previous button
    const prevButton = screen.getByLabelText('Previous image')
    fireEvent.click(prevButton)
    expect(screen.getByAltText('Store preview')).toHaveAttribute('src', '/image1.jpg')
  
    // Navigate using dots
    const navigationDots = screen.getAllByLabelText(/^Go to image \d+$/);
    fireEvent.click(navigationDots[2]); // Click the third dot
    expect(screen.getByAltText('Store preview')).toHaveAttribute('src', '/image3.jpg')
  });

  it('should close modal when close button is clicked', async () => {
    localStorage.setItem('cookieConsent', JSON.stringify({ marketing: true }))
    
    let handlerCallback: () => void = () => {}
    mockRegisterHandler.mockImplementation((config: HandlerConfig) => {
      handlerCallback = config.handler
    })

    await act(async () => {
      render(<ExitIntent />)
    })

    act(() => {
      handlerCallback()
    })

    const closeButton = screen.getByRole('button', { name: /close/i })
    fireEvent.click(closeButton)
    expect(screen.queryByText('Before You Go!')).not.toBeInTheDocument()
  })

  it('should handle image loading errors gracefully', async () => {
    localStorage.setItem('cookieConsent', JSON.stringify({ marketing: true }))
    global.fetch = vi.fn().mockRejectedValue(new Error('Failed to load images'))
    
    await act(async () => {
      render(<ExitIntent />)
    })
    expect(screen.queryByText('Before You Go!')).not.toBeInTheDocument()
  })

  it('should not render when image array is empty', async () => {
    localStorage.setItem('cookieConsent', JSON.stringify({ marketing: true }))
    global.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve([])
    })
    
    await act(async () => {
      render(<ExitIntent />)
    })
    expect(screen.queryByText('Before You Go!')).not.toBeInTheDocument()
  })

  it('should handle circular navigation in carousel', async () => {
    localStorage.setItem('cookieConsent', JSON.stringify({ marketing: true }))
    
    let handlerCallback: () => void = () => {}
    mockRegisterHandler.mockImplementation((config: HandlerConfig) => {
      handlerCallback = config.handler
    })

    await act(async () => {
      render(<ExitIntent />)
    })

    act(() => {
      handlerCallback()
    })

    const nextButton = screen.getByRole('button', { name: /next image/i })
    fireEvent.click(nextButton)
    fireEvent.click(nextButton)
    expect(screen.getByAltText('Store preview')).toHaveAttribute('src', '/image3.jpg')

    fireEvent.click(nextButton)
    expect(screen.getByAltText('Store preview')).toHaveAttribute('src', '/image1.jpg')

    const prevButton = screen.getByRole('button', { name: /previous image/i })
    fireEvent.click(prevButton)
    expect(screen.getByAltText('Store preview')).toHaveAttribute('src', '/image3.jpg')
  })
})