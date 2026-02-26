import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LegacyApp from './LegacyApp';
import LofiLoom from './components/lofi/LofiLoom';
import Nightstand from './components/nightstand/Nightstand';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LofiLoom />} />
        <Route path="/legacy" element={<LegacyApp />} />
        <Route path="/rest" element={<Nightstand />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
