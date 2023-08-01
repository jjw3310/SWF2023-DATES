import { ChakraProvider, Box, Heading, Text, Button } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/main";
import Search from "./pages/search";
import Header from "./components/Header";
import { useState, useRef } from "react";
import "./App.css";
import BoxCompo from "@components/BoxCompo";
function App() {
  const [account, setAccount] = useState("");

  return (
    <BrowserRouter>
      <ChakraProvider>
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2x2">
          {/* <Header account={account} setAccount={setAccount} /> */}

          <Routes>
            <Route path="/" element={<Main account={account} />} />
            <Route path="/search" element={<Search account={account} />} />
            {/* <Route path="/detail" element={<Main account={account} />} />
            <Route path="/myinfo" element={<Main account={account} />} /> */}
          </Routes>
        </div>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
