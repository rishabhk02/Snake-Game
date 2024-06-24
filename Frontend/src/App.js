import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from './Components/Login';
import SignupForm from './Components/Register';
import Game from './Components/Game';
import Leaderboard from './Components/LeaderBoard';

function App() {
  const user = JSON.parse(localStorage.getItem('userInfo'));
  return (
    <BrowserRouter>      
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">Game Portal</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/play-game">Play</Link>
                </li>
              </ul>
              <div className="d-flex">
                {!user && <button className="btn btn-outline-primary me-2" type="button"><a href='/'>Login</a></button>}
                {user && <button className="btn btn-outline-danger" type="button" onClick={() => {
                  localStorage.removeItem('userInfo');
                }}><a href='/'>Logout</a></button>}
              </div>
            </div>
          </div>
        </nav>
        <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<SignupForm />} />
        <Route path='/play-game' element={<Game />} />
        <Route path='/leaderboard' element={<Leaderboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
