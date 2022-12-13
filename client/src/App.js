import { Route, Routes } from "react-router-dom";
import "./App.css";
import DemoPage from "./components/DemoPage/DemoPage";
import Header from "./components/Header/Header";
import PayRoyalties from "./components/PayRoyalties/PayRoyalties";
import '@tokium.co/tokiumwrapper/dist/styles.css'

function App() {
  

  return (
    <div className="blackBackground App">
      <Header/>
      <br></br>
      <div className="headerMargin">
        <Routes>
          <Route path='/demo'element={<DemoPage />}></Route>
          <Route path="/" element={<PayRoyalties />}></Route>
        </Routes>
      </div>
      
        
      </div>
  );
}

export default App;
