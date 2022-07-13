import "./App.css";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Chat from "./Chat";
import { useSpeechRecognition } from "react-speech-recognition";

const socket = io.connect("http://localhost:3001");

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

function App() {
  // SpeechRecognition.startListening({
  //   continuous: true,
  //   language: "ko-KR",
  // });
  const { transcript, setTranscript } = useSpeechRecognition();
  const [hidden, setHidden] = useState(true);
  const [room, setRoom] = useState("");
  const [meetingStart, setMeetingStart] = useState("");
  const [newCount, setNewCount] = useState("");
  const [nickname, setNickname] = useState("");
  const [soundDetectCheck, setSoundDetectCheck] = useState(false);
  const [sockets, setSockest] = useState({
    roomName: "",
    nickname: "",
    talking_begin_time: 0,
    message: "",
    talking_end_time: 0,
  });

  // useEffect(() => {
  //   recognition.onstart = function () {
  //     setSoundDetectCheck(false);
  //   };

  //   recognition.onend = function () {
  //     const date = new Date();
  //     if (transcript !== "") {
  //       setSockest({
  //         message: transcript,
  //         talking_end_time: date.getTime(),
  //         roomName: room,
  //       });

  //       console.log(`씨발 .... ${transcript}`);

  //       if (transcript === "막둥아 기록 중지") {
  //         setSockest({
  //           message: "기록중지@",
  //         });
  //         socket.emit("new_message", sockets, room, () => {});
  //       } else if (transcript === "막둥아 기록 시작") {
  //         setSockest({
  //           message: "기록시작@",
  //         });
  //         socket.emit("new_message", sockets, room, () => {});
  //       } else if (transcript.includes("막둥아 별표")) {
  //         setSockest({
  //           message: "막둥아 별표@",
  //         });
  //         socket.emit("new_message", sockets, room, () => {});
  //       } else if (transcript.includes("막둥아 종료")) {
  //         socket.emit("forceDisconnect");
  //       } else {
  //         socket.emit("new_message", sockets, room, () => {});
  //       }
  //     }

  //     recognition.onresult = function (e) {
  //       if (soundDetectCheck !== true) {
  //         const date = new Date();
  //         setSockest({
  //           message: "",
  //           talking_begin_time: date.getTime(),
  //         });
  //         setSoundDetectCheck(true);
  //       }
  //       let text = Array.from(e.results)
  //         .map((results) => results[0].transcript)
  //         .join("");
  //       // setTranscript(text);
  //       console.log(`음성 인식 기록 시발... ${text}`);
  //     };

  //     recognition.start();
  //   };
  // }, []);

  const showRoom = () => {
    setHidden((prevHidden) => !prevHidden);
  };

  const joinRoom = (event) => {
    event.preventDefault();
    const date = new Date();
    setMeetingStart(date.getTime());
    console.log(`미팅 시작 시간  ${meetingStart}`);
    console.log(`닉네임  ${nickname}`);
    socket.emit("join_room", room, meetingStart);
    showRoom();
  };

  useEffect(() => {
    socket.on("welcome", ({ cntRoom }) => {
      console.log(`클라이언트 welcome 응답 ${cntRoom}`);
      setNewCount(cntRoom);
    });
  }, []);

  return (
    <>
      {hidden ? (
        <div>
          <form onSubmit={joinRoom}>
            <input
              placeholder='방 번호'
              required
              type='text'
              name='room'
              onChange={(event) => {
                setRoom(event.target.value);
              }}
            />

            <input
              placeholder='닉네임'
              required
              type='text'
              name='nickname'
              onChange={(event) => {
                setNickname(event.target.value);
              }}
            />
            <button>입장하기</button>
          </form>
          <h4>방목록:</h4>
          <ul></ul>
        </div>
      ) : (
        <Chat
          nickname={nickname}
          roomName={room}
          socket={socket}
          hidden={hidden}
          showRoom={showRoom}
        />
      )}
    </>
  );
}

export default App;
