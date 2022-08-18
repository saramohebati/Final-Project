import SigninHeader from "../../components/header/SinginHeader";
import React from "react";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { ContentCopy } from "@mui/icons-material";
import { BASE_URL } from "../constants";

const PollLink = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const link = `http://${BASE_URL}/poll/${id}`;
  return (
    <div>
      <SigninHeader />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <div>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Share Poll Link With Others
          </Typography>
          <div style={{ marginTop: "20px" }}>
            <TextField id="outlined-basic" variant="outlined" value={id} />
            <ContentCopy
              style={{ marginTop: "15px", marginLeft: "15px" }}
              onClick={() => {
                navigator.clipboard.writeText(link);
              }}
            />
          </div>
          <Button
            style={{
              color: "grey",
              marginTop: "25px",
              marginLeft: "50px",
            }}
            variant="outlined"
            onClick={() => {
              navigate(`/PollPage/${id}`);
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PollLink;
