import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Routing } from './components/routing';
import { MyNav } from './components/mynav';
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#007bff", 
    },
    secondary: {
      main: "#f50057",
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <BrowserRouter>
          <MyNav />
          <Routing />
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
