import {createSlice} from '@reduxjs/toolkit';

//컴포넌트 전체에서 공유하는 전역상태의 변수들 (초기상태)
const initialState = {
  phone: null,
  isLogin: false,
  isMember:0, 
  isUser:0, 
  user_id: null,
  member_id:null,
  auth:null,
  selectedStudent:null,
};

 
const userSlice = createSlice({
  name: 'user',
  initialState,

  //동기액션용 리듀서
  reducers: {
    //모든 상태를 동시에 바꾸는 리듀서
    setUser(state, action) {
      state.phone = action.payload.phone;
      state.isLogin = action.payload.isLogin;
    },

    // phone 바꾸는 리듀서  (주로 데이터 1개일때 편하다)
    setPhone(state, action) {
      state.phone = action.payload;
    },
    setIsLogin(state, action) {
      state.isLogin = action.payload;
    },
    setIsMember(state, action) {
      state.isMember = action.payload;
    },
    setIsUser(state, action) {
      state.isUser = action.payload;
    },
    setUser_id(state, action) {
      state.user_id = action.payload;
    },
    setMember_id(state, action) {
      state.member_id = action.payload;
    },
    setAuth(state, action) {
      state.auth = action.payload;
    },
    setSelectedStudent(state, action) {
      state.selectedStudent = action.payload;
    },

  },

  //비동기액션용 리듀서
  extraReducers: builder => {},
});

export default userSlice;