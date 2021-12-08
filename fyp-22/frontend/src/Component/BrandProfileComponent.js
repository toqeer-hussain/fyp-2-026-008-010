import {
  FormControl,
  Input,
  InputLabel,
  makeStyles,
  Menu,
  NativeSelect,
  Select,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Button,
  DialogActions,
  withStyles,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import { InputAdornment, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import Border from "../UI/Border";
import Card from "../UI/Card";
import Formik, { useFormik } from "formik";
// import MenuItem from "../UI/MenuItem";
import SideBar from "../UI/SideBar";
import Spacer from "../UI/Spacer";
import MyButton from "../UI/MyButton";
import ApiCall from "../BackendCall";
import * as Yup from "yup";

const websitvalidation = Yup.object({
  brand: Yup.string().required(),
  description: Yup.string().required(),
  domain: Yup.string().required().url(),
  category: Yup.string().required(),
  commission: Yup.number().required(),
});

let itemcategory = [
  { 10: "Clothes" },
  { 20: "Shoes" },
  { 30: "Jewlary" },
  { 40: "Electronics" },
  { 50: "Bookings" },
  { 60: "Courses" },
  { 90: "Furniture" },
];

export default function BrandProfileComponent() {
  const [data, setdata] = useState(null);
  const [status, setstatus] = useState("Pending");
  const [success, setsuccess] = useState(false);
  console.log("detail", data);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: data || {
      brand: "",
      commission: "",
      description: "",
      category: "10",
      domain: "",
    },
    validationSchema: websitvalidation,
    onSubmit: (values) => {
      console.log("vlaue of formik inside");
      ApiCall.post("/website", values).then((result) => {
        setwebid(result.data.webid);
        setwebsite(result.data.website);
        console.log("is updated dat", result.data.updated);
        setsuccess(result.data.updated);
        setopen(true);
      });
    },
  });

  const getdata = async () => {
    const response = await ApiCall.get("/website");
    if (response.data)
      setdata({
        brand: response.data && response.data.brand,
        commission: response.data && response.data.commission,
        description: response.data && response.data.description,
        category: response.data && response.data.category,
        domain: response.data && response.data.domain,
      });
    setstatus(response.data && response.data.status);
    console.log("what is data", response.data);
  };
  useEffect(() => {
    getdata();
  }, []);

  const [open, setopen] = React.useState(false);
  const [webid, setwebid] = React.useState("");
  const [website, setwebsite] = React.useState("");
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={success}
        autoHideDuration={2000}
        onClose={() => setsuccess(false)}
      >
        <MuiAlert variant="filled" elevation="6" severity="success">
          Your Brand has been updated
        </MuiAlert>
      </Snackbar>
      <div style={{ fontWeight: "bold", fontSize: "25px" }}>Brand Detail</div>
      <Border space="5" />
      <Spacer space="10" />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <TextField
            fullWidth
            style={{ marginRight: "12px" }}
            label="Brand Name"
            name="brand"
            variant="outlined"
            placeholder="Enter the Brand Name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.brand}
          />
          {formik.touched.brand && formik.errors.brand ? (
            <div style={{ color: "#B00020" }}>{formik.errors.brand}</div>
          ) : null}
        </div>

        <div>
          <FormControl
            variant="outlined"
            fullWidth
            style={{ marginRight: "12px" }}
          >
            <InputLabel id="demo-simple-select-outlined-label">
              Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Category"
            >
              {itemcategory.map((item) => {
                let itemvalue = Object.entries(item);
                console.log("value of key", Object.keys(item));
                return (
                  <MenuItem value={Object.keys(item)[0]}>
                    {Object.values(item)[0]}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <TextField
            fullWidth
            style={{ marginRight: "12px" }}
            label="Domain Url"
            type="url"
            name="domain"
            variant="outlined"
            placeholder="exmaple.com"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.domain}
          />
          {formik.touched.domain && formik.errors.domain ? (
            <div style={{ color: "#B00020" }}>{formik.errors.domain}</div>
          ) : null}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <TextField
            style={{ marginRight: "12px" }}
            fullWidth
            type="number"
            id="standard-basic"
            label="Commission %"
            variant="outlined"
            name="commission"
            placeholder="Enter the Commission"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.commission}
          />
          {formik.touched.commission && formik.errors.commission ? (
            <div style={{ color: "#B00020" }}>{formik.errors.commission}</div>
          ) : null}
        </div>
      </div>
      <Spacer space="15" />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <TextField
            style={{ marginRight: "12px" }}
            fullWidth
            id="standard-basic"
            label="Description"
            variant="outlined"
            name="description"
            type="textarea"
            placeholder="Enter the Description"
            inputProps={{ type: "textarea", row: 10 }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
          />
          {formik.touched.description && formik.errors.description ? (
            <div style={{ color: "#B00020" }}>{formik.errors.description}</div>
          ) : null}
        </div>
        <Spacer space="5" />
        <TextField
          style={{ marginRight: "12px" }}
          id="standard-basic"
          label="Status"
          variant="outlined"
          inputProps={{ readOnly: true }}
          placeholder="Enter the Commission"
          value={status || "Pending"}
        />
      </div>
      <Spacer space="10" />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <MyButton
          onPress={() => {
            console.log("what is called inside onree");
            formik.handleSubmit();
          }}
        >
          Submit
        </MyButton>
      </div>
      <Spacer space="10" /> <Spacer space="10" />
      <Dialog
        open={open}
        onClose={() => setopen(false)}
        // aria-labelledby="simple-modal-title"
        // aria-describedby="simple-modal-description"
      >
        <DialogContent>
          <DialogTitle id="alert-dialog-title">
            {
              "To track Your webiste, place the following code in the head section of your website"
            }
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <div
                style={{
                  background: "#242323",
                  padding: "15px",
                  color: "white",
                }}
              >
                <textarea
                  cols={80}
                  spellCheck={false}
                  style={{
                    background: "inherit",
                    resize: "none",
                    border: "none",
                    offset: "none",
                    color: "white",
                    focus: "none",
                  }}
                  readOnly
                  className="webscript"
                  cols="60"
                  defaultValue={`<script async defer data-website-id="${webid}" src="http://localhost:3000/jvseatracking.js"></script>`}
                />
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              onClick={() => setopen(false)}
              color="primary"
            >
              Copy
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
}
