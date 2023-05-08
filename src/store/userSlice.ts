import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserType } from "../types/user";

const initialState: UserType = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    city: '',
    university: '',
    age: 0
}

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setUser (state, action: PayloadAction<{user: UserType}>) {
            state.id = action.payload.user.id;
            state.firstName = action.payload.user.firstName;
            state.lastName = action.payload.user.lastName;
            state.city = action.payload.user.city;
            state.age = action.payload.user.age;
            state.email = action.payload.user.email;
            state.university = action.payload.user.university;
            state.password = action.payload.user.password;
        }
    }
})

export const {setUser} = userSlice.actions;
export default userSlice.reducer;