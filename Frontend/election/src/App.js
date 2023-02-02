import './App.css';
import NavBar from './components/Navbar';
import Routing from './routing/Routing1';
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
