import { Box, AppBar, Toolbar, Typography } from '@mui/material';
import styles from './nav.module.scss';

/* eslint-disable-next-line */
export interface NavProps {}

export function Nav(props: NavProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Tech Events UK
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Nav;
