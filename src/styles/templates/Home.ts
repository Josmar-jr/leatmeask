import styled, { css } from 'styled-components';

export const Container = styled.section`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

export const AsideIllustration = styled.aside`
  flex: 7;

  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};

  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 7.5rem 5rem;

  img {
    max-width: 320px;
  }

  h1 {
    font-size: 2.25rem;
    line-height: 42px;
    margin: 1rem 0;
  }

  strong {
    margin-bottom: 0.5rem;
  }
`;

export const MainForm = styled.main`
  flex: 8;

  background-color: ${({ theme }) => theme.colors.background};
  padding: 0 2rem;

  display: flex;
  align-items: center;
  justify-content: center;

  > div {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 340px;
    align-items: stretch;
    text-align: center;

    > button {
      margin-top: 4rem;
      height: 50px;
      border-radius: 0.5rem;
      font-weight: 500;
      background: ${({ theme }) => theme.colors.blueDark};
      color: #fff;

      display: flex;
      justify-content: center;
      align-items: center;

      cursor: pointer;
      border: 0;

      svg {
        margin-right: 0.5rem;
      }

      &:hover {
        filter: brightness(0.9);
      }
    }

    > img {
      align-self: center;
    }

    h2 {
      font-size: 1.5rem;
      margin: 4rem 0 1.5rem;
      font-family: 'Poppins', sans-serif;
    }

    form {
      input {
        height: 50px;
        border-radius: 0.5rem;
        padding: 0 1rem;
        background: #fff;
        border: 1px solid #a8a8b3;
      }

      button {
        margin-top: 1rem;
      }

      button,
      input {
        width: 100%;
      }
    }

    p {
      font-style: 0.875rem;
      color: #737380;
      margin-top: 1rem;

      a {
        color: ${({ theme }) => theme.colors.secondary};
      }
    }
  }
`;

export const Separator = styled.div`
  font-size: 0.875rem;
  color: #a8a8b3;

  margin: 2rem 0;
  display: flex;
  align-items: center;

  &::before {
    content: '';
    flex: 1;
    height: 1px;
    background: #a8a8b3;
    margin-right: 1rem;
  }
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #a8a8b3;
    margin-left: 1rem;
  }
`;
