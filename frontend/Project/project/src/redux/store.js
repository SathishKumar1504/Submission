// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';

// existing reducers
import userReducer from './userSlice';
import userCrudReducer from './userCrudSlice';

// banking-related reducers
import accountsReducer from './accountsSlice';
import transactionsReducer from './transactionsSlice';
import banksReducer from './banksSlice';

// ⭐ IMPORTANT: admin reducer (missing earlier)
import adminReducer from './adminSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,             // login/auth user
    userCrud: userCrudReducer,     // admin user CRUD

    accounts: accountsReducer,      // accounts operations
    transactions: transactionsReducer, // user transaction history
    banks: banksReducer,            // bank/branch data NOT admin

    admin: adminReducer,            // ⭐ ADMIN PANEL (users, branches, banks)
  },
});

export default store;
