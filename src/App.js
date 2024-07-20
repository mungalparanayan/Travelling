import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Index from './components/Index';
import About from './components/About';
import Contact from './components/Contact';
import World from './components/World';
import Ticket from './components/Ticket';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import History from './components/History';
import Rating from './components/Rating';
import FormState from './context/Formstate';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <FormState>
      <ToastContainer />
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route exact path="/" element={ <Index /> }> </Route>
            <Route exact path="/about" element={ <About /> }> </Route>
            <Route exact path="/contact" element={ <Contact /> }> </Route>
            <Route exact path="/world" element={ <World /> }> </Route>
            <Route exact path="/login" element={ <Login /> }> </Route>
            <Route exact path="/signup" element={ <Signup /> }> </Route>
            <Route exact path="/history" element={ <History /> }> </Route>
            <Route exact path="/rating" element={ <Rating /> }> </Route>
            <Route exact path="/history/ticket" element={ <Ticket /> }> </Route>
          </Routes>
        </div>
        <Footer />
      </Router>
    </FormState>
    </>
  );
}

export default App;
