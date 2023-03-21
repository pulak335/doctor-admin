import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography, useTheme } from "@mui/material";
import { Deserializer } from "jsonapi-serializer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosServices from "utils/axiosServices";
import { useDispatch, useSelector } from "react-redux";
import { addCaseEntryReducer } from "store/caseEntry";
import langString from "utils/langString";
import Notfound from "views/Notfound/Notfound";




export default function Homepage() {
  const [dashboardData, setDashboardData] = useState<any>({});
  const [phone, setPhone] = useState<any>('');
  const [caller, setCaller] = useState<any>('');
  const theme = useTheme(); 
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handlecall = () =>{
    const data:any = {fieldName: "phoneNum", value:phone}
    dispatch(addCaseEntryReducer(data))
    const data2:any = {fieldName: "caller", value:caller}
    dispatch(addCaseEntryReducer(data2))
    navigate("/emergency-call")    
  }


  return (
    <Container>
      <Box sx={{width:'25%',mx:'auto'}}>
        <TextField onChange={(e)=>setPhone(e.target.value)} sx={{width:'100%',mt:'25%', mb:'15px'}} id="outlined-basic" label="Mobile Number" variant="outlined" />
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Caller</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value= {caller}
          label="Caller"
          onChange={(e)=>setCaller(e.target.value)}
        >
          <MenuItem value="volunteer">Volunteer</MenuItem>
          <MenuItem value="passerby">Passer By</MenuItem>
          <MenuItem value="passenger">Passenger</MenuItem>
          <MenuItem value="tlFieldStaff">TL Field Staff</MenuItem>
        </Select>
      </FormControl>
        <Button onClick={handlecall} variant="contained" sx={{ width:'100%',mx:'auto',mt:'10%', fontSize:24}}>Received Call</Button>
      </Box>
    </Container>
  );
}
