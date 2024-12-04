"use client"

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { setJobTitle, setJobDescription, setInterviewDuration, setJobLocation, validateSection1 } from '@/store/interviewSlice';
import step1 from './page.module.scss';

// Material UI
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import TextEditor from '@/components/TextEditor';

const interviewDuration = [
  { label: '10 minutes' },
  { label: '15 minutes' },
  { label: '20 minutes' },
  { label: '30 minutes' },
  { label: '45 minutes' },
  { label: '60 minutes' },
];

const jobLocation = [
  { label: 'Remote', desc: 'Work from anywhere' },
  { label: 'Hybrid', desc: 'Work from home/office' },
  { label: 'Onsite', desc: 'Work from office' },
];

const Stage1 = () => {
  const dispatch = useDispatch();
  const { jobTitle, jobDescription, interviewDuration: selectedDuration, jobLocation: selectedLocation, isSection1Valid } = useSelector((state) => state.interview);

  const textAreaStyle = {
    "& .MuiOutlinedInput-root": {
      padding: "0 !important",
      "& fieldset": {
        borderColor: "#818181", // unfocused border
      },
      "&.Mui-focused fieldset": {
        borderColor: "#5138EE", // focused border
      },
      "&.Mui-focused .MuiInputBase-input": {
        backgroundColor: "#E7F0FE", // focused bg
      },    
      "& .MuiInputBase-inputMultiline": {
        padding: "16.5px 14px", 
        overflowY: "scroll",
        scrollbarWidth: "none", // hide for Firefox
        "&::-webkit-scrollbar": {
          display: "none", // hide for webkit browsers
        },
      },
      "&.Mui-focused .MuiInputBase-inputMultiline": {
        backgroundColor: "#E7F0FE",
      }
    },
  
    '& .MuiInputLabel-root': {
      '&.Mui-focused': {
        color: '#818181', // focused label color
      },
    },
  };

  const autoCompleteStyle = {
    "& .MuiOutlinedInput-root": {
      padding: "0 !important",
  
      "& fieldset": {
        borderColor: "#818181", // Unfocused border
      },
      "&.Mui-focused fieldset": {
        borderColor: "#5138EE", // Focused border
      },
      "&.Mui-focused .MuiInputBase-input": {
        backgroundColor: "#E7F0FE", // Focused bg
      },
      "& .MuiInputBase-input": {
        padding: "16.5px 14px",
        backgroundColor: "transparent",
      },
      "& .MuiInputBase-inputMultiline": {
        padding: "16.5px 14px",
        backgroundColor: "#E7F0FE",
      },
      "&.Mui-focused .MuiInputBase-inputMultiline": {
        backgroundColor: "#E7F0FE",
      },
    },

    "& .MuiInputLabel-root": {
      "&.Mui-focused": {
        color: "#818181", // Focused label (etiket) rengi
      },
    },
  };

  // console.log(jobTitle, jobDescription, selectedDuration, selectedLocation, isSection1Valid);

  useEffect(() => {
    dispatch(validateSection1());  // form validation check
  }, [jobTitle, jobDescription, selectedDuration, selectedLocation, dispatch]);

  // TextEditor'dan gelen değişiklikleri store'a kaydediyoruz
  const handleJobDescriptionChange = (value) => {
    dispatch(setJobDescription(value));
  };

  return (
    <section className={step1.pageContainer}>
      <div className={step1.title}>
        <h1>Create New Interview</h1>
        <p>Job Description Details</p>
      </div>

      <div className={step1.jobForm}>
        <TextField
          id="outlined-basic"
          label="Job Title"
          variant="outlined"
          fullWidth
          sx={textAreaStyle}
          required
          value={jobTitle}
          onChange={(e) => dispatch(setJobTitle(e.target.value))}
        />
        <TextEditor
          value={jobDescription} // TextEditor'a gönderdiğimiz metin
          onChange={handleJobDescriptionChange} // Değişiklikleri handleJobDescriptionChange fonksiyonu ile store'a kaydet
        />

        <Autocomplete
          disablePortal
          options={interviewDuration}
          fullWidth
          sx={autoCompleteStyle}
          value={selectedDuration}
          required
          onChange={(e, newValue) => dispatch(setInterviewDuration(newValue?.label))}
          renderInput={(params) => <TextField {...params} label="Interview Duration" />}
        />

        <div className={step1.jobLocation}>
          <span className={step1.jobLocationTitle}>Job Location</span>
          <FormControl>
            <RadioGroup
              value={selectedLocation}
              onChange={(e) => dispatch(setJobLocation(e.target.value))}
              className={step1.radioGroup}
            >
              {jobLocation.map((location, index) => (
                <FormControlLabel
                  key={index}
                  value={location.label}
                  control={<Radio />}
                  label={
                    <>
                      <span className={step1.jobLocationType}>{location.label}</span>
                      <div className={step1.jobLocationTypeDesc}>{location.desc}</div>
                    </>
                  }
                />
              ))}
            </RadioGroup>
          </FormControl>
        </div>
      </div>
    </section>
  );
};

export default Stage1;
