import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import reportWebVitals from './reportWebVitals';
import Home from './pages/home/Home'
import Search from './pages/search/Search'
import SignUp from './pages/sign-up/SignUp'
import SignIn from './pages/sign-in/SignIn'
import Media from './pages/media/Media'
import EditAccount from './pages/edit-account/EditAccount';
import Friends from './pages/friends/Friends';
import Preference from './pages/preference/Preference';
import PreferenceFriend from './pages/preference/PreferenceFriend';
import ForgotPassword from './pages/forgot-password/ForgotPassword';

document.body.className = 'font-IBM h-screen bg-cover bg-center bg-repeat duration-500 magicpattern'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route index path='/' element={<Home />} />
          <Route exact path='/search' element={<Search />} />
          <Route exact path='/sign-up' element={<SignUp />} />
          <Route exact path='/sign-in' element={<SignIn />} />
          <Route exact path='/edit-account' element={<EditAccount />} />
          <Route exact path='/friends' element={<Friends />} />
          <Route exact path='/preference' element={<Preference />} />
          <Route exact path='/preference-friend/:friend_id' element={<PreferenceFriend />} />
          <Route exact path='/forgot-password' element={<ForgotPassword />} />
          <Route exact path='/Media/:id/:linked_to' element={<Media />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
