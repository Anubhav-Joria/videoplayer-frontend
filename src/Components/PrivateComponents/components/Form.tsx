import { Grid, TextField, Box, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

type FormType = {
  editing?: boolean;
  add?: boolean;
};

const BASE_URL = process.env.REACT_APP_BASE_URL;

function Form(props: FormType) {
  const { state } = useLocation();
  console.log("state", state);

  const [name, setName] = useState<any>(state?.card?.name || "");
  const [link, setLink] = useState<any>(state?.card?.link || "");
  const [category, setCategory] = useState<any>(state?.card?.category || "");

  const navigate = useNavigate();
  const postCards = async (values: any, id: number) => {
    if (id === -1) {
      await axios({
        method: "post",
        url: `${BASE_URL}/addCard`,
        data: {
          values,
          email: sessionStorage.getItem("userEmail"),
        },
      })
        .then((res) => {
          console.log("res", res);
          navigate("/");
        })
        .catch((err) => {
          alert(err?.response?.data?.message);
        });
    } else {
      await axios
        .post(`${BASE_URL}/editCard`, null, {
          params: {
            email: sessionStorage.getItem("userEmail"),
            newData: values, 
            id: state.card?._id
          },
        })
        .then((res) => {
          console.log("res", res);
          navigate("/");
        })
        .catch((err) => {
          alert(err?.response?.data?.message);
        });
    }
  };

  const Services = (values: any, id: any) => {
    postCards(values, id);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const values = {
      name: name,
      link: link,
      category: category,
    };
    if (props?.add === true) {
      Services(values, -1);
    }
    if (props?.editing === true) {
      Services(values, state.card?._id);
    }
  };

  return (
    <>
      <Box
        sx={{ boxShadow: 3, width: "40%", mx: "auto" }}
        paddingX={5}
        paddingY={8}
        marginY={2}
      >
        {props.add ? (
          <Typography variant="h5" marginBottom={4}>
            Add Video
          </Typography>
        ) : (
          <Typography variant="h5" marginBottom={4}>
            Edit Video
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Grid>
                <TextField
                  value={name}
                  label={props.add ? "Video Name" : ""}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Grid>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Grid>
                <TextField
                  label={props.add ? "Video Link" : ""}
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid>
                <TextField
                  label={props.add ? "Video Category" : ""}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid marginY={3}>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Grid>
        </form>
      </Box>
    </>
  );
}

export default Form;
