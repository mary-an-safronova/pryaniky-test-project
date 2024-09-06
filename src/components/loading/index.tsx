import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export const Loading = () => {
  return (
    <Box sx={{ display: 'flex', height: "100vh", alignItems: "center" }}>
      <CircularProgress />
    </Box>
  );
}