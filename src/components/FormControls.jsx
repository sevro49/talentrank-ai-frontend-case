"use client"

import React from 'react';
import formControls from './FormControls.module.scss';
import { useSelector } from 'react-redux'; 
import Button from '@mui/material/Button';
import { usePathname, useRouter } from 'next/navigation';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

const FormControls = () => {
  const router = useRouter();  // navigate with useRouter
  const { isSection1Valid } = useSelector((state) => state.interview);

  const pathname = usePathname();
  const currentStep = pathname.split('/').pop();

  const handleProceed = () => {
    if (isSection1Valid) {
      router.push('/interview-creation/step2');  // navigate to step2
    } else {
      alert('Please fill all the fields to proceed');
    }
  };
  const handlePrevious = () => {
    router.push('/interview-creation/step1');
  };

  // console.log(isSection1Valid)

  return (
    <section className={formControls.pageContainer}>
      <div className={formControls.btnWrapper}>
        <div className={formControls.previousWrapper}>
          <Button onClick={handlePrevious} className={`${formControls.previous} ${currentStep === "step1" ? formControls.hidePrevious : ""}`} ><KeyboardArrowLeftIcon className={handlePrevious.icon} /> PREVIOUS</Button>
        </div>
        <div className={formControls.proceedWrapper}>
          <Button className={formControls.draft}>DRAFT</Button>
          <Button className={formControls.proceed} onClick={handleProceed}
          disabled={!isSection1Valid}  // isSection1Valid === false => disabled 
          >PROCEED</Button>
        </div>
      </div>
    </section>
  );
};

export default FormControls;
