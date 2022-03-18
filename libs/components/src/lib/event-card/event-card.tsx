import { Box, Card, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import { Event } from '@ff/interfaces';
import styles from './event-card.module.scss';

export interface EventCardProps {
  event: Event;
  image: string;
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat(navigator.language, {year:"numeric", month:"short",day:"2-digit"}).format(date).split(" ").join(" ");    
}

export function EventCard({event, image}: EventCardProps) {
  return (
    <Card sx={{ display: 'flex' }}>
      <Box sx={{display: 'flex', flexDirection: 'column', position: 'relative'}}>
          {event.isVirtual && <Typography gutterBottom className={styles['virtual']} component="div" variant="body1">
            Virtual
          </Typography>}
        {image && <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={image}
          alt=""
        />}
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {event.title}
          </Typography>
          <Typography component="div" variant="h5">
            {formatDate(new Date(event.date))}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {event.address}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
