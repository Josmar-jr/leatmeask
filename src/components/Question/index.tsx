import { ReactNode } from 'react';
import { Container, Footer } from './styles';

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
  isAnswered?: boolean;
  isHighlighted?: boolean;
};

export function Question({
  content,
  author,
  children,
  isAnswered = false,
  isHighlighted = false,
}: QuestionProps) {
  return (
    <Container isAnswered={isAnswered && isAnswered} isHighlighted={isAnswered}>
      <p> {content}</p>
      <Footer>
        <div>
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>{children}</div>
      </Footer>
    </Container>
  );
}
