import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { List, Typography } from 'antd';
import { setActiveChatAction } from '../../store/chats/chatsSlice';

export const ChatsListComponent = () => {
  const dispatch = useDispatch();
  const chatsList = useSelector((state: any) => state.chats.chatsList);

  const onClick = (chatId: string) => {
    dispatch(setActiveChatAction(chatId));
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <List
        header={<div>Chats History</div>}
        bordered
        dataSource={chatsList}
        renderItem={(item: any, index) => (
          <>
            <List.Item
              style={{ cursor: 'pointer' }}
              onClick={() => {
                onClick(item._id);
              }}
            >
              <Typography.Text>{item.messages[0] ? item.messages[0].message : 'New Chat'}</Typography.Text>
            </List.Item>
          </>
        )}
      />
    </div>
  );
};
