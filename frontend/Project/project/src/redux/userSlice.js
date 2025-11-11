import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  email: '',
  password: '',
  submitted: false,
  successMessage: '',
};


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Dynamically update any input field
    setField: (state, action) => {
      state[action.payload.field] = action.payload.value;
    },

    // Handle form submission
    submitForm: (state) => {
      state.submitted = true;
      state.successMessage = '✅ Form submitted successfully!';
    },

    // Reset entire form
    resetForm: (state) => {
      state.username = '';
      state.email = '';
      state.password = '';
      state.submitted = false;
      state.successMessage = '🧹 Form reset successfully!';
    },
  },
});

export const { setField, submitForm, resetForm } = userSlice.actions;
export default userSlice.reducer;
