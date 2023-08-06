import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import Sidebar from "./Sidebar";
import Cards from "./Cards";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const CardArea = (props: any) => {
  const navigate = useNavigate();

  const verifyUser = async () => {
    try {
      await axios.get(`${process.env.REACT_APP_BASE_URL}/api/protected`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      });
    } catch (err) {
      navigate("/auth");
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState("All Items");
  const [refresh, setRefresh] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [cards, setCards] = useState<any>(null);

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const handleFetchCategories = async () => {
    let url = `${BASE_URL}/categories`;
    const email = sessionStorage.getItem("userEmail");
    let res = await axios.get(url, { params: { email } });
    setCategories(res.data.userData.categories);
  };

  const fetchCategoryData = async () => {
    let url = `${BASE_URL}/cards`;
    const email = sessionStorage.getItem("userEmail");
    let res = await axios.get(url, {
      params: { email, category: selectedCategory },
    });
    setCards(res.data.cards);
  };

  const fetchAll = async () => {
    let url = `${BASE_URL}/data`;
    const email = sessionStorage.getItem("userEmail");
    let res = await axios.get(url, { params: { email } });
    setCategories(res.data.userData.categories);
    setCards(res.data.userData.cards);
  };

  const changeRefresh = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    fetchAll();
  }, [refresh]);

  useEffect(() => {
    fetchCategoryData();
  }, [selectedCategory]);

  return (
    <>
      <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
        <Box
          sx={{
            height: { sx: "auto", md: "92vh" },
            borderRight: "1px solid #3d3d3d",
            px: { sx: 0, md: 2 },
            width: { md: "15%" },
          }}
        >
          <Sidebar
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </Box>

        <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
          <Typography variant="h4" fontWeight="bold" mb={2} color={"#FC1503"}>
            {selectedCategory}
          </Typography>
          <Cards
            changeRefresh={changeRefresh}
            handleFetchCategories={handleFetchCategories}
            fetchCategoryData={fetchCategoryData}
            cards={cards}
          />
        </Box>
      </Stack>
    </>
  );
};

export default CardArea;
