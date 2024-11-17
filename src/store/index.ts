import { configureStore } from '@reduxjs/toolkit';
import chatsReducer from './chats/chatsSlice';

export default configureStore({
  reducer: {
    chats: chatsReducer,
  },
});
