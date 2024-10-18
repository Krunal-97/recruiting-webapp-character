import "./App.css";
import CharacterComponent from "./components/CharacterComponent";
import { GlobalContextProvider } from "./context/GlobalContext";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise-Krunal Parmar</h1>
      </header>
      <section className="App-section">
        <GlobalContextProvider>
          <CharacterComponent />
        </GlobalContextProvider>
      </section>
    </div>
  );
}

export default App;
