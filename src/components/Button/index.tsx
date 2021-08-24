import { ButtonHTMLAttributes } from 'react';
import { Container } from './styles';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

export function Button({ isOutlined = false, ...props }: ButtonProps) {
  return <Container isOutlined={isOutlined} {...props} />;
}
