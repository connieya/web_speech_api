import React, { useCallback, useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

const Chat = ({ nickname, newCount, socket }) => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const exitRoom = () => {
    socket.emit("forceDisconnect");
  };

  useEffect(() => {
    socket.on("new_message", (data) => {
      console.log(`chat comp , data 씨발 = ${data}`);
      setMessageList((list) => [...list, data]);
      //   console.log("msgList", messageList);
    });
  }, [socket]);

  return (
    <>
      <div>
        <button onClick={exitRoom}>나가기</button>
        <h3></h3>
        <h2>기록중</h2>
        <ul></ul>
      </div>
      <div className='chat-window'>
        <div className='chat-header'>
          <p>Live Chat</p>
        </div>
        <div className='chat-body'>
          <ScrollToBottom className='message-container'>
            {messageList.map((msg, index) => {
              return (
                <div
                  key={index}
                  className='message'
                  id={nickname === msg.username ? "you" : "other"}
                >
                  <div>
                    <div className='message-content'>
                      <p>{msg.message}</p>
                    </div>
                    <div className='message-meta'>
                      <p id='time'>{msg.time}</p>
                      <p id='author'>{msg.author}</p>
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
