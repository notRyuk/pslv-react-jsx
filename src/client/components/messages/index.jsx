import React from 'react';
import './styles.scss'

const ChatComponent = ({ connectedUsers, user }) => {
  return (
    <main className="mainChatContainer">
      <div className="leftChatContent card">
        <div className="chatList">
          <div className="chatListHeader">
            <h5>Messaging</h5>
            <i className="fa-regular fa-pen-to-square"></i>
          </div>
          <div className="searchChat">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="search messages" />
          </div>
          <div className="friendList">
            {connectedUsers.map((reqUser) => (
              <div key={reqUser.userId} className="chatPerson">
                <img
                  src={reqUser.imageUrl}
                  alt="personImg"
                  style={{ width: '70px', height: '70px' }}
                  className="profileImg"
                />
                <strong>{`${reqUser.firstname} ${reqUser.lastname}`}</strong>
                <small></small>
                <small></small>
              </div>
            ))}
          </div>
        </div>
        <div id="chat-window">
          <div id="chat-header">
            <img
              src={user.imageUrl}
              alt="profileImg"
              className="profileImg"
            />
            <h2>{`${user.firstname} ${user.lastname}`}</h2>
          </div>
          <div id="chat-body">
          <div className="message received">
            <p>Hello! How are you doing?</p>
            <span className="timestamp">10:30 AM</span>
          </div>
          <div className="message sent">
            <p>Hi, I'm doing well. Thanks for asking!</p>
            <span className="timestamp">10:32 AM</span>
          </div>
          <div className="message received">
            <p>That's great to hear!</p>
            <span className="timestamp">10:34 AM</span>
          </div>
        </div>
          <div id="chat-footer">
            <input id="input" type="text" placeholder="Type your message..." />
            <button id="send-btn">
              <i className="fa-sharp fa-solid fa-paper-plane"></i> Send
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ChatComponent;
