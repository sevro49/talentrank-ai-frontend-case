import React from 'react'
import step2 from './page.module.scss'

// Material UI
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import Slider from '@mui/material/Slider';

const page = () => {
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

  return (
    <section className={step2.pageContainer}>
      <div className={step2.title}>
        <h1>Customize</h1>
        <p>Customize Description</p>
      </div>

      <div className={step2.questionForm}>
        <Card className={step2.card}>
          <CardHeader
            className={step2.cardHeader}
            title="question 1"
            action={
              <Button>
                <EditIcon className={step2.icon} />
              </Button> 
            }
            sx={{
              '.MuiCardHeader-title': {
                fontSize: '1rem', // Küçük ekranlar için varsayılan font size
          
                // Custom breakpoint (örneğin 640px ve üstü)
                '@media (min-width: 640px)': {
                  fontSize: '1.5rem', // 640px ve üstü ekranlar için font size
                },
              },
            }}
          />
          <CardContent className={step2.cardContent}>
            <DragIndicatorIcon className={step2.icon} />
            <TextField 
              variant="outlined"
              multiline
              sx={textAreaStyle} 
              rows={4}
              fullWidth
              className={step2.questionTextArea}/>
          </CardContent>
          <CardActions className={step2.cardActions}>
            <div className={step2.weightage}>
              <span className={step2.weightageLabel}>Weightage Score:</span>
              <Slider
                aria-label="weightage score"
                defaultValue={2}
                className={step2.slider}
                valueLabelDisplay="auto"
                step={1}
                min={0}
                max={3}
                
              />
            </div>
            <div className={step2.remove}>
              <Button sx={{ textTransform: 'none' }}>
                Remove
              </Button> 
            </div>
          </CardActions>
        </Card>
      </div>
    </section>
  )
}

export default page