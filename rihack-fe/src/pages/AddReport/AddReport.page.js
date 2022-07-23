import React, { useEffect, useCallback, useRef, useState } from 'react';
import Navigation from '../../components/Navigation';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Field, Form } from 'react-final-form';
import TextFieldAdapter from '../../components/TextFieldAdapter/TextFieldAdapter.component';
import { Button } from '@mui/material';
import { addReport } from '../../api/reports/index';

import './AddReport.styles.scss';

const AddReport = () => {
  const navigate = useNavigate();

  const inputRef = useRef();

  const [image, setImage] = useState();
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  console.log(lat, long);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      setLat(position.coords?.latitude);
      setLong(position.coords?.longitude);
    });
  }, []);

  const handleSubmit = useCallback(
    async (values) => {
      await addReport(values.description, long, lat, image);

      console.log(image, lat, long);
    },
    [image, lat, long]
  );

  const handleInputChange = useCallback(async (event) => {
    const file = event.target.files;
    if (file) {
      setImage(file[0]);
    }
  }, []);

  return (
    <div className="add-report">
      <Navigation />
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
              label={'Description'}
              placeholder={'Type something... (optional)'}
            />
            <Button
              className="add-report__form__upload"
              variant="contained"
              component="label"
            >
              {image?.name || 'Upload file'}
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
