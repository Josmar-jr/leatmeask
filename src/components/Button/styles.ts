import styled, { css } from 'styled-components';

type ContainerStyleProps = {
  isOutlined?: boolean;
};

export const Container = styled.button<ContainerStyleProps>`
  height: 50px;
  border-radius: 0.5rem;
  font-weight: 500;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  padding: 0 2rem;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  border: 0;

  img {
    margin-right: 0.5rem;
  }

  ${({ isOutlined }) =>
    isOutlined &&
    css`
      background: #fff;
      border: 1px solid ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.primary};
    `}

  &:not(:disabled):hover {
    filter: brightness(0.9);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
