import { AppBar, Box, Icon,  Toolbar } from "@mui/material";

const TopMenu = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className="headerColor">
        <Toolbar>
          <Icon sx={{width: '210px'}}>
            <img alt="SportRadar logo" src="./sportRadar.svg" onClick={() => window.location.href = "https://sportradar.com/"} className="redirect-logo"/>
          </Icon>
        </Toolbar>
      </AppBar>
    </Box>
  );
} 

export default TopMenu;