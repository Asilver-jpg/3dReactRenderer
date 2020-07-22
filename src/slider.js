import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';


const useStyles = makeStyles({
  root: {
    width: 200,
  },
});

export default function ContinuousSlider(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(30);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.direction==="x" ? props.setVariable("xRotate", newValue) : props.setVariable("yRotate", newValue)
  };

  return (
    <div className={classes.root}>
      <Typography id="continuous-slider" gutterBottom>
  
      </Typography>
      <Grid container spacing={2}>
        <Grid item>
      
        </Grid>
        <Grid item xs>
          <Slider value={value} onChange={handleChange} aria-labelledby="continuous-slider" 
          min={0} max={360}/>
        </Grid>
        <Grid item>
  
        </Grid>
      </Grid>
     
    </div>
  );
}