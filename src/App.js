import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Header from './components/Header';
import SensorPage from './pages/SensorPage'; // Import SensorPage

function App() {
  const [cookies] = useCookies(['authToken']);

  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Header />
          <PrivateRoute
            component={HomePage}
            path="/"
            exact
            isAuthenticated={cookies.authToken}
          />
          <Route
            render={() =>
              cookies.authToken ? (
                <Redirect to="/" />
              ) : (
                <Route component={LoginPage} path="/login" />
              )
            }
          />
          <Route
            render={() =>
              cookies.authToken ? (
                <Redirect to="/" />
              ) : (
                <Route component={RegisterPage} path="/register" />
              )
            }
          />
          <Route
            path="/sensor/:id" // Define route for SensorPage with parameter
            component={SensorPage}
          />
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
