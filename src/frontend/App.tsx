
import { getMatches } from '../backend/match.service';
import './App.css';

function App() {
  return (
    <div className="App">
      {getMatches().length}
    </div>
  );
}

export default App;
