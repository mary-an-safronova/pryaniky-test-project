import CircularProgress from '@mui/material/CircularProgress';
import { Container } from '@mui/material';

export const Loading = () => {
  return (
    <Container sx={{ display: 'flex', height: "100vh", alignItems: "center" }}>
      <CircularProgress />
    </Container>
  );
}