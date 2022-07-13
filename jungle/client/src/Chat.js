import React, { useCallback, useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const Chat = ({ nickname, roomName, socket, showRoom }) => {
  //   const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const { transcript } = useSpeechRecognition();

  SpeechRecognition.startListening({
    continuous: true,
    language: "ko-KR",
  });
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    alert("음성 인식을 지원하지 않는 브라우저입니다. Chrome을 이용해주세요.");
  }
  const exitRoom = () => {
    socket.emit("forceDisconnect");
    showRoom();
  };

  useEffect(() => {
    const messageData = {
      room: roomName,
      nickname: nickname,
      message: transcript,
    };
    setMessageList((list) => [...list, messageData]);
  }, []);

  //   useEffect(() => {
  //     socket.on("new_message", (data) => {
  //       console.log(`chat comp , data 씨발 = ${data}`);
  //       setMessageList((list) => [...list, data]);
  //       //   console.log("msgList", messageList);
  //     });
  //   }, [socket]);
  console.log(`transcript ====== > ${transcript}`);
  console.log(`ddd ====== > ${SpeechRecognition.startListening}`);
  console.log(
    `리엑트 음성인식 ㅆㅂ ====== > ${JSON.stringify(SpeechRecognition)}`
  );
  console.log(
    `씨발 음성인식 ====== > ${JSON.stringify(useSpeechRecognition())}`
  );
  console.log(`messageList = ${messageList}`);
  return (
    <>
      <div>
        <button onClick={exitRoom}>나가기</button>
        <h3></h3>
        <h2>기록중</h2>
        {transcript}
        <ul></ul>
      </div>
      <div className='chat-window'>
        <div className='chat-header'>
          <p>Live Chat</p>
        </div>
        <div className='chat-body'>
          <ScrollToBottom className='message-container'>
            {messageList.map((msg, index) => {
              console.log(`mmmmmm ${msg.message}`);
              return (
                <div
                  key={index}
                  className='message'
                  id={nickname === msg.nickname ? "you" : "other"}
                >
                  <div>
                    <div className='message-content'>
                      <p>{msg.messages}</p>
                    </div>
                    <div className='message-meta'>
                      {/* <p id='time'>{msg.time}</p> */}
                      <p id='author'>{msg.nickname}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </ScrollToBottom>
        </div>
        <div className='chat-footer'></div>
      </div>
    </>
  );
};

export default Chat;
