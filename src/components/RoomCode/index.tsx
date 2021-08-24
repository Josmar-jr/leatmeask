import { Container } from './styles';

type RoomCodeProps = {
  code: string;
};

export function RoomCode({ code }: RoomCodeProps) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(code);
  }
  return (
    <Container onClick={copyRoomCodeToClipboard}>
      <div>
        <img src="/copy.svg" alt="copy code" />
      </div>
      <span>Sala #{code}</span>
    </Container>
  );
}
