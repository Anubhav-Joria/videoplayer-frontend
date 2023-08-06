import React from "react";
import { Button, Stack, Typography } from "@mui/material";

interface CategoriesProps {
  categories: any;
  selectedCategory: any;
  setSelectedCategory: any;
}
const Categories = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: CategoriesProps) => {
  return (
    <Stack
      direction="row"
      sx={{
        overflowX:"auto",
        height: { sx: "auto", md: "95%" },
        mt: { sx: 0, md: 3 },
        flexDirection: { md: "column" },
      }}
    >
      <Button
      sx={{whiteSpace : "nowrap", mt:2, ml:2}}
        className="category-btn"
        onClick={() => setSelectedCategory("All Items")}
        variant={"All Items" === selectedCategory ? "contained" : "outlined"}
      >
        <Typography>All Items</Typography>
      </Button>
      {categories.map((category: any) => (
        <Button variant={category.name === selectedCategory ? "contained" : "outlined"}
        sx={{whiteSpace: {xs:"nowrap", md : "normal"} ,mt:2, ml:2}}
          className="category-btn"
          onClick={() => {
            setSelectedCategory(category.name)}}
          key={category.name}
        >
          <Typography>{category.name}</Typography>
        </Button>
      ))}
    </Stack>
  );
};

export default Categories;
