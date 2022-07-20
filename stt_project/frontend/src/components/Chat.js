import React from "react";
import { useCallback, useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { useSpeechRecognition } from "react-speech-recognition";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

const Chat = ({ toggleRoom, roomName, socket }) => {
  const [socketData, setSocketData] = useState({
    room: roomName,
    start_time: "",
    end_time: "",
    google_id: "",
    message: "",
  });
  const [soundCheck, setSoundCheck] = useState(false);
  const [text, setText] = useState("");
  const [textList, setTextList] = useState([]);
  const leaveRoom = () => {
    toggleRoom();
  };

  useEffect(() => {
    console.log(`stt ======== ${text}`);
    recognition.start();

    // 음성인식 시작 로그 찍어야함 => 해야함
    recognition.onstart = function () {
      setSoundCheck(false);
    };

    recognition.onend = function () {
      if (text !== "") {
        setSocketData({
          message: text,
          end_time: new Date().getTime(),
          room: roomName,
        });

        if (text === "막둥아 기록 중지") {
          setSocketData({
            message: "기록중지@",
          });
          socket.emit("new_message", socketData, roomName);
        } else if (text === "막둥아 기록 시작") {
          setSocketData({
            message: "기록시작@",
          });
          socket.emit("new_message", socketData, roomName);
        } else if (text.includes("막둥아 별표")) {
          setSocketData({
            message: "별표*************",
          });
          socket.emit("new_message", socketData, roomName);
        } else if (text.includes("막둥아 종료")) {
          socket.emit("forceDisconnect");
        } else {
          setTextList((list) => [...list], text);
          socket.emit("new_message", socketData, roomName);
        }
        console.log(`Socket datas  =  ${socketData}`);
      }
    };

    recognition.onresult = function (e) {
      if (soundCheck !== true) {
        setSocketData({
          message: "",
          start_time: new Date().getTime(),
        });
        setSoundCheck(true);
      }
      const stt = Array.from(e.results)
        .map((results) => results[0].transcript)
        .join("");
      setText(stt);
    };
  }, []);

  return (
    <div>
      <button onClick={leaveRoom}>회의 종료</button>
      <ScrollToBottom>
        <div>음성 기록</div>
      </ScrollToBottom>
    </div>
  );
};

export default Chat;
