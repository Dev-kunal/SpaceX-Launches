import { Route, Routes } from "react-router";
import Homepage from "./components/Homepage/Homepage";
import { LaunchList } from "./components/LaunchList/LaunchList";
import { RocketDetails } from "./components/RocketDetails/RocketDetails";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
      <div className="container">
        <Routes>
          <Route path="/launchlist" element={<LaunchList />} />
          <Route path="/:rocketId" element={<RocketDetails />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
