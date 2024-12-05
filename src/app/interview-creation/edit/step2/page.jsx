'use client'

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { addQuestion, reorderQuestions, validateSection2, setQuestions } from '../../../../store/interviewSlice';
import { SortableItem } from './SortableItem';

import step2 from './page.module.scss'

// Material UI
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// Firebase imports
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../../firebase"; // Firebase yapılandırma dosyasını içe aktarın
import { useSearchParams } from 'next/navigation';

const Stage2Edit = () => {
  const dispatch = useDispatch();
  const { jobTitle, jobDescription, interviewDuration: selectedDuration, jobLocation: selectedLocation, questions } = useSelector((state) => state.interview);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const [questionText, setQuestionText] = useState('');
  const [questionWeightage, setQuestionWeightage] = useState(2);

  const searchParams = useSearchParams();
  const interviewId = searchParams.get('id');

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = questions.findIndex((q) => q.id === active.id);
      const newIndex = questions.findIndex((q) => q.id === over.id);
      const newQuestions = arrayMove(questions, oldIndex, newIndex);
      dispatch(reorderQuestions(newQuestions)); // reorder the questions
    }
  };

  const handleAddQuestion = async () => {
    const newQuestion = { 
      id: Date.now().toString(), 
      text: questionText, 
      weightage: questionWeightage
    };

    dispatch(addQuestion(newQuestion)); // add new Question Card

    // clear the local state
    setQuestionText('');
    setQuestionWeightage(2);
  };

  useEffect(() => {
    const fetchInterviewData = async () => {
      if (interviewId) {
        const docRef = doc(db, "interviews", interviewId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const interviewData = docSnap.data();
          dispatch(setQuestions(interviewData.questions || [])); // setQuestions to redux store
        } else {
          console.log("No such document!");
        }
      }
    };

    fetchInterviewData(); // fetch questions
  }, [interviewId, dispatch]);

  useEffect(() => {
    dispatch(validateSection2()); // form validation check
  }, [questions, questionText, questionWeightage, dispatch]);

  return (
    <section className={step2.pageContainer}>
      <div className={step2.title}>
        <h1>Customize</h1>
        <p>Customize Description</p>
      </div>

      <div className={step2.questionForm}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={questions}
            strategy={verticalListSortingStrategy}
          >
            {questions?.map((question, index) => (
              <SortableItem
                key={question.id}
                setQuestionText={setQuestionText}
                setQuestionWeightage={setQuestionWeightage}
                questionText={questionText}
                questionWeightage={questionWeightage}
                id={question.id}
                number={index + 1}
              />
            ))}
          </SortableContext>
        </DndContext>

        {/* Add button */}
        <Button onClick={handleAddQuestion} className={step2.addButton}>
          <AddIcon className={step2.icon} />
        </Button>
      </div>
    </section>
  );
}

export default Stage2Edit;
