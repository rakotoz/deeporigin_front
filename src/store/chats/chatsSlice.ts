import { createSlice } from '@reduxjs/toolkit';

export interface ChatsState {
  chatsList: any[];
  activeChat: string | null;
  isLoading: boolean;
}

const initialState: ChatsState = {
  chatsList: [],
  activeChat: null,
  isLoading: false,
};

export const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setChatsAction: (state, action) => {
      if (action.payload !== null) {
        state.chatsList = action.payload;
        state.activeChat = action.payload[0] ? action.payload[0]._id : null;
      }
    },
    addNewChatAction: (state, action) => {
      state.chatsList.push(action.payload);
      state.activeChat = action.payload[0] ? action.payload[0]._id : null;
    },
    setActiveChatAction: (state, action) => {
      state.activeChat = action.payload;
    },
    addMessageAction: (state, action) => {
      const chat = state.chatsList.find(
        (chat) => chat._id === state.activeChat
      );
      if (chat !== undefined) {
        chat.messages.push({
          message: action.payload.message,
          timestamp: new Date(),
          direction: action.payload.direction,
        });
      } else {
        state.chatsList = [
          {
            _id: '1',
            messages: [
              {
                message: action.payload.message,
                timestamp: new Date(),
                direction: action.payload.direction,
              },
            ],
          },
        ];
      }
    },
    setIsLoadingAction: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setChatsAction,
  setActiveChatAction,
  addMessageAction,
  setIsLoadingAction,
  addNewChatAction,
} = chatsSlice.actions;

export default chatsSlice.reducer;
