import React from "react";
import Slider from "@mui/material/Slider";

const FontSizeSlider = ({ value, onChange }) => {
  return (
    <div>
      <Slider
        style={{ margin: 0 }}
        value={value}
        min={10}
        max={40}
        onChange={(e, newValue) => onChange(newValue)}
        valueLabelDisplay="auto"
        aria-label="Temperature"
        defaultValue={22}
        step={2}
        marks
      />
    </div>
  );
};

export default FontSizeSlider;
