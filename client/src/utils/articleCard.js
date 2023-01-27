import { Link as RouterLink, Route } from "react-router-dom";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";

const ArticleCard = ({ article }) => {
  return (
    <Card>
      <CardMedia
        style={{ height: 0, paddingTop: "56.25%" }}
        image={`https://picsum.photos/200?${article._id}`}
        title="some title"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {article.title}
        </Typography>
        <Typography gutterBottom variant="body2" component="p">
          {article.excerpt}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton>
          <FavoriteIcon />
        </IconButton>
        <Button
          size="small"
          color="primary"
          component={RouterLink}
          to={`/articles/article/${article._id}`}
        >
          View article
        </Button>
      </CardActions>
    </Card>
  );
};

export default ArticleCard;
