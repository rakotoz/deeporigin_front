import { MessageList } from 'react-chat-elements';
import { useSelector } from 'react-redux';
import React, { useRef } from 'react';
import { Spin } from 'antd';

export const ChatMessages = () => {
  const isLoading = useSelector((state: any) => state.chats.isLoading);
  const activeChat = useSelector((state: any) => {
    const result = state.chats.chatsList.find(
      (chat: any) => {
        console.log(chat)
        return chat._id == state.chats.activeChat
      }
    );
    console.log(result);
    return result;
  });
  const ref = useRef();

  if (!activeChat) {
    return null;
  }

  let chatData = [];

  if (activeChat.messages.length !== 0) {
    chatData = activeChat.messages.map((message: any) => {
      return {
        position: message.direction === 'fromUser' ? 'right' : 'left',
        type: 'text',
        text: message.message,
        date: message.timestamp,
      };
    });
  }
  return (
    <div style={{ overflowY: 'scroll', height: '100%' }}>
      <MessageList
        referance={ref}
        dataSource={chatData}
        lockable={true}
        toBottomHeight={'100%'}
      />
      {isLoading && (
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <Spin tip="Loading" size="large" />
        </div>
      )}
    </div>
  );
};
