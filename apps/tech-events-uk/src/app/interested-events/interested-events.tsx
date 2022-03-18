import { CircularProgress, Box , Grid, Typography } from '@mui/material';
import events from 'events';
import { EventCard } from 'libs/components/src';
import { RootState } from '../redux/store';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './interested-events.module.scss';
import { fetchEvents, selectAllEvents } from '../redux/events/events.slice';

/* eslint-disable-next-line */
export interface InterestedEventsProps {}

const dummyImages: string[] = ['image-1.jpg', 'image-2.jpg', 'image-3.jpg'];
const dummyVirtualEventImages: string[] = ['virtual-image-1.png', 'virtual-image-2.png', 'virtual-image-3.jpg'];

export function InterestedEvents(props: InterestedEventsProps) {
  const { entities: eventsMap, loadingStatus: eventLoadingStatus, error: eventError, selectedCategory, isVirtual } = useSelector((state: RootState) => state.events)
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchEvents());
  }, [isVirtual, selectedCategory]);

  const events = useSelector(selectAllEvents);
  const isNotLoaded = eventLoadingStatus !== 'loaded';
  const hasError = !!eventError;
  const hasNoEvents = events.length === 0;
  return (
    <Grid container spacing={2}>
      
      {(isNotLoaded || hasError || hasNoEvents) && <Box sx={{flexGrow: 1, p: 10}}>
        
        {isNotLoaded && !hasError && <CircularProgress color="inherit" size={20} />}
        
        {!isNotLoaded && hasNoEvents && <Grid item xs={12}>
          <Typography component="div" variant="h5">
            Sorry!! No Events Found that match your interest!!!
          </Typography>  
        </Grid>}
      </Box>}
      
      {events.map((event, index) => <Grid key={event._id} item xs={12} sm={6}>
        <EventCard 
          event={event}
          image={event.isVirtual ? `/assets/${dummyVirtualEventImages[index % dummyVirtualEventImages.length]}` : `/assets/${dummyImages[index % dummyImages.length]}`}
        />
      </Grid>)}
    </Grid>
  );
}