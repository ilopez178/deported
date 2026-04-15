// src/components/Button.tsx

import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  isLoading?: boolean
  ariaLabel?: string
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  isLoading = false,
  ariaLabel,
  disabled,
  style,
  ...props
}) => {
  const variantStyle: React.CSSProperties = variant === 'primary'
    ? { background: '#0066ff', color: '#fff', border: 'none' }
    : { background: '#e5e7eb', color: '#0a0a0a', border: '1px solid #d1d5db' }

  const sizeStyle: React.CSSProperties =
    size === 'sm' ? { padding: '6px 12px', fontSize: '0.875rem' } :
    size === 'lg' ? { padding: '14px 32px', fontSize: '1.125rem' } :
    { padding: '10px 24px', fontSize: '1rem' }

  const baseStyle: React.CSSProperties = {
    fontWeight: 600,
    cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
    opacity: disabled || isLoading ? 0.5 : 1,
    borderRadius: '8px',
    transition: 'opacity 0.15s, background 0.15s',
    width: '100%',
    ...variantStyle,
    ...sizeStyle,
    ...style
  }

  return (
    <button
      style={baseStyle}
      disabled={disabled || isLoading}
      aria-label={ariaLabel}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  )
}
