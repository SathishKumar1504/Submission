import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersAdmin, createUserAdmin, deleteUserAdmin } from '../../redux/adminSlice';

export default function UsersPage(){
  const dispatch = useDispatch();
  const { users } = useSelector(s => s.admin || { users: [] });
  const [form, setForm] = useState({ username:'', email:'', password:'User@123', userType:'User' });

  useEffect(()=>{ dispatch(fetchUsersAdmin()); }, [dispatch]);

  const add = async ()=>{ await dispatch(createUserAdmin(form)); setForm({ username:'', email:'', password:'User@123', userType:'User' }); dispatch(fetchUsersAdmin()); };
  const remove = async id => { if(!confirm('Delete user?')) return; await dispatch(deleteUserAdmin(id)); dispatch(fetchUsersAdmin()); };

  return (
    <div className="container">
      <h2>Users (Admin)</h2>
      <div className="card">
        <input placeholder="username" value={form.username} onChange={e=>setForm({...form, username:e.target.value})}/>
        <input placeholder="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})}/>
        <select value={form.userType} onChange={e=>setForm({...form, userType: e.target.value})}><option>User</option><option>Manager</option><option>Admin</option></select>
        <button className="primary-btn" onClick={add}>Create</button>
      </div>
      <table><thead><tr><th>Name</th><th>Email</th><th>Role</th><th></th></tr></thead>
        <tbody>
          {users.map(u=> <tr key={u.userId}><td>{u.username}</td><td>{u.email}</td><td>{u.userType}</td><td><button className="secondary-btn" onClick={()=>remove(u.userId)}>Delete</button></td></tr>)}
        </tbody></table>
    </div>
  );
}
