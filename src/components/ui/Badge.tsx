import type { FC, ReactNode, CSSProperties } from 'react';
import { tokens } from '../../tokens';

export type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'action';

export interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  style?: CSSProperties;
}

export const Badge: FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'sm',
  style,
}) => {
  const variantStyles: Record<BadgeVariant, CSSProperties> = {
    success: {
      background: tokens.colors.success.light,
      color: tokens.colors.success.dark,
    },
    warning: {
      background: tokens.colors.action.light,
      color: tokens.colors.action.dark,
    },
    danger: {
      background: tokens.colors.action.light,
      color: tokens.colors.action.dark,
    },
    action: {
      background: tokens.colors.action.light,
      color: tokens.colors.action.dark,
    },
    info: {
      background: tokens.colors.neutral.light,
      color: tokens.colors.neutral.dark,
    },
    neutral: {
      background: tokens.colors.cream[300],
      color: tokens.colors.text.secondary,
    },
  };

  const sizeStyles: Record<string, CSSProperties> = {
    sm: { padding: '3px 8px', fontSize: '10px' },
    md: { padding: '4px 10px', fontSize: '11px' },
  };

  const baseStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    borderRadius: tokens.radius.full,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.02em',
    whiteSpace: 'nowrap',
    ...sizeStyles[size],
    ...variantStyles[variant],
    ...style,
  };

  return <span style={baseStyle}>{children}</span>;
};

export default Badge;
