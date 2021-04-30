import logo from "./logo.svg";
import "./App.css";
import Main from "./pages";
import configureStore from "./store/storeConfigure";
import { Provider } from "react-redux";
import Header from "./components/header";
import CreateAccount from "./pages/create.jsx";
import EditPhoto from "./pages/edit"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/create">
          <CreateAccount />
        </Route>
        <Route exact path="/edit">
          <EditPhoto />
        </Route>
      </Router>
    </Provider>
  );
}

export default App;
