import { Router } from 'express';
import { EventRouter } from './events/event.router';

const router: Router = Router();

router.use('/events', EventRouter);

export const AppRouter: Router = router;