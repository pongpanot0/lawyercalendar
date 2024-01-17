import React, { useState } from "react";
import { CompactPicker   } from "react-color";

const ColorPicker = ({ color, onChange }) => {
  return (
    <div>
      <CompactPicker  
        styles={{ width: "50%" }}
        color={color}
        onChange={(newColor) => onChange(newColor.hex)}
      />
    </div>
  );
};

export default ColorPicker;
