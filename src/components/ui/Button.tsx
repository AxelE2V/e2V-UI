import type { FC, ReactNode, CSSProperties } from 'react';
import { tokens } from '../../tokens';
import { Icon } from './Icon';

export interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: string;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  style?: CSSProperties;
}

export const Button: FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  disabled = false,
  fullWidth = false,
  onClick,
  type = 'button',
  style,
}) => {
  const sizeStyles: Record<string, CSSProperties> = {
    sm: { padding: '6px 12px', fontSize: '12px', gap: '6px' },
    md: { padding: '10px 18px', fontSize: '13px', gap: '8px' },
    lg: { padding: '12px 24px', fontSize: '14px', gap: '10px' },
  };

  const variantStyles: Record<string, CSSProperties> = {
    primary: {
      background: tokens.colors.accent.main,
      color: tokens.colors.text.inverse,
      border: 'none',
    },
    secondary: {
      background: tokens.colors.cream[300],
      color: tokens.colors.text.primary,
      border: `1px solid ${tokens.colors.cream[400]}`,
    },
    danger: {
      background: tokens.colors.action.main,
      color: tokens.colors.text.inverse,
      border: 'none',
    },
    ghost: {
      background: 'transparent',
      color: tokens.colors.text.secondary,
      border: 'none',
    },
  };

  const baseStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'inherit',
    fontWeight: 600,
    borderRadius: tokens.radius.md,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: tokens.transitions.fast,
    width: fullWidth ? '100%' : 'auto',
    ...sizeStyles[size],
    ...variantStyles[variant],
    ...style,
  };

  const iconSize = size === 'sm' ? 14 : size === 'lg' ? 18 : 16;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={baseStyle}
    >
      {icon && iconPosition === 'left' && (
        <Icon name={icon} size={iconSize} color="currentColor" />
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <Icon name={icon} size={iconSize} color="currentColor" />
      )}
    </button>
  );
};

export default Button;
