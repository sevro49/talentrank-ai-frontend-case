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
import { addQuestion, reorderQuestions, validateSection2 } from '../../../store/interviewSlice';
import {SortableItem} from './SortableItem';

import step2 from './page.module.scss'

// Material UI
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const Stage2 = () => {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.interview.questions);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const [questionText , setQuestionText] = useState('');
  const [questionWeightage , setQuestionWeightage] = useState(2);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = questions.findIndex((q) => q.id === active.id);
      const newIndex = questions.findIndex((q) => q.id === over.id);
      const newQuestions = arrayMove(questions, oldIndex, newIndex);
      dispatch(reorderQuestions(newQuestions));
    }
  };

  const handleAddQuestion = () => {
    const newQuestion = { 
      id: Date.now().toString(), 
      text: '', 
      weightage: 2
    };
    dispatch(addQuestion(newQuestion)); // add new question Card
  
    // Reset the local state
    setQuestionText(''); 
    setQuestionWeightage(2); 
  };

  useEffect(() => {
    dispatch(validateSection2());  // form validation check
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
              <SortableItem key={question.id} setQuestionText={setQuestionText} setQuestionWeightage={setQuestionWeightage} questionText={questionText} questionWeightage={questionWeightage} id={question.id} number={index + 1} />
            ))}
          </SortableContext>
        </DndContext>

        {/* Add button */}
        <Button onClick={handleAddQuestion} className={step2.addButton}>
          <AddIcon className={step2.icon} />
        </Button> 
      </div>
    </section>
  )
}

export default Stage2