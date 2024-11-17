import React, { useEffect } from 'react';
import { Button, Layout, Typography } from 'antd';
import { ChatComponent } from '../chat/Chat';
import { checkTokenRequest, getChatsRequest, newChatRequest } from '../../api';
import { useDispatch } from 'react-redux';
import {
  addNewChatAction,
  setActiveChatAction,
  setChatsAction,
} from '../../store/chats/chatsSlice';
import { ChatsListComponent } from '../chatsList/ChatsList';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;
const { Header, Footer, Sider, Content } = Layout;

export const MainComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loadChats = async () => {
    const chats = await getChatsRequest();
    dispatch(setChatsAction(chats));
  };

  const checkToken = async () => {
    const result = await checkTokenRequest();
    if (!result) {
      navigate('/login');
    }
  };

  useEffect(() => {
    loadChats();
  }, []);

  useEffect(() => {
    checkToken();
  }, []);

  const onStartNewChatClick = async () => {
    const newChat = await newChatRequest();
    dispatch(setActiveChatAction(newChat._id));
    dispatch(addNewChatAction(newChat));
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <Title style={{ color: 'white' }} level={1}>
            @DeepOrigin
          </Title>
        </div>
        <Button type="primary" onClick={onStartNewChatClick}>
          Start new chat
        </Button>
      </Header>
      <Layout>
        <Sider
          width="25%"
          style={{
            color: '#050505',
            backgroundColor: '#e3e3e3',
          }}
        >
          <ChatsListComponent />
        </Sider>
        <Content
          style={{
            padding: '20px',
            minHeight: 120,
            maxHeight: 'calc(100vh - 64px)',
          }}
        >
          <ChatComponent />
        </Content>
      </Layout>
    </Layout>
  );
};
