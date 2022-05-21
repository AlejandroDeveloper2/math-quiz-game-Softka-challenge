// eslint-disable-next-line
import { firebaseApp } from "./config/firebase";

import MainScreen from "./components/mainScreen/MainScreen";
import Footer from "./components/shared/footer/Footer";

import "./components/mainScreen/MainScreen.css";

function App() {
  return (
    <main className="main-container">
      <MainScreen />
      <Footer />
    </main>
  );
}

export default App;
