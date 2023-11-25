import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import PrivateRoute from "./components/PrivateRoute.jsx";
import DashboardScreen from './screens/DashboardScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import UserBookScreen from './screens/UserBookScreen.jsx';
import BookMatesScreen from './screens/BookMatesScreen.jsx';
import BookMateScreen from "./screens/BookMateScreen.jsx"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='' element={<PrivateRoute />}> 
        <Route path="/dashboard" element={<DashboardScreen />}/>
        <Route path="/profile" element={<ProfileScreen />}/>
        <Route path="/books/:id" element={<UserBookScreen />}/>
        <Route path="/bookmates" element={<BookMatesScreen />}/>
        <Route path="/bookmates/:id" element={<BookMateScreen />}/>
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);