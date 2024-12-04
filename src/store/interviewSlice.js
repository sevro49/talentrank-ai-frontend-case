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
      state.questions = action.payload;  // sorular ekleniyor
    },
    addQuestion: (state, action) => {
      state.questions.push(action.payload); // yeni soru ekleniyor
    },
    validateSection1: (state) => {
      // form validation kontrolü
      state.isSection1Valid = (
        state.jobTitle !== '' &&
        state.jobDescription !== '' &&
        state.interviewDuration !== '' &&
        state.jobLocation !== '' 
      );
    },
    setSummary: (state) => {
      // Özet oluşturma
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

export const { setJobTitle, setJobDescription, setInterviewDuration, setJobLocation, setQuestions, addQuestion, validateSection1, setSummary } = interviewSlice.actions;

export default interviewSlice.reducer;
