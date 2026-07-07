import './Badge.css';

interface BadgeProps {
  label: string;
  variant?: 'primary' | 'danger' | 'neutral' | 'success';
  size?: 'sm' | 'md';
};

export const Badge = ({
  label,
  variant = 'primary',
  size = 'md',
}: BadgeProps) => {
  return (
    <span className={`badge badge--${variant} badge--${size}`}>
      {label}
    </span>
  );
};