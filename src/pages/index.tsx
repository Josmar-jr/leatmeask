import { Button } from 'components/Button';
import Router from 'next/router';

import {
  Container,
  AsideIllustration,
  MainForm,
  Separator,
} from 'styles/templates/Home';
import { useAuth } from 'hooks/useAuth';
import { FormEvent, useState } from 'react';
import { database } from 'services/firebase';

export default function Home() {
  const [roomCode, setRoomCode] = useState('');

  const { signInWithGithub, user } = useAuth();

  async function handleCreateRoom() {
    if (!user) {
      signInWithGithub();
    }

    Router.push('/rooms/new');
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') return;

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    console.log(roomRef.val());

    if (!roomRef.exists()) {
      alert('sala não existe');
      return;
    }

    if (roomRef.val().endedAt) {
      alert('sala já encerrada');
      return;
    }

    Router.push(`rooms/${roomCode}`);

    setRoomCode('');
  }

  return (
    <Container>
      <AsideIllustration>
        <img src="/Illustration.svg" alt="ilustração da página inicial" />
        <h1>Toda pergunta tem uma resposta.</h1>
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
      </AsideIllustration>
      <MainForm>
        <div>
          <img src="/Logo.svg" alt="logo letmeask" />
          <button onClick={handleCreateRoom}>
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 3C8.373 3 3 8.373 3 15C3 20.623 6.872 25.328 12.092 26.63C12.036 26.468 12 26.28 12 26.047V23.996C11.513 23.996 10.697 23.996 10.492 23.996C9.671 23.996 8.941 23.643 8.587 22.987C8.194 22.258 8.126 21.143 7.152 20.461C6.863 20.234 7.083 19.975 7.416 20.01C8.031 20.184 8.541 20.606 9.021 21.232C9.499 21.859 9.724 22.001 10.617 22.001C11.05 22.001 11.698 21.976 12.308 21.88C12.636 21.047 13.203 20.28 13.896 19.918C9.9 19.507 7.993 17.519 7.993 14.82C7.993 13.658 8.488 12.534 9.329 11.587C9.053 10.647 8.706 8.73 9.435 8C11.233 8 12.32 9.166 12.581 9.481C13.477 9.174 14.461 9 15.495 9C16.531 9 17.519 9.174 18.417 9.483C18.675 9.17 19.763 8 21.565 8C22.297 8.731 21.946 10.656 21.667 11.594C22.503 12.539 22.995 13.66 22.995 14.82C22.995 17.517 21.091 19.504 17.101 19.917C18.199 20.49 19 22.1 19 23.313V26.047C19 26.151 18.977 26.226 18.965 26.315C23.641 24.676 27 20.236 27 15C27 8.373 21.627 3 15 3Z"
                fill="#F8F8F8"
              />
            </svg>
            Crie sua sala com o Google
          </button>
          <Separator>ou entre em uma sala</Separator>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={({ target }) => setRoomCode(target.value)}
              value={roomCode}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </MainForm>
    </Container>
  );
}
