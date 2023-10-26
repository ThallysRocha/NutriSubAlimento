import { BrowserRouter } from 'react-router-dom';
import AppRoutes from '../routes/index';
import AppProvider from "../contexts/index.jsx";
function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
