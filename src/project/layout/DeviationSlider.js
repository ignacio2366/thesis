import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Stack } from "@mui/material";
export default function DeviationSlider({
  baseValue = 0,
  label,
  units,
  min = -100,
  max = 100,
  value,
  onChange,
}) {
  const classes = useStyles();

  return (
    <>
      <Stack sx={{ height: 200 }} spacing={1} direction="row" mt={5}>
        <Slider
          min={min}
          max={max}
          value={[
            value < baseValue ? value : baseValue,
            value > baseValue ? value : baseValue,
          ]}
          onChange={(e, value) => {
            onChange(value[0] !== baseValue ? value[0] : value[1]);
          }}
          marks={[
            {
              value: baseValue,
              label: baseValue + units,
            },
          ]}
          className={
            value < baseValue ? classes.sliderNegative : classes.sliderPositive
          }
          orientation="vertical"
          disabled
        />
        <Input
          className={classes.input}
          value={(min < 0 && value > 0 ? "+" : "") + value}
          margin="dense"
          onChange={(e) => {
            let val = Number(e.target.value);
            if (Number.isNaN(val)) val = baseValue;
            if (val < min) val = min;
            if (val > max) val = max;
            onChange(val);
          }}
          inputProps={{
            min,
            max,
          }}
          endAdornment={<InputAdornment position="end">{units}</InputAdornment>}
        />
      </Stack>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  input: {
    width: 56,
  },
  sliderNegative: {
    "& .MuiSlider-thumb": {
      color: theme.palette.error.dark,
      "&+.MuiSlider-thumb": {
        display: "none",
      },
    },
    "& .MuiSlider-track": {
      color: theme.palette.error.dark,
    },
  },
  sliderPositive: {
    "& .MuiSlider-thumb": {
      display: "none",
      "&+.MuiSlider-thumb": {
        display: "flex",
        color: theme.palette.success.dark,
      },
    },
    "& .MuiSlider-track": {
      color: theme.palette.success.dark,
    },
  },
}));
