import styled, { css } from 'styled-components';

type ContainerStyleProps = {
  isAnswered: boolean;
  isHighlighted: boolean;
};

export const Container = styled.div<ContainerStyleProps>`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  padding: 1.2rem;

  margin-top: 4rem;

  ${({ isHighlighted }) =>
    isHighlighted &&
    css`
      background: #f4f0ff;
      border: 1px solid ${({ theme }) => theme.colors.primary};
      footer {
        > div:first-child {
          span {
            color: ${({ theme }) => theme.colors.dark};
          }
        }
        .message {
          path {
            stroke: ${({ theme }) => theme.colors.primary};
          }
        }
        .check {
          path {
            stroke: ${({ theme }) => theme.colors.primary};
          }
        }
      }
    `}

  ${({ isAnswered }) =>
    isAnswered &&
    css`
      background: ${({ theme }) => theme.colors.gray100};
      border: 1px solid ${({ theme }) => theme.colors.gray200};

      footer {
        .check {
          path,
          circle {
            stroke: ${({ theme }) => theme.colors.primary};
          }
        }
      }
    `}

  + div {
    margin-top: 0.5rem;
  }

  p {
    color: ${({ theme }) => theme.colors.dark};
  }
`;
export const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.25rem;

  > div:first-child {
    display: flex;
    align-items: center;

    img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }

    span {
      margin-left: 8px;
      color: #737380;
      font-size: 14px;
    }
  }

  > div:last-child {
    div {
      display: flex;
      align-items: flex-end;
      gap: 0.5rem;
    }
  }

  button {
    background: transparent;
    border: 0;
    cursor: pointer;
    display: flex;
    align-items: flex-end;
    gap: 0.5rem;
    transition: 0.2s ease;

    span {
      color: #737380;
    }
    &.liked {
      span {
        color: ${({ theme }) => theme.colors.primary};
      }
      svg path {
        stroke: ${({ theme }) => theme.colors.primary};
      }
    }
    &:hover {
      filter: brightness(0.7);
    }
  }
`;
