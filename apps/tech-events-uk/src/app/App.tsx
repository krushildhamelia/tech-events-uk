import { Box, ThemeProvider } from '@mui/material';
import { lightTheme } from './theme';
import styles from './App.module.scss';

import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { EventFilter } from './event-filter/event-filter';
import { Nav } from './nav/nav';
import { InterestedEvents } from './interested-events/interested-events';


export function App() {
  const { ids: categories, loadingStatus: categoryLoadingStatus, error: categoryError } = useSelector((state: RootState) => state.eventCategory)


  return (
    <>
      <ThemeProvider theme={lightTheme}>
        <Nav />
        <Box sx={{flexGrow: 1, p: 10}}>
          <EventFilter />
          <InterestedEvents />
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
