import { NextPage } from 'next';
import Link from 'next/link';

import { Button } from 'components/Button';

import {
  Container,
  AsideIllustration,
  MainForm,
  Separator,
} from 'styles/templates/Home';
import { FormEvent, useState } from 'react';
import { database } from 'services/firebase';
import { useAuth } from 'hooks/useAuth';
import Router from 'next/router';

const NewRoom: NextPage = () => {
  const { user } = useAuth();
  console.log(user);
  const [newRoom, setNewRoom] = useState('');

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === '') return;

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.uid,
    });

    Router.push(`/rooms/${firebaseRoom.key}`);

    setNewRoom('');
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
          <h2>Crie uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={({ target }) => setNewRoom(target.value)}
              value={newRoom}
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente?{' '}
            <Link href="/">
              <a>clique aqui</a>
            </Link>
          </p>
        </div>
      </MainForm>
    </Container>
  );
};

export default NewRoom;
