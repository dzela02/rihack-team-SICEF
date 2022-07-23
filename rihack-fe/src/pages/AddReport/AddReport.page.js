import React, { useCallback, useRef, useState } from "react";
import Navigation from "../../components/Navigation";
// import { useNavigate } from "react-router-dom";
import { Field, Form } from "react-final-form";
import TextFieldAdapter from "../../components/TextFieldAdapter/TextFieldAdapter.component";
import { Button } from "@mui/material";
import { addReport, uploadImage } from "../../api/reports/index";

import "./AddReport.styles.scss";
import { toast } from "react-toastify";
import GlobalLoader from "../../components/GlobalLoader";

const AddReport = () => {
  // const navigate = useNavigate();

  const inputRef = useRef();

  const [image, setImage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(
    async (values) => {
      let imageUrl;
      setIsLoading(true);
      try {
        imageUrl = await uploadImage(image);
      } catch (err) {
        toast.error("Error uploading image");
      } finally {
        try {
          await addReport(values.description, 45.327037, 14.467993, imageUrl);
        } catch (err) {
          toast.error("Error adding report");
        } finally {
          setIsLoading(false);
        }
      }
    },
    [image]
  );

  const handleInputChange = useCallback((event) => {
    const file = event.target.files;
    if (file) {
      setImage(file[0]);
    }
  }, []);

  return (
    <div className="add-report">
      <Navigation />
      {isLoading && <GlobalLoader />}
      <h3>Add report</h3>
      <p>Welcome to Eco Rijeka</p>
      <Form
        onSubmit={handleSubmit}
        render={({ handleSubmit, submitting, valid }) => (
          <form
            onSubmit={handleSubmit}
            className="add-report__form"
            autoComplete="off"
          >
            <Field
              name="description"
              component={TextFieldAdapter}
              label={"Description"}
              placeholder={"Type something... (optional)"}
            />
            <Button
              className="add-report__form__upload"
              variant="contained"
              component="label"
            >
              {image?.name || "Upload file"}
              <input
                type="file"
                ref={inputRef}
                onChange={handleInputChange}
                accept="image/*"
                hidden
              />
            </Button>
            <Button type="submit" disabled={submitting || !valid || !image}>
              Add report
            </Button>
          </form>
        )}
      />
    </div>
  );
};

export default AddReport;
