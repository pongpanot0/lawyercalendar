import React from "react";
import {
  Button,
  Card,
  Fab,
  Grid,
  Paper,
  Typography,
  TextField,
  Container,
  CardContent,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import ApartmentIcon from "@mui/icons-material/Apartment";
import CardActions from "@mui/material/CardActions";
import "./CustomerCard.css";
import FlipCard from "./FlipCard";
const Item = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
}));

const CustomerCard = ({ customer }) => {
  console.log(customer);
  return (
    <Container maxWidth="xl">
      <Grid item container>
        {customer.map((button, index) => (
          <Grid key={index} xs={3} md={3} xl={3}>
            <Item>
              <FlipCard
                frontContent={
                  <Typography variant="h5">{button.ClientName}</Typography>
                }
                frontDetail={
                  <Typography variant="body5">
                    {button.customertypes_name}
                  </Typography>
                }
                backContent={
                  <Typography variant="h5">{button.ClientName}</Typography>
                }
                TotalValue={
                  <Typography variant="body5">{button.TotalValue}</Typography>
                }
              />
            </Item>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CustomerCard;
