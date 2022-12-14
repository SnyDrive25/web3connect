import Home from "./pages/home/Home"
import ChainInfo from "./pages/chain_info/Chain_info"
import Bayc from "./pages/bayc/Bayc"
import BaycTokenInfo from "./pages/bayc_token_info/Bayc_token_info"
import Meebits from "./pages/meebits/Meebits"
import Nefturians from "./pages/nefturians/Nefturians"
import NefturiansUserInfo from "./pages/nefturians_user_info/Nefturians_user_info"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/chain_info" element={<ChainInfo />}></Route>
        <Route path="/bayc" element={<Bayc />}></Route>
        <Route path="/bayc/:handle" element={<BaycTokenInfo />}></Route>
        <Route path="/nefturians" element={<Nefturians />}></Route>
        <Route path="/nefturians/:handle" element={<NefturiansUserInfo />}></Route>
        <Route path="/meebits" element={<Meebits />}></Route>
      </Routes>
    </Router>
  );
}

export default App;