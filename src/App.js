import { ChakraProvider, Box, Heading, Text, Button } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/main";
import Header from "./components/Header";
import { useState, useRef } from "react";
// import "./App.css";
import BoxCompo from "@components/BoxCompo";
function App() {
  const [account, setAccount] = useState("");

  return (
    <BrowserRouter>
      <ChakraProvider>
        <div className="min-h-screen bg-gray-950 text-white">
          <Header account={account} setAccount={setAccount} />

          <Routes>
            <Route path="/" element={<Main account={account} />} />
          </Routes>
        </div>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
