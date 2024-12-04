"use client"

import React from 'react';
import formControls from './FormControls.module.scss';
import { useSelector } from 'react-redux'; 
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';

const FormControls = () => {
  const router = useRouter();  // navigate with useRouter
  const { isSection1Valid } = useSelector((state) => state.interview);

  const handleProceed = () => {
    if (isSection1Valid) {
      router.push('/interview-creation/step2');  // navigate to step2
    } else {
      alert('Please fill all the fields to proceed');
    }
  };

  console.log(isSection1Valid)

  return (
    <section className={formControls.pageContainer}>
      <div className={formControls.btnWrapper}>
        <Button className={formControls.draft}>DRAFT</Button>
        <Button 
          className={formControls.proceed} 
          onClick={handleProceed}
          disabled={!isSection1Valid}  // isSection1Valid === false => disabled 
        >
          PROCEED
        </Button>
      </div>
    </section>
  );
};

export default FormControls;
