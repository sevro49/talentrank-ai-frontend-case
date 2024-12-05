import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Stage 1
  jobTitle: '',
  jobDescription: '',
  interviewDuration: '',
  jobLocation: 'Onsite',  // default value
  isSection1Valid: false,
  isSection2Valid: false,
  isSection3Valid: false,

  // Stage 2
  questions: [], // array of questions

  // Stage 3
  summary: {},  // summary of the interview
  isFormValid: false,
};

const interviewSlice = createSlice({
  name: 'interview',
  initialState,
  reducers: {
    setJobTitle: (state, action) => {
      state.jobTitle = action.payload;
    },
    setJobDescription: (state, action) => {
      state.jobDescription = action.payload;
    },
    setInterviewDuration: (state, action) => {
      state.interviewDuration = action.payload;
    },
    setJobLocation: (state, action) => {
      state.jobLocation = action.payload;
    },
    setQuestions: (state, action) => {
      state.questions = action.payload;  // save questions
    },
    addQuestion: (state, action) => {
      state.questions.push(action.payload); // add new question Card
    },
    removeQuestion: (state, action) => {
      state.questions = state.questions.filter((_, index) => index !== action.payload);
    },
    reorderQuestions: (state, action) => {
      state.questions = action.payload;
    },
    validateSection1: (state) => {
      // form validation
      state.isSection1Valid = (
        state.jobTitle !== '' &&
        state.jobDescription !== '' &&
        state.interviewDuration !== '' &&
        state.jobLocation !== '' 
      );
    },
    validateSection2: (state) => {
      state.isSection2Valid = (
        state.questions.length > 0 && // at least one question
        (state.questions.every(
          (q) => q.text.trim() !== '' && q.weightage !== null // all questions have text and weightage
      )));
    },
    setSummary: (state) => {
      // create summary object
      state.summary = {
        jobTitle: state.jobTitle,
        jobDescription: state.jobDescription,
        interviewDuration: state.interviewDuration,
        jobLocation: state.jobLocation,
        questions: state.questions,
      };
    },
  },
});

export const { setJobTitle, setJobDescription, setInterviewDuration, setJobLocation, setQuestions, addQuestion, validateSection1, validateSection2, setSummary, removeQuestion, reorderQuestions } = interviewSlice.actions;

export default interviewSlice.reducer;
