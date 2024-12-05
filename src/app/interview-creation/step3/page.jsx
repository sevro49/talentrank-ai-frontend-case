"use client"

import React from 'react'
import step3 from './page.module.scss'
import { useSelector } from 'react-redux'; 
import { Button, Card, CardActions, CardContent, CardHeader, Slider, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/navigation';

const Stage3 = () => {
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
  const router = useRouter(); 
  const { jobTitle, jobDescription, interviewDuration, questions } = useSelector((state) => state.interview);

  const handleEdit = (step) => {
    router.push(`/interview-creation/${step}`);
  }

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
          
                '@media (min-width: 640px)': {
                  fontSize: '1.5rem',
                },
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
                  <Button onClick={() => handleEdit("step1")}>
                    <EditIcon className={step3.icon} />
                  </Button> 
                }
                sx={{
                  '.MuiCardHeader-title': {
                    fontSize: '1rem',
                    fontWeight: 'bold',
              
                    '@media (min-width: 640px)': {
                      fontSize: '1.2rem',
                    },
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
                  <Button onClick={() => handleEdit("step2")}>
                    <EditIcon className={step3.icon} />
                  </Button> 
                }
                sx={{
                  '.MuiCardHeader-title': {
                    fontSize: '1rem',
                    fontWeight: 'bold',
              
                    '@media (min-width: 640px)': {
                      fontSize: '1.2rem',
                    },
                  },
                }}
              />

              <div className={step3.questionsWrapper}>
                {questions.map((question, index) => (
                <CardContent key={question.id} className={step3.interviewQuestionsContent}>
                  <Card className={step3.card}>
                    <CardHeader
                      className={step3.cardHeader}
                      title={`Question ${index + 1}`}
                      sx={{
                        '.MuiCardHeader-title': {
                          fontSize: '1rem',
                          fontWeight: 'bold',
                    
                          '@media (min-width: 640px)': {
                            fontSize: '1.5rem',
                          },
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
                        maxRows={6}
                        fullWidth
                        className={step3.questionTextArea}/>
                    </CardContent>
                    <CardActions className={step3.cardActions}>
                      <div className={step3.weightage}>
                        <span className={step3.weightageLabel}>Weightage Score:</span>
                        <Slider
                        key={`slider-${question?.weightage}`}
                          className={step3.slider}
                          value={question?.weightage}  // Displaying the weightage score as value
                          disabled  // Disabled slider (no interaction)
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
  )
}

export default Stage3