import React, { useState } from 'react';
import { Button, Divider, Input } from 'antd';
import { sendMessageRequest } from '../../api';
import { ChatMessages } from '../chatMessages/ChatMessages';
import { useDispatch, useSelector } from 'react-redux';
import {
  addMessageAction,
  setIsLoadingAction,
} from '../../store/chats/chatsSlice';

export const ChatComponent = () => {
  const dispatch = useDispatch();
  const activeChatId = useSelector((state: any) => state.chats.activeChat);
  const [message, setMessage] = useState('');

  const saveMessage = async (newMessage: string) => {
    dispatch(setIsLoadingAction(true));
    dispatch(addMessageAction({ message: newMessage, direction: 'fromUser' }));
    const result = await sendMessageRequest({
      message: newMessage,
      activeChatId: activeChatId,
    });
    dispatch(
      addMessageAction({ message: result.message, direction: 'toUser' })
    );
    dispatch(setIsLoadingAction(false));
  };

  const keyPressHandler = (e: any) => {
    if (e.key === 'Enter') {
      saveMessage(e.target.value);
    }
  };

  const onSendClick = () => {
    saveMessage(message);
  };

  return (
    <div style={{ height: '100%' }}>
      <div style={{ height: 'calc(100% - 32px - 48px' }}>
        <ChatMessages />
      </div>
      <Divider />
      <div style={{ display: 'flex' }}>
        <Input
          placeholder="Basic usage"
          onKeyPress={keyPressHandler}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          type="primary"
          style={{ marginLeft: '10px' }}
          onClick={onSendClick}
        >
          Send
        </Button>
      </div>
    </div>
  );
};
