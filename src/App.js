import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AddBook from "./containers/AddBook";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom/cjs/react-router-dom";
import SearchBooks from "./containers/SearchBooks";
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={AddBook}></Route>
          <Route exact path="/search" component={SearchBooks}></Route>
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
