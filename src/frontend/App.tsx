
import { GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';
import { addGoal, endMatch, getMatches, startMatch } from '../backend/match.service';
import './App.css';
import MatchTable from './components/MatchTable';
import TopMenu from './components/TopMenu';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';

function App() {
  const getLiveMatches = () => {
    return allMatches.filter(x=> !x.hasBeenPlayed);
  }
  const getFinishedMatches = () => {
    return allMatches.filter(x=> x.hasBeenPlayed && !x.isLive);
  }

  const [allMatches, setAllMatches]  = useState(getMatches());
  const [liveMatches, setLiveMatches] = useState(getLiveMatches());
  const [finishedMatches, setFinishedMatches] = useState(getFinishedMatches());
  const liveMatchesColumns: GridColDef[] = [
    {
      field: 'isLive',
      headerName: 'Status',
      width: 200,
      valueGetter: (params: GridValueGetterParams) => params.row.isLive ? 'Live' : '19:00' // random hour
    },
    {
      field: 'scores',
      headerName: 'Scores',
      width: 200,
      valueGetter: (params: GridValueGetterParams) => 
        `${params.row.homeTeam} ${params.row.homeScore} - ${params.row.visitorTeam} ${params.row.visitorScore}`
    },
    {
      field: 'admin',
      headerName: 'Admin (demo only)',
      width: 500,
      renderCell: (params: GridRenderCellParams) => {
        const buttons = [
        <Button onClick={() => addGoalHome(params.row.id)}>
         Add Home Goal
        </Button>,
        <Button onClick={() => addGoalVisitor(params.row.id)}>
         Add Visitor Goal
        </Button>
        ];
        if(!params.row.isLive && !params.row.hasBeenPlayed){
          buttons.push(
            <Button onClick={() => start(params.row.id)}>
              Start Match
            </Button>,)
        } else {
          buttons.push(
            <Button onClick={() => end(params.row.id)}>
              End Match
            </Button>,)
        }
        return buttons;
      }
    },
  ];
  const finishedMatchesColumns: GridColDef[] = [
    {
      field: 'isLive',
      headerName: 'Status',
      width: 200,
      valueGetter: () => 'End'
    },
    {
      field: 'scores',
      headerName: 'Scores',
      width: 200,
      valueGetter: (params: GridValueGetterParams) => 
        `${params.row.homeTeam} ${params.row.homeScore} - ${params.row.visitorTeam} ${params.row.visitorScore}`
    },
  ];
  const start = (id: number) => {
    startMatch(id);
    getUpdatedMatches();
  }
  const end = (id: number) => {
    endMatch(id);
    getUpdatedMatches();
  }
  const addGoalHome = (id: number) => {
    addGoal(id, true);
    getUpdatedMatches();
  }
  const addGoalVisitor = (id: number) => {
    addGoal(id, false);
    getUpdatedMatches();
  }
  const getUpdatedMatches = () =>  setAllMatches([...getMatches()]);
  
  useEffect(() => {
    setLiveMatches(getLiveMatches());
    setFinishedMatches(getFinishedMatches())
  }, [allMatches]);

 
  return (
    <div className="App">
      <TopMenu/>
      <div style={{marginTop: '50px'}}>
        
        <MatchTable columns={liveMatchesColumns} rows={liveMatches.map((el, id) => ({id, ...el}))}/>
      </div>
      <div style={{marginTop: '20px'}}>
        <MatchTable columns={finishedMatchesColumns} rows={finishedMatches.map((el, id) => ({id, ...el}))}/>
      </div>
    </div>
  );
}

export default App;
 