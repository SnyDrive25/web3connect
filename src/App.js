import Home from "./pages/home/Home"
import Chain_info from "./pages/chain_info/Chain_info"
import Bayc from "./pages/bayc/Bayc"
import Meebits from "./pages/meebits/Meebits"
import Meebits_claimer from "./pages/meebits_claimer/Meebits_claimer"
import Nefturians from "./pages/nefturians/Nefturians"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/chain_info" element={<Chain_info />}></Route>
        <Route path="/bayc" element={<Bayc />}></Route>
        <Route path="/nefturians" element={<Nefturians />}></Route>
        <Route path="/meebits" element={<Meebits />}></Route>
        <Route path="/meebits_claimer" element={<Meebits_claimer />}></Route>
      </Routes>
    </Router>
  );
}

export default App;