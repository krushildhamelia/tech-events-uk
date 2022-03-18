import {Router} from 'express';
import { EventModel } from '../../orm/events/event.model';
import { APIResponse } from '@ff/interfaces';

const router: Router = Router();

router.post('/all-events', async (req, res) => {
  const {selectedCategory, isVirtual}: {selectedCategory: string[], isVirtual: boolean|null} = req.body;

  const result = await EventModel.find().getFilteredEvents(selectedCategory, isVirtual);
  
  res.json(new APIResponse<Event[]>({
    data: result,
    status: 'success'
  }));
})

router.get('/all-category', async (req, res) => {
  const result: string[] = await EventModel.find().getCategories();

  res.json(new APIResponse<string[]>({
    data: result,
    status: 'success'
  }));
});

export const EventRouter: Router = router;