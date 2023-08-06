import React from "react";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import axios from "axios";
import ReactPlayer from "react-player";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  margin: "auto",
};

interface CardItemProp {
  changeRefresh: any;
  handleFetchCategories: any;
  fetchCategoryData: any;
  card: any;
}

const CardItem = ({
  changeRefresh,
  card,
}: CardItemProp) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  const deleteCard = async (id: number) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/deleteCard`,
        null,
        {
          params: {
            id: id,
            email: sessionStorage.getItem("userEmail"),
          },
        }
      );
      changeRefresh();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <>
      <Card sx={{ maxWidth: 345, margin: { xs: "auto" } }}>
        {card.name.length > 20 ? (
          <Typography variant="h5" component="h2">
            {`${card.name.substring(0, 20)}...`}
          </Typography>
        ) : (
          <Typography variant="h5" component="h2">
            {card.name}
          </Typography>
        )}

        <CardActions>
          <Grid container>
            <Grid item xs={12}>
              <Button onClick={handleOpen} variant="outlined" size="large">
                Play Video
              </Button>
            </Grid>

            <Grid item xs={6} mt={2}>
              <Button
                size="small"
                onClick={() => {
                  navigate(`/edit/${card._id}`, {
                    state: {
                      card,
                    },
                  });
                }}
                color="primary"
                variant="contained"
              >
                Edit
                <span>
                  <EditIcon />
                </span>
              </Button>
            </Grid>
            <Grid item xs={6} mt={2}>
              <Button
                size="small"
                onClick={() => {
                  deleteCard(card?._id);
                }}
                color="error"
                variant="contained"
              >
                Delete
                <span>
                  <DeleteOutlinedIcon />
                </span>
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ReactPlayer url={card?.link} />
        </Box>
      </Modal>
    </>
  );
};

export default CardItem;
