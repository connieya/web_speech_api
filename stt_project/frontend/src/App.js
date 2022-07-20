import { useState } from "react";
import "./App.css";
import Chat from "./components/Chat";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

function App() {
  const [showRoom, setShowRoom] = useState(true);
  const [roomName, setRoomName] = useState("");
  const [startTime, setStartTime] = useState("");

  const toggleRoom = () => {
    setShowRoom((prevShowRoom) => !prevShowRoom);
  };
  const joinRoom = (event) => {
    event.preventDefault();
    setStartTime(new Date().getTime());
    socket.emit("enter_room", { roomName, startTime });
    console.log(`join room  , room name = ${roomName}`);
    toggleRoom();
  };

  return (
    <>
      {showRoom ? (
        <div>
          <form onSubmit={joinRoom}>
            <input
              name='roomName'
              placeholder='방 번호'
              required
              type='text'
              onChange={(event) => {
                setRoomName(event.target.value);
              }}
            ></input>
            <button>입장하기</button>
          </form>
        </div>
      ) : (
        <div>
          <Chat toggleRoom={toggleRoom} roomName={roomName} socket={socket} />
        </div>
      )}
    </>
  );
}

export default App;
