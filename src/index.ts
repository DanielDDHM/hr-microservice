import app from './app';
import 'dotenv/config';

app.listen(process.env.PORT, () => {
  console.log(`[HR-MICROSERVICE]: Service started on port ${process.env.PORT}`);
});
