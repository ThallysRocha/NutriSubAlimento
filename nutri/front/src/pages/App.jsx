import { BrowserRouter } from 'react-router-dom';
import AppRoutes from '../routes/index';
import AppProvider from "../contexts/index.jsx";
import Footer from '../components/Footer/index.jsx';
import Header from '../components/Header/index.jsx';
function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Header />
        <AppRoutes />
        <Footer/>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
