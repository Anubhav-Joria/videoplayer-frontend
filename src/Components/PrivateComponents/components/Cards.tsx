import React from "react";
import {
  Stack,
  Box,
  Typography,
  Button,
  CircularProgress,
  Grid,
} from "@mui/material";
import CardItem from "./CardItem";
import { useNavigate } from "react-router-dom";

export interface CardsProps {
  changeRefresh: any;
  handleFetchCategories: any;
  fetchCategoryData: any;
  cards: any;
}
const Cards = ({
  changeRefresh,
  handleFetchCategories,
  fetchCategoryData,
  cards,
}: CardsProps) => {
  const navigate = useNavigate();
  return (
    <Grid container spacing={2}>
      {cards === null ? (
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : cards.length > 0 ? (
        cards.map((item: any) => (
          <Grid item xs={12} sm={6} lg={4} key={item.id}>
            <CardItem
              changeRefresh={changeRefresh}
              handleFetchCategories={handleFetchCategories}
              fetchCategoryData={fetchCategoryData}
              card={item}
            />
          </Grid>
        ))
      ) : (
        <>
          <Box sx={{ margin: "auto" }}>
            <Typography variant="h5" mb={2}>
              Nothing to show right now! Try adding some
            </Typography>
            <Button
              onClick={() => {
                navigate("/add");
              }}
              variant="contained"
            >
              Add
            </Button>
          </Box>
        </>
      )}
    </Grid>
  );
};

export default Cards;
