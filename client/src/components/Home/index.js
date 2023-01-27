import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { loadMore } from "../../store/actions/articles";
import Divider from "@mui/material/Divider";

const Home = () => {
  const articles = useSelector((state) => state.articles);
  const dispatch = useDispatch();

  useEffect(() => {
    if (articles.articles.length <= 0) {
      dispatch(loadMore(articles.homeSort));
    }
  }, [dispatch]);

  const getNextArticles = () => {
    let skip = articles.homeSort.skip + articles.homeSort.limit;
    dispatch(loadMore({ ...articles.homeSort, skip: skip }));
  };

  return (
    <>
      <Grid container spacing={2} className="article_card">
        {articles && articles.articles
          ? articles.articles.map((item) => (
              <Grid key={item._id} item xs={12} sm={6} lg={3}>
                {item.title}
              </Grid>
            ))
          : null}
      </Grid>
      <Divider />
      <Button variant="outlined" onClick={getNextArticles}>
        Load More
      </Button>
    </>
  );
};

export default Home;
