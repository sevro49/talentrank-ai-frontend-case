import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button, Card, CardActions, CardContent, CardHeader, TextField, Slider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import step2 from './page.module.scss'
import { removeQuestion, setQuestions } from '../../../store/interviewSlice';
import { useDispatch, useSelector } from 'react-redux';

export const SortableItem = ({ id, number, setQuestionWeightage, setQuestionText }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.interview.questions);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

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

  const handleRemoveQuestion = (index) => {
    dispatch(removeQuestion(index));
  };

  // add question text to the local state
  const handleTextInputChange = (event) => {
    setQuestionText(event.target.value); // update local state
    dispatch(setQuestions(questions.map(q => 
      q.id === id ? { ...q, text: event.target.value } : q
    ))); 
  };
  
  // add question weightage to the local state
  const handleWeightageChange = (event) => {
    setQuestionWeightage(event.target.value); // update local state
    dispatch(setQuestions(questions.map(q => 
      q.id === id ? { ...q, weightage: event.target.value } : q
    )));
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} >
      <Card className={step2.card}>
          <CardHeader
            className={step2.cardHeader}
            title={`Question ${number}`}
            action={
              <Button>
                <EditIcon className={step2.icon} />
              </Button> 
            }
            sx={{
              '.MuiCardHeader-title': {
                fontSize: '1rem',
          
                '@media (min-width: 640px)': {
                  fontSize: '1.5rem',
                },
              },
            }}
          />
          <CardContent className={step2.cardContent}>
            <DragIndicatorIcon className={step2.icon} {...listeners}/>
            <TextField 
              variant="outlined"
              multiline
              sx={textAreaStyle} 
              defaultValue={questions[number - 1].text}
              rows={4}
              fullWidth
              onChange= {handleTextInputChange}
              className={step2.questionTextArea}/>
          </CardContent>
          <CardActions className={step2.cardActions}>
            <div className={step2.weightage}>
              <span className={step2.weightageLabel}>Weightage Score:</span>
              <Slider
                aria-label="weightage score"
                value={questions[number - 1].weightage}
                onChange={handleWeightageChange}
                className={step2.slider}
                valueLabelDisplay="auto"
                step={1}
                min={0}
                max={3}
                
              />
            </div>
            <div className={step2.remove}>
              <Button onClick={() => handleRemoveQuestion(number - 1)} sx={{ textTransform: 'none' }}>
                Remove
              </Button> 
            </div>
          </CardActions>
        </Card>
    </div>
  );
};
