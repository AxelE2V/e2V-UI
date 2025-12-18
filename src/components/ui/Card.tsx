import type { FC, ReactNode, CSSProperties } from 'react';
import { tokens } from '../../tokens';

export interface CardProps {
  children: ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  onClick?: () => void;
  style?: CSSProperties;
  className?: string;
}

export const Card: FC<CardProps> = ({
  children,
  padding = 'md',
  hoverable = false,
  onClick,
  style,
  className,
}) => {
  const paddingMap: Record<string, string> = {
    none: '0',
    sm: '12px',
    md: '20px',
    lg: '28px',
  };

  const baseStyle: CSSProperties = {
    background: tokens.colors.cream[50],
    borderRadius: tokens.radius.xl,
    border: `1px solid ${tokens.colors.cream[400]}`,
    padding: paddingMap[padding],
    transition: tokens.transitions.fast,
    cursor: hoverable || onClick ? 'pointer' : 'default',
    ...style,
  };

  return (
    <div
      className={className}
      style={baseStyle}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
