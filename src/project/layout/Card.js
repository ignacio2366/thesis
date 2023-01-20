import * as React from "react";
import { styled as style } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import styled from "styled-components";
import styles from "../../components/styles";

const ExpandMore = style((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CardTable({ id, headline, content, img, date }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      sx={{
        maxWidth: "100%",
        mt: 4,
        p: "14px 22px",
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 20px;",
      }}
    >
      <CardHeader
        avatar={id}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        subheader={
          <>
            <i>{date}</i>
            <span>
              <b>sad</b>
            </span>
          </>
        }
        title={<Title>{headline.toUpperCase()}</Title>}
      ></CardHeader>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {content.slice(0, 120)}
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ borderTop: "0.5px solid gray" }}>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Content>{content}</Content>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export const Title = styled.h1`
  font-size: 24px;
  font-family: ${styles.Bold};
  text-transform: uppercase;
  word-break: break-all;
`;

export const Content = styled.p`
  text-align: justify;
  word-break: break-all;
  overflow: auto;
  padding: 10px;
  letter-spacing: 0.1px;
  color: ${styles.Dark};
`;
