import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import User from '@/models/User';

interface UserState {
  userData: User;
}

const initialState: UserState = {
  userData: {
    Firstname: '',
    Lastname: '',
    picture_url: '',
    email: ''
  }
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.userData = action.payload;
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state.userData = { ...state.userData, ...action.payload };
    },
    clearUser: (state) => {
      state.userData = initialState.userData;
    }
  }
});

export const { setUser, updateUser, clearUser } = userSlice.actions;
export default userSlice.reducer;