import React from "react";
import { Card, CardContent, Button, Typography } from "@mui/material";
import "./FlipCard.css";
import ApartmentIcon from "@mui/icons-material/Apartment";

const FlipCard = ({ frontContent, frontDetail, backContent, TotalValue }) => {
  return (
    <Card
      sx={{
        borderRadius: "16px", // Adjust the value as needed for the desired roundness
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Optional: Add a shadow for a lifted effect
      }}
      variant="solid"
      className="flip-card"
    >
      <div className="flip-card-inner">
        {/* Front */}
        <div className="flip-card-front">
          <br />
          <ApartmentIcon style={{ fontSize: 60 }} />
          <CardContent>
            {frontContent} <br />
          </CardContent>
        </div>

        {/* Back */}
        <div className="flip-card-back">
          <CardContent>
            {backContent} <br /> ประเภทลูกค้า : {frontDetail} จำนวน Case ทั้งหมด
            : {TotalValue}
          </CardContent>
        </div>
      </div>
    </Card>
  );
};

export default FlipCard;
