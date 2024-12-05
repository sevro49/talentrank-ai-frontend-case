"use client";

import React from 'react';
import { useSelector } from 'react-redux'; 
import { Button, Card, CardActions, CardContent, CardHeader, Slider, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import step3 from './page.module.scss'

const Stage3Edit = () => {
  const router = useRouter(); 
  const { jobTitle, jobDescription, interviewDuration, questions } = useSelector((state) => state.interview);

  const searchParams = useSearchParams();
  const interviewId = searchParams.get('id');

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

  const handleEdit = (step) => {
    router.push(`/interview-creation/edit/${step}`);
  };

  return (
    <section className={step3.pageContainer}>
      <div className={step3.summaryWrapper}>
        <Card className={step3.card}>
          <CardHeader
            className={step3.cardHeader}
            title="Summary and Review"
            sx={{
              '.MuiCardHeader-title': {
                fontSize: '1rem',
                fontWeight: 'bold',
              },
            }}
          />
          <CardContent className={step3.cardContent}>
            {/* Job Details */}
            <Card className={step3.jobDetails}>
              <CardHeader
                className={step3.jobDetailsHeader}
                title="Job Details"
                action={
                  <Button onClick={() => handleEdit(`step1?id=${interviewId}`)}>
                    <EditIcon className={step3.icon} />
                  </Button> 
                }
                sx={{
                  '.MuiCardHeader-title': {
                    fontSize: '1rem',
                    fontWeight: 'bold',
                  },
                }}
              />
              <CardContent className={step3.jobDetailsContent}>
                <div className={step3.jobTitleWrapper}>
                  <h3 className={step3.jobTitle}>Job Title</h3>
                  <span className={step3.job}>{jobTitle}</span>
                </div>

                <div className={step3.jobDescriptionWrapper}>
                  <h3 className={step3.descriptionTitle}>Description</h3>
                  <p className={step3.description}>{jobDescription}</p>
                </div>

                <span className={step3.duration}>{interviewDuration}</span>
              </CardContent>
            </Card>

            {/* Interview Questions */}
            <Card className={step3.interviewQuestions}>
              <CardHeader
                className={step3.interviewQuestionsHeader}
                title="Questions"
                action={
                  <Button onClick={() => handleEdit(`step2?id=${interviewId}`)}>
                    <EditIcon className={step3.icon} />
                  </Button> 
                }
                sx={{
                  '.MuiCardHeader-title': {
                    fontSize: '1rem',
                    fontWeight: 'bold',
                  },
                }}
              />
              <div className={step3.questionsWrapper}>
                {questions?.map((question, index) => (
                  <CardContent key={question.id} className={step3.interviewQuestionsContent}>
                    <Card className={step3.card}>
                      <CardHeader
                        className={step3.cardHeader}
                        title={`Question ${index + 1}`}
                        sx={{
                          '.MuiCardHeader-title': {
                            fontSize: '1rem',
                            fontWeight: 'bold',
                          },
                        }}
                      />
                      <CardContent className={step3.cardContent}>
                        <TextField
                          variant="outlined"
                          multiline
                          sx={textAreaStyle}
                          value={question.text}
                          disabled
                          rows={6}
                          fullWidth
                          className={step3.questionTextArea}
                        />
                      </CardContent>
                      <CardActions className={step3.cardActions}>
                        <div className={step3.weightage}>
                          <span className={step3.weightageLabel}>Weightage Score:</span>
                          <Slider
                            className={step3.slider}
                            value={question.weightage}
                            disabled
                            valueLabelDisplay="auto"
                            step={1}
                            min={0}
                            max={3}
                          />
                        </div>
                      </CardActions>
                    </Card>
                  </CardContent>
                ))}
              </div>
            </Card>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Stage3Edit;
