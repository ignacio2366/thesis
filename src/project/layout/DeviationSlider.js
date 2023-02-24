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
  positve = 0.00,
  negative
}) {
  const classes = useStyles();
  const numGraduations = 21; // the number of graduation marks you want to display
  const graduationSpacing = 100 / (numGraduations - 1); // the spacing between graduation marks
  const graduationPositions = Array.from(
    { length: numGraduations },
    (_, i) => i * graduationSpacing
  );
  return (
    <>
      <Stack sx={{ height: "500px", justifyContent: "start" }} spacing={5} direction="row" mt={3} mb={5}>
        {/* <img src={ScoreLabel} alt="testing"/> <br/> */}

        <Slider
          min={min}
          max={max}
          step={0.01}
          value={[
            value < baseValue ? value : baseValue,
            value > baseValue ? value : baseValue,
          ]}
          onChange={(e, value) => {
            onChange(value[0] !== baseValue ? value[0] : value[1]);
          }}
          marks={[
            ...graduationPositions.map((position) => {
              const graduationValue = min + (position / 100) * (max - min);
              return {
                value: graduationValue,
                label: `${graduationValue.toFixed(1)}${units}`,
              };
            }),
            {
              value: positve,
              label: `${positve.toFixed(1)}%  <---- Limit`,
              style: { color: "red" },
            },
            {
              value: negative,
              label: `${negative.toFixed(1)}% <---- Limit`,
              style: { color: "red" },
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
          disabled
          style={{ color: "black" }}
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
