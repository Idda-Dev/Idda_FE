import { Outlet } from "react-router-dom";
import { AppContainer } from "./components/CommonComponents";

function App() {
  return (
    <div>
      <AppContainer>
        <Outlet />
      </AppContainer>
    </div>
  );
}

export default App;
