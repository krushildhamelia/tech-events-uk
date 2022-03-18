import { Typography, Grid, Autocomplete, Checkbox, TextField, CircularProgress, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEventCategory } from '../redux/event-category/event-category.slice';
import { RootState } from '../redux/store';
import styles from './event-filter.module.scss';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { eventsActions } from '../redux/events/events.slice';

/* eslint-disable-next-line */
export interface EventFilterProps {}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export function EventFilter(props: EventFilterProps) {
  const { ids: categories, loadingStatus: categoryLoadingStatus, error: categoryError } = useSelector((state: RootState) => state.eventCategory)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEventCategory());
  }, [dispatch]);

  const { isVirtual, selectedCategory } = useSelector((state: RootState) => state.events);

  const virtualPreferenceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;

    dispatch(eventsActions.setIsVirtual(value === "null" ? null : (value === "true" ? true : false)));
  }
  
  const categoryPreferenceChange = (event: any, value: string[]) => {
    dispatch(eventsActions.setSelectedCategory(value));
  }


  return (
    <>
      <Typography className={styles['interest']} variant="h6" component="div">
        Interests:
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            multiple
            id="events-category"
            options={categories as string[]}
            defaultValue={[]}
            value={selectedCategory}
            onChange={categoryPreferenceChange}
            disableCloseOnSelect
            getOptionLabel={(category: string) => category}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option}
              </li>
            )}
            renderInput={(params) => (
              <TextField {...params} label="Category" placeholder="Category" InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {categoryLoadingStatus !== 'loaded' ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl>
            <FormLabel id="virtual-conference">Conference Preference</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="All"
              name="radio-buttons-group"
              value={isVirtual}
              onChange={virtualPreferenceChange}
            >
              <FormControlLabel value="true" control={<Radio />} label="Virtual" />
              <FormControlLabel value="false" control={<Radio />} label="Face-to-Face" />
              <FormControlLabel value="null" control={<Radio />} label="All" />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
}

export default EventFilter;
