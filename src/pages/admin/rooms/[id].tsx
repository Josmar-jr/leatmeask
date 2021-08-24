import { GetStaticProps, NextPage } from 'next';
import { FormEvent, useState } from 'react';
import Router, { useRouter } from 'next/router';

import toast, { Toaster } from 'react-hot-toast';

import { Button } from 'components/Button';
import { RoomCode } from 'components/RoomCode';

import { Container, Header, Content } from 'styles/templates/Room';
import { useAuth } from 'hooks/useAuth';
import { database } from 'services/firebase';
import { Question } from 'components/Question';
import { useRoom } from 'hooks/useRoom';

const Room: NextPage = () => {
  const { user } = useAuth();

  const { query, route } = useRouter();
  const roomId = query.id;

  const { title, questions } = useRoom(String(roomId));

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    Router.push('/');
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    const questionRef = await database
      .ref(`rooms/${roomId}/questions/${questionId}`)
      .update({
        isAnswered: true,
      });
  }
  async function handleHighlightQuestion(questionId: string) {
    const questionRef = await database
      .ref(`rooms/${roomId}/questions/${questionId}`)
      .update({
        isHighlighted: true,
      });
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
      const questionRef = await database
        .ref(`rooms/${roomId}/questions/${questionId}`)
        .remove();
    }
  }

  return (
    <Container>
      <Toaster position="top-center" reverseOrder={false} />
      <Header>
        <div>
          <img src="/Logo.svg" alt="logo" />
          <div>
            <RoomCode code={`${roomId}`} />
            <Button isOutlined={true} onClick={handleEndRoom}>
              Encerrar sala
            </Button>
          </div>
        </div>
      </Header>

      <Content>
        <div>
          <h1>{title}</h1>
          <span>4 perguntas</span>
        </div>

        {questions.map((question) => (
          <Question
            key={question.id}
            content={question.content}
            author={question.author}
            isAnswered={question.isAnswered}
            isHighlighted={question.isHighlighted}
          >
            <div>
              {!question.isAnswered && (
                <>
                  <button
                    type="button"
                    onClick={() => handleCheckQuestionAsAnswered(question.id)}
                  >
                    <svg
                      className="check"
                      width="26"
                      height="26"
                      viewBox="0 0 26 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="13.0003"
                        cy="13.0002"
                        r="9.00375"
                        stroke="#737380"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9.44287 13.3394L11.6108 15.5073L11.5968 15.4933L16.4878 10.6023"
                        stroke="#737380"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleHighlightQuestion(question.id)}
                  >
                    <svg
                      className="message"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 18.0002H18C19.657 18.0002 21 16.6572 21 15.0002V7.00024C21 5.34324 19.657 4.00024 18 4.00024H6C4.343 4.00024 3 5.34324 3 7.00024V15.0002C3 16.6572 4.343 18.0002 6 18.0002H7.5V21.0002L12 18.0002Z"
                        stroke="#737380"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={() => handleDeleteQuestion(question.id)}
              >
                <img src="/excluir.svg" alt="Remover pergunta" />
              </button>
            </div>
          </Question>
        ))}
      </Content>
    </Container>
  );
};

// export const getStaticProps: GetStaticProps = () => {
//   return {
//     props: {},
//   };
// };

export default Room;
