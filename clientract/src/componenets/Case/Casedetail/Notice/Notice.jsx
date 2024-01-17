import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CommentIcon from "@mui/icons-material/Comment";
import IconButton from "@mui/material/IconButton";
import {
  Avatar,
  Container,
  Divider,
  ListItemAvatar,
  Typography,
} from "@mui/material";
import apiService from "../../../Shared/Apiserver";
import dayjs from "dayjs";

function Notice({ CaseNotices }) {
 
  return (
    <Container maxWidth="xl">
      {" "}
      <List style={{maxHeight: '70vh', overflow: 'auto',width:'100%'}}>
        {CaseNotices.map((value) => (
          <>
            <ListItem
              key={value.id}
              disableGutters
              secondaryAction={
                <IconButton aria-label="comment">
                  <CommentIcon />
                </IconButton>
              }
            >
              <ListItemText
                primary={`ถึง : ${value.CaseNotice_to}`}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body5"
                    >
                      โดย {value.name}
                    </Typography>
                    <br></br>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body5"
                    >
                      เมื่อวันที่{" "}
                      {dayjs(value.CaseNotice_senddate).format("DD/MM/YYYY")}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </Container>
  );
}

export default Notice;
