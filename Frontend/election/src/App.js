import logo from './logo.svg';
import './App.css';
import NavBar from './Components/Navbar';
import Routing from './Components/Routing';
import { AuthContextProvider } from './contexts/auth';

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <NavBar />
        <Routing />
      </AuthContextProvider>
    </div>
  );
}

export default App;
