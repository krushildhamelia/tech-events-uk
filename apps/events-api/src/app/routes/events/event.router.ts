import {Router} from 'express';
import { EventModel } from '../../orm/events/event.model';
import { APIResponse } from '@ff/interfaces';

const router: Router = Router();

router.get('/all-events', async (req, res) => {
  const result = await EventModel.find();
  
  res.json(new APIResponse<Event[]>({
    data: result,
    status: 'success'
  }));
})

export const EventRouter: Router = router;