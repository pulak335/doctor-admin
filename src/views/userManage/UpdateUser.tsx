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
  import Required from "components/common/Required";
  import { Formik } from "formik";
  import { useEffect, useState } from "react";
  import { useDispatch } from "react-redux";
  import { useNavigate, useParams } from "react-router-dom";
  import { SNACKBAR_OPEN } from "store/actions";
  import { gridSpacing } from "store/constant";
  import Loader from "ui-component/Loader";
  import axiosServices from "utils/axiosServices";
  import langString from "utils/langString";
  import * as Yup from "yup";
  
  export default function UpdateUser() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [details, setDetails] = useState<any>(null);
    const [roles, setRoles] = useState<any[]>([]);
    const param = useParams();
  
    useEffect(() => {
        const init = async () => {
          setLoading(true);
          try {
            const response = await axiosServices.post(
              `role/get-all`
            );
            if (response.status === 200) {
              setRoles(response.data?.roleList);
              setLoading(false);
            }
          } catch (error) {
            setLoading(false);
            console.log(error);
          }
        };
        init();
      }, []);
  
  
    useEffect(() => {
      const init = async () => {
        setLoading(true);
        try {
          const postData = { uuid: param.id }
          
          const response = await axiosServices.post(
            `user/get-all`,
            postData
          );
          if (response.status === 200) {
            setDetails(response.data.userList[0]);
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
        title={`${langString("edit")} ${langString("User")}`}
        backLink="/admin/user-manage"
      >
        {loading && <Loader />}
        {details && (
          <Formik
            initialValues={{
                name: details.user_name,
                fullname:details.full_name,
                email:details.email,
                phone:details.phone_num,
                userRole:details.role_uuid,
                gender:details.gender,
                organization:details.organization,
                designation:details.designation,
                status:details.status === true ? 1 : 0,
                // password:details.password,
                submit: null,
            }}
            validationSchema={Yup.object().shape({
                name: Yup.string().required("User Name is required"),
                fullname: Yup.string().required("Full Name is required"),
                email: Yup.string().email('Invalid email format').required("Email is required"),
                phone: Yup.string().min(11).required("Phone number is required"),
                userRole: Yup.string().required("User role number is required"),
                gender: Yup.string().required("Gender is required"),
                status: Yup.string().required("Status is required"),
                // password: Yup.string().min(6).max(16).required("Password is Required"),
              })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
              // const body: any = {
              //   uuid: details.uuid,
              //   userName: values.name,
              //   fullName:values.fullname,
              //   email:values.email,
              //   phoneNum:values.phone,
              //   gender:values.gender,
              //   organization: values.organization,
              //   designation:values.designation,
              //   // password:values.password,
              //   status:values.status
              // };

              const postData = {userId: details.uuid, roles:[values.userRole]};
  
              try {
                setLoading(true);
                const response = await axiosServices.post(
                  "user/updateRole",
                  postData
                );
                if (response.status === 200) {
                  dispatch({
                    type: SNACKBAR_OPEN,
                    open: true,
                    message: "User Role Updated Success",
                    variant: "alert",
                    alertSeverity: "success",
                  });
                  navigate("/admin/user-manage", { replace: true });
                }
                setLoading(false);
              } catch (err: any) {
                dispatch({
                  type: SNACKBAR_OPEN,
                  open: true,
                  message: "User Role Updated Failed",
                  variant: "alert",
                  alertSeverity: "error",
                });
                setStatus({ success: false });
                // setErrors({ submit: err.message });
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
                        User Name <Required />
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
                          label={"User Name"}
                          value={values.name}
                          name="name"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          disabled
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
                        {langString("Full name")} <Required/>
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={7}>
                      <FormControl fullWidth>
                        <TextField
                          id="outlined-adornment-name-user-create"
                          type="text"
                          label={langString("Full name")}
                          name="fullname"
                          value={values.fullname}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          disabled
                        />
                        {touched.fullname && errors.fullname && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-name-user-create"
                          >
                            {errors.fullname}
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
                        {langString("Email")} <Required/>
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={7}>
                      <FormControl fullWidth>
                        <TextField
                          id="outlined-adornment-name-user-create"
                          rows={3}
                          type="text"
                          label={langString("Email")}
                          name="email"
                          value={values.email}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          disabled
                        />
                        {touched.email && errors.email && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-name-user-create"
                          >
                            {errors.email}
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
                        {langString("Cell Number")} <Required/>
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={7}>
                      <FormControl fullWidth>
                        <TextField
                          id="outlined-adornment-name-user-create"
                          rows={3}
                          type="text"
                          label={langString("Cell Number")}
                          name="phone"
                          value={values.phone}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          disabled
                        />
                        {touched.phone && errors.phone && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-name-user-create"
                          >
                            {errors.phone}
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
                        {langString("User Role")}  <Required/>
                      </Typography>
                    </Grid>
    
                  <Grid item xs={6} md={7}>
                      <FormControl
                        fullWidth
                      >
                        <InputLabel id="dependson-select-label">
                          {langString("User Role")}
                        </InputLabel>
                        <Select
                          name="userRole"
                          id="dependson-select"
                          fullWidth
                          value={values.userRole}
                          label={langString("User type")}
                          onChange={handleChange}
                        >
                          {
                            roles.map(role => <MenuItem value={role.uuid}>{langString(`${role.name}`)}</MenuItem>)
                          }
                        </Select>
                        {touched.userRole && errors.userRole && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-name-user-create"
                          >
                            {errors.userRole}
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
                        {langString("Gender")}  <Required/>
                      </Typography>
                    </Grid>
    
                  <Grid item xs={6} md={7}>
                      <FormControl
                        fullWidth
                        disabled
                      >
                        <InputLabel id="dependson-select-label">
                          {langString("Gender")}
                        </InputLabel>
                        <Select
                          name="gender"
                          id="dependson-select"
                          fullWidth
                          value={values.gender}
                          label={langString("Gender")}
                          onChange={handleChange}
                        >
                          <MenuItem value={0}>{langString("Select Gender")}</MenuItem>
                          <MenuItem value="male">
                            {langString("Male")}
                          </MenuItem>
                          <MenuItem value="female">
                            {langString("Female")}
                          </MenuItem>
                        </Select>
                        {touched.gender && errors.gender && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-name-user-create"
                          >
                            {errors.gender}
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
                        {langString("Organization")}
                      </Typography>
                    </Grid>
    
                  <Grid item xs={6} md={7}>
                      <FormControl
                        fullWidth
                      >
                        <TextField
                          id="outlined-adornment-name-user-create"
                          type="text"
                          label={langString("Organization")}
                          name="organization"
                          value={values.organization}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          disabled
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
                        {langString("Designation")}
                      </Typography>
                    </Grid>
    
                  <Grid item xs={6} md={7}>
                      <FormControl
                        fullWidth
                      >
                        <TextField
                          id="outlined-adornment-name-user-create"
                          type="text"
                          label={langString("Designation")}
                          name="designation"
                          value={values.designation}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          disabled
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
                        {langString("Status")}  <Required/>
                      </Typography>
                    </Grid>
    
                  <Grid item xs={6} md={7}>
                      <FormControl
                        fullWidth
                        disabled
                      >
                        <InputLabel id="dependson-select-label">
                          {langString("Status")}
                        </InputLabel>
                        <Select
                          name="status"
                          id="dependson-select"
                          fullWidth
                          value={values.status}
                          label={langString("Status")}
                          onChange={handleChange}
                        >
                          <MenuItem value={1}>
                            {langString("Active")}
                          </MenuItem>
                          <MenuItem value={0}>
                            {langString("Inactive")}
                          </MenuItem>
                        </Select>
                        {touched.gender && errors.gender && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-name-user-create"
                          >
                            {errors.gender}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                </Grid>
    
    
{/*     
                <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>
                    <Grid item xs={6} md={3}>
                      <Typography
                        variant="h5"
                        sx={{ marginTop: 2, textAlign: "right" }}
                      >
                        {langString("Password")}  <Required/>
                      </Typography>
                    </Grid>
    
                  <Grid item xs={6} md={7}>
                      <FormControl
                        fullWidth
                      >
                        <TextField
                          id="outlined-adornment-name-user-create"
                          type="Password"
                          label={langString("Password")}
                          name="password"
                          value={values.password}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        {touched.password && errors.password && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-name-user-create"
                          >
                            {errors.password}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                </Grid> */}
                
    
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
                      onClick={() => navigate("/admin/user-manage", { replace: true })}
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
  