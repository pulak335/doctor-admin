import { Box, Button, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import Wrapper from "components/Card/Wrapper";
import BasicDataTable, { ColumnType } from "components/common/BasicDataTable";
import ConfirmButton from "components/common/ConfirmButton";
import SearchBox from "components/common/SearchBox";
import { Deserializer } from "jsonapi-serializer";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SNACKBAR_OPEN } from "store/actions";
import Loader from "ui-component/Loader";
import axiosServices from "utils/axiosServices";
import { numberWithCommas, serializeValidData } from "utils/Helpers";
import langString from "utils/langString";
import SearchIcon from "@mui/icons-material/Search";

export default function FeedbackList() {
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<any[]>([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState<string>('');
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const Columns: ColumnType[] = [
    { 
      header: "Hospital Name", 
      accessor: "name",
      content: (item: any) => <Typography>{item.name}</Typography>, 
    },
    {
      header: "Location",
      accessor: "location",
      content: (item: any) => <Typography align="left">{item.address}</Typography>,
    },
    {
      header: "Service Level",
      accessor: "servicelevel",
      content: (item: any) => <Typography>{item.serviceLevel}</Typography>,
    },
    {
      header: "Contact Number",
      accessor: "contact",
      content: (item: any) => <Typography>{item.phone}</Typography>,
    },
    {
      header: "Hot Line",
      accessor: "hotline",
      content: (item: any) => {
        return numberWithCommas(item.hotline);
      },
    },
    {
      header: "Email",
      accessor: "email",
      content: (item: any) => {
        return numberWithCommas(item.email);
      },
    },
    {
      header: "Fax",
      accessor: "Fax",
      content: (item: any) => <Typography>{item.fax}</Typography>
      
    },
    
    {
      header: "Action",
      accessor: "action",
      content: (item: any) => (
        <Box display="flex" sx={{ justifyContent: 'space-around' }} >
          {/* <Button
            component={Link}
            variant="contained"
            color="primary"
            to={`/service-details/${item.id}`}
            size="small"
          >
            View
          </Button> */}
            <Button
            component={Link}
            variant="contained"
            color="secondary"
            to={`/hospital/edit/${item.uuid}`}
            size="small"
            sx={{ marginLeft: 0.5 }}
          >
            Edit
          </Button>
          
            <ConfirmButton
            subTitle={`Delete Zone Location: ${item.name}`}
            confirmed={() => deleteListItem(item.uuid)}
          />
        </Box>
      ),
    },
  ];



  const deleteListItem = async (id: number) => {
    if (id) {
      setLoading(true);
      try {
        const postData = serializeValidData("hospital",{hospital: {uuid: id }});
        const response = await axiosServices.post(
          `hospital/delete`,
          postData,
        );
        if (response.status === 200) {
          dispatch({
            type: SNACKBAR_OPEN,
            open: true,
            message: "Hospital Deleted successfully.",
            variant: "alert",
            alertSeverity: "success",
          });
          const allRows = [...rows];
          const filtered = allRows.filter((item: any) => item.uuid !== id);
          setRows(filtered);
          setLoading(false);
          navigate('/hospital', { replace: true })

        }
      } catch (error: any) {
        setLoading(false);
        dispatch({
          type: SNACKBAR_OPEN,
          open: true,
          message: error,
          variant: "alert",
          alertSeverity: "error",
        });
      }
    }
  };



  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        const response = await axiosServices.post(
          `hospital/get-all?limit=${rowsPerPage}&currentPage=${page + 1}`
        );
        if (response.status === 200) {
          if (response.data) {
              setCount(response.data.paginationInfo.totalData);
              setRows(response.data?.hospitalList);
          }
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    init();
  }, [page, rowsPerPage]);
  

  const handleSearch =(value:string)=>{
    setSearch(value);
    const body = {searchString: value}
    axiosServices.post('hospital/search',body).then((response)=>{
      setCount(response.data.paginationInfo.totalData);
      setRows(response.data?.hospitalList);
    }).catch((error)=>{
      console.log(error)
    })
  }

  return (
    <Wrapper title={langString("Hospital")} addLink="/hospital/add">
      {loading && <Loader />}
      <Box sx={{ marginTop: 1 }}>
        <Grid container>
          <Grid
            item
            xs={12}
            sm={12}
            sx={{ marginBottom: 2, textAlign: "right" }}
          >
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
            onChange={(e)=>handleSearch(e.target.value)}
            placeholder="Search Hospital"
            size="small"
          />

          </Grid>
        </Grid>
        <BasicDataTable
          columns={Columns}
          rows={rows}
          count={count}
          page={page}
          rowsPerPage={rowsPerPage}
          setPage={(value: number) => setPage(value)}
          setRowsPerPage={(value: number) => setRowsPerPage(value)}
        />
      </Box>
    </Wrapper>
  );
}
