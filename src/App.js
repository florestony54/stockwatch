import './App.css';

import SearchForm from './components/SearchForm';
import Navbar from './components/Navbar';
import LoginModal from './components/LoginModal';

function App() {
  return (
    <div className="App">
        <Navbar />
        <SearchForm />
        <LoginModal />
    </div>
  );
}

export default App;
