import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import authService from 'src/axios/auth.service'
import tokenService from 'src/axios/auth-header'
import userService from 'src/axios/user.service'
import { ISubmitUser, IUser } from 'src/types/user-state'
import { store } from '../store'
import { RootState } from '../types/redux-state'
// import type { RootState } from '../../app/store'

// Define a type for the slice state
interface IAppState {
  user: IUser | null
  token: string | null
  verified: boolean
}

interface ILogin {
    email: string
    password: string
  }

interface IRegister {
    firstName: string
    lastName: string
    email: string
    loginID: string
    password?: string
    contactNumber?: string
    dateOfBirth?: string
  }

// Define the initial state using that type
const initialState: IAppState = {
  user: null,
  token: null,
  verified: false
}

interface IState {
  appState: IAppState 
}

export const userLogin = createAsyncThunk(
    'users/login',
    async ( payload:ILogin , thunkAPI ) => {
      const response = await authService.login(payload.email, payload.password)
      return response
    }
  )

 export const userRegister = createAsyncThunk(
    'users/register',
    async ( payload:IRegister, thunkAPI) => {
      const response = await authService.register(payload.firstName, payload.lastName, payload.email, payload.loginID, payload.password as string, payload.contactNumber as string)
      console.log(response, "response2")
      return response
    }
  )

export const checkCredentials = createAsyncThunk(
    'users/checkCredentials',
    async ( payload: null, thunkAPI) => {
      const state = thunkAPI.getState()
      const { appState } = state as IState
      console.log(appState, "app state")
      if ( appState.token !== null ) {
        const response = await tokenService.checkCredentials()
        return response

      }
    }
  )

export const appSlice = createSlice({
  name: 'users',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    logout: state => {
      authService.logout()
      state.user = null
      state.token = null
      state.verified = false
    },
  //   getCurrentUser: state => {
  //     return state.user
  // },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(userLogin.fulfilled, (state, action) => {
      // Add user to the state array
      console.log(action, "payload")
      state.user = action.payload.user
      state.token = action.payload.token
      state.verified = true
    })
  .addCase(userRegister.fulfilled, (state, action) => {
        // Add user to the state array
        console.log(action, "payload")
        state.user = action.payload.user
        state.token = action.payload.token
        state.verified = true
      })
      .addCase(checkCredentials.fulfilled, (state, action) => {
        console.log(action.payload, "app slice")
        // Add user to the state array
        if ( action.payload === false ) {
          state.user = null
          state.token = null
          state.verified = false
        } 
      })
  },
})

export const { logout } = appSlice.actions

export const getCurrentUser = (state: RootState) => state.appState.user
export const getTokenItem = (state: RootState) => state.appState.token

export default appSlice.reducer