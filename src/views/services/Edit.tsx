import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Wrapper from "components/Card/Wrapper";
import FileInput from "components/common/FileInput";
import Required from "components/common/Required";
import { Formik } from "formik";
import { Deserializer } from "jsonapi-serializer";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { SNACKBAR_OPEN } from "store/actions";
import { gridSpacing } from "store/constant";
import Loader from "ui-component/Loader";
import axiosServices from "utils/axiosServices";
import {
  serviceDependencies,
  SERVICEPROVIDERS,
  serviceTypes,
} from "utils/Constants";
import { serializeValidData } from "utils/Helpers";
import langString from "utils/langString";
import * as Yup from "yup";

export default function EditService() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [details, setDetails] = useState<any>(null);
  const [units, setUnits] = useState<any[]>([]);
  const [image, setImage] = useState("");
  const param = useParams();


  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        const postData = { uuid: param.id }
        const response = await axiosServices.post(
          `hospital/get-all`,
          postData
        );
        if (response.status === 200) {
          setDetails(response.data.hospitalList[0]);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    init();
  }, [param.id]);

  return (
    <Wrapper
      title={`${langString("Edit")} ${langString("Hospital")}`}
      backLink="/hospital"
    >
      {loading && <Loader />}
      {details && (
        <Formik
          initialValues={{
                name: details.name,
                address: details.address,
                latitude:details.latitude,
                longitude:details.longitude,
                serviceLevel: details.serviceLevel,
                phone: details.phone,
                hotline:details.hotline,
                email:details.email,
                landline:details.landline,
                fax:details.fax,
                submit: null,
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required("Name is required"),
            address: Yup.string().required("Address is required"),
            serviceLevel: Yup.string().required("Capability is required"),
            longitude: Yup.string().required("Longitude is required"),
            latitude: Yup.string().required("Latitude is required"),
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
              const body = {
                uuid:details.uuid,
                name: values.name,
                address: values.address,
                latitude:values.latitude,
                longitude:values.longitude,
                serviceLevel: values.serviceLevel,
                phone: values.phone,
                hotline:values.hotline,
                email:values.email,
                landline:values.landline,
                fax:values.fax
              }

            try {
              setLoading(true);
              const postData = serializeValidData("hospitals", {hospital:body});
              const response = await axiosServices.post(
                "hospital/update",
                postData
              );
              if (response.status === 200) {
                dispatch({
                  type: SNACKBAR_OPEN,
                  open: true,
                  message: "Hospital Updated Successfully",
                  variant: "alert",
                  alertSeverity: "success",
                });
                navigate("/hospital", { replace: true });
              }
              setLoading(false);
            } catch (err: any) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values,
          }) => (
            <form noValidate onSubmit={handleSubmit}>
            <Box sx={{ border: "1px solid #EEE", padding: 3, borderRadius: 3 }}>
              <Grid container spacing={gridSpacing}>
                <Grid item xs={6} md={3}>
                  <Typography
                    variant="h5"
                    sx={{ marginTop: 2, textAlign: "right" }}
                  >
                    Hospital Name <Required />
                  </Typography>
                </Grid>
                <Grid item xs={6} md={7}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.name && errors.name)}
                  >
                    <TextField
                      id="outlined-adornment-name-user-create"
                      type="text"
                      label={"Hospital Name"}
                      value={values.name}
                      name="name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.name && errors.name && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-name-user-create"
                      >
                        {errors.name}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>
                <Grid item xs={6} md={3}>
                  <Typography
                    variant="h5"
                    sx={{ marginTop: 2, textAlign: "right" }}
                  >
                    {langString("Location")} <Required/>
                  </Typography>
                </Grid>
                <Grid item xs={6} md={7}>
                  <FormControl fullWidth>
                    <TextField
                      id="outlined-adornment-name-user-create"
                      type="text"
                      label={langString("Location")}
                      name="address"
                      value={values.address}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.address && errors.address && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-name-user-create"
                      >
                        {errors.address}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              </Grid>


              <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>
                <Grid item xs={6} md={3}>
                  <Typography
                    variant="h5"
                    sx={{ marginTop: 2, textAlign: "right" }}
                  >
                    {langString("Capability")} <Required/>
                  </Typography>
                </Grid>

              <Grid item xs={6} md={7}>
                  <FormControl
                    fullWidth
                  >
                    <InputLabel id="dependson-select-label">
                      {langString("Capability")}
                    </InputLabel>
                    <Select
                      name="serviceLevel"
                      id="dependson-select"
                      fullWidth
                      value={values.serviceLevel}
                      label={langString("Capability")}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <MenuItem value="Mild">
                        {langString("Mild")}
                      </MenuItem>
                      <MenuItem value="Moderate">
                        {langString("Moderate")}
                      </MenuItem>
                      <MenuItem value="Severe">
                        {langString("Severe")}
                      </MenuItem>
                    </Select>
                    {touched.serviceLevel && errors.serviceLevel && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-name-user-create"
                      >
                        {errors.serviceLevel}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
            </Grid>


            
              <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>
                <Grid item xs={6} md={3}>
                  <Typography
                    variant="h5"
                    sx={{ marginTop: 2, textAlign: "right" }}
                  >
                    {langString("Location Mark")} <Required />
                  </Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                  <FormControl fullWidth>
                    <TextField
                      label={langString("Latitude")}
                      id="outlined-adornment-quantity-user-create"
                      type="text"
                      name="latitude"
                      value={values.latitude}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      required
                    />
                    {touched.latitude && errors.latitude && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-name-user-create"
                      >
                        {errors.latitude}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={4} md={3}>
                  <FormControl fullWidth>
                    <TextField
                      label={langString("Longitude")}
                      id="outlined-adornment-quantity-user-create"
                      type="text"
                      name="longitude"
                      value={values.longitude}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      required
                    />
                  {touched.longitude && errors.longitude && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-name-user-create"
                      >
                        {errors.longitude}
                      </FormHelperText>
                    )}  
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>
                <Grid item xs={6} md={3}>
                  <Typography
                    variant="h5"
                    sx={{ marginTop: 2, textAlign: "right" }}
                  >
                    {langString("Cell Phone")}
                  </Typography>
                </Grid>
                <Grid item xs={6} md={7}>
                  <FormControl fullWidth>
                    <TextField
                      id="outlined-adornment-name-user-create"
                      type="text"
                      name="phone"
                      label={langString("Cell Phone")}
                      value={values.phone}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>
               <Grid item xs={6} md={3}>
                  <Typography
                    variant="h5"
                    sx={{ marginTop: 2, textAlign: "right" }}
                  >
                    {langString("Email")}
                  </Typography>
                </Grid>
                <Grid item xs={6} md={7}>
                  <FormControl fullWidth>
                    <TextField
                      id="outlined-adornment-name-user-create"
                      type="text"
                      label={langString("Email")}
                      name="email"
                      value={values.email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>
               <Grid item xs={6} md={3}>
                  <Typography
                    variant="h5"
                    sx={{ marginTop: 2, textAlign: "right" }}
                  >
                    {langString("Hotline")}
                  </Typography>
                </Grid>
                <Grid item xs={6} md={7}>
                  <FormControl fullWidth>
                    <TextField
                      id="outlined-adornment-name-user-create"
                      type="text"
                      label={langString("Hotline")}
                      name="hotline"
                      value={values.hotline}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>
               <Grid item xs={6} md={3}>
                  <Typography
                    variant="h5"
                    sx={{ marginTop: 2, textAlign: "right" }}
                  >
                    {langString("Landline")}
                  </Typography>
                </Grid>
                <Grid item xs={6} md={7}>
                  <FormControl fullWidth>
                    <TextField
                      id="outlined-adornment-name-user-create"
                      type="text"
                      label={langString("Landline")}
                      name="landline"
                      value={values.landline}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>
               <Grid item xs={6} md={3}>
                  <Typography
                    variant="h5"
                    sx={{ marginTop: 2, textAlign: "right" }}
                  >
                    {langString("Fax")}
                  </Typography>
                </Grid>
                <Grid item xs={6} md={7}>
                  <FormControl fullWidth>
                    <TextField
                      id="outlined-adornment-name-user-create"
                      type="text"
                      label={langString("Fax")}
                      name="fax"
                      value={values.fax}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Grid>
              </Grid>

              {errors.submit && (
                <Box sx={{ mt: 3 }}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Box>
              )}
              <Box sx={{ textAlign: "right", paddingTop: 3 }}>
                <Button
                  color="warning"
                  disabled={isSubmitting}
                  size="large"
                  type="button"
                  onClick={() => navigate("/hospital", { replace: true })}
                  variant="contained"
                  sx={{ marginRight: 2 }}
                >
                  {langString("cancel")}
                </Button>
                <Button
                  color="primary"
                  disabled={isSubmitting}
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  {langString("save")}
                </Button>
              </Box>
            </Box>
          </form>
          )}
        </Formik>
      )}
    </Wrapper>
  );
}
