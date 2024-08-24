import { Route, Routes } from 'react-router-dom';
import './App.css';
import ChatHome from './components/ChatHome';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import * as Constant from "./util/constant";
// Example usage

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path={`${Constant.ROUTE_HOME}/:receiverId`} element={ <ChatHome />} />
        <Route path={Constant.ROUTE_SIGNUP} element={ <SignUp />} />
        <Route path={Constant.ROUTE_SIGNIN} element={ <SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
