
import './App.css';
import MatchService from '../backend/match.service';

function App() {
  return (
    <div className="App">
      {MatchService()}
    </div>
  );
}

export default App;
