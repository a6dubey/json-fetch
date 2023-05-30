import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import UsersPage from './pages/UsersPage';
import PostsPage from './pages/PostsPage';
import CommentsPage from './pages/CommentsPage';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <h1 className="container">JSON API Fetch</h1>
        <nav>
          <ul>
            <li>
              <NavLink to="/" activeClassName="active">Users</NavLink>
            </li>
            <li>
              <NavLink to="/posts" activeClassName="active">Posts</NavLink>
            </li>
            <li>
              <NavLink to="/comments" activeClassName="active">Comments</NavLink>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<UsersPage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/comments" element={<CommentsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
