import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/main";
import Search from "./pages/search";
import Detail from "./pages/detail";
import { useState } from "react";
import "./App.css";
import Myinfo from "./pages/myinfo";

function App() {
  const [account, setAccount] = useState("");

  return (
    <BrowserRouter>
      <ChakraProvider>
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md  md:max-w-2x2">
          {/* <Header account={account} setAccount={setAccount} /> */}

          <Routes>
            <Route path="/" element={<Main account={account} />} />
            <Route path="/search" element={<Search account={account} />} />
            <Route path="/detail" element={<Main account={account} />} />
            <Route path="/myinfo" element={<Myinfo />} />
          </Routes>
        </div>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
