import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";

import { Routes, Route, Router, BrowserRouter } from "react-router-dom";
import { store } from "./config/store";
import { Provider } from "react-redux";

import Header from "./components/Header/Header";
import ContactsList from "./routes/ContactsList/ContactsList";
import ContactInfo from "./routes/ContactInfo/ContactInfo";
import EditContact from "./routes/EditContact/EditContact";
import RemoveContact from "./routes/RemoveContact/RemoveContact";

function App() {
  return (
    <Provider store={store}>
      <div className="App" style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Header />
        <main>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<ContactsList />} />
              <Route path="/info/:id" element={<ContactInfo />} />
              <Route path="/edit/:id" element={<EditContact />} />
              <Route path="/remove/:id" element={<RemoveContact />} />

              <Route path="*" element={<p>There's nothing here!</p>} />
            </Routes>
          </BrowserRouter>
        </main>
      </div>
    </Provider>
  );
}

export default App;
