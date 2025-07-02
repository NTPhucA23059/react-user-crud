
import './App.css'
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import { UserList } from './UserList';
import { Home } from './Home';
import { UserDetail } from './UserDetail';
import { NotFound } from './NotFound';
import { AddUser } from './AddUser';
import { EditUser } from './EditUser';

function App() {
  return (
    <div className="App">
      <nav className="nav-list">
        <Link to="/">Home   </Link>
        <Link to="/users">Users</Link>
        <Link to="/users/add">Add User</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<UserDetail />} />
        {/* <Route path="*" element={<Home />} /> */}
        <Route path="/users/add" element={<AddUser />} />
        <Route path="/users/edit/:id" element={<EditUser />} />
      </Routes>
    </div>
  );
}


export default App
