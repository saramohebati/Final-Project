import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

const PollListPage = () => {
    const[data, setData] = useState([]);
    const[delet, setDelet] =useState([]);

    useEffect(() => {
        // const token = localStorage.getItem("Token");
        const fetchData = async () => {
            try {
                const { data:response } = await axios.get(
                    "http://localhost:3000/login", {
                        // title: title,
                        // description: description,
                    });
                    setData(response.results);
            } catch (error) {
                error("");
            }
        };
        fetchData()
    }, []);

    const deletePoll = (poll_id, e) => {
        // const token = localStorage.getItem("Token");
        axios
          .delete(`http://localhost:3000/poll/${poll_id}`, {

          })
    
          .then(() => {
            const del = delet.filter((row) => poll_id !== row.poll_id);
            setDelet(del);
            window.location.reload(false);
          })
    
          .catch((error) => {
            error("");
        });
      };
    
      let navigate = useNavigate();
      const routeChange = (poll_id) => {
      navigate(`/ManagePollPage/${poll_id}`);
      };

  return (
   
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Title</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Link</TableCell>
            <TableCell align="right">Participant</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((row, poll_id) => (
            <TableRow
              key={poll_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">{row.Title}</TableCell>
              <TableCell align="right">{row.Description}</TableCell>
              <TableCell align="right">
                    {" "}
                    http://localhost3000/PollListPage/{row.poll_id}
                  </TableCell>              
                  <TableCell align="right">{row.Participant}</TableCell>
                  <TableCell align="right">
                    <DeleteForeverIcon onClick={(e) => deletePoll(row.poll_id)}/>
                  </TableCell>
                  <TableCell align="right">
                    <EditIcon onClick={(e) => routeChange(row.poll_id)} />
                  </TableCell>
                </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  );
}

export default PollListPage;