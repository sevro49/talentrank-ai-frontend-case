"use client";

import React from "react";
import formControls from "./FormControls.module.scss";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { usePathname, useRouter } from "next/navigation";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

const FormControls = () => {
  const router = useRouter(); // navigate with useRouter
  const { isSection1Valid, isSection2Valid, isSection3Valid } = useSelector((state) => state.interview);

  const pathname = usePathname();
  const currentStep = pathname.split("/").pop();

  // Validation map for each step
  const validationMap = {
    step1: {
      isValid: isSection1Valid,
      nextStep: "/interview-creation/step2",
      errorMessage: "Lütfen tüm alanları doldurun ve devam edin.",
    },
    step2: {
      isValid: isSection2Valid,
      nextStep: "/interview-creation/step3",
      errorMessage: "Lütfen tüm alanları doldurun ve devam edin.",
    },
    step3: {
      isValid: isSection3Valid,
      nextStep: "/interview-creation/summary",
      errorMessage: "Lütfen tüm alanları doldurun ve devam edin.",
    },
  };

  const handleProceed = () => {
    const currentValidation = validationMap[currentStep];
    if (currentValidation && currentValidation.isValid) {
      router.push(currentValidation.nextStep); // next step
    } else {
      alert(currentValidation?.errorMessage || "Bilinmeyen bir hata oluştu."); // show error msg
    }
  };

  const handlePrevious = () => {
    const previousStep = {
      step2: "/interview-creation/step1",
      step3: "/interview-creation/step2",
    };
    router.push(previousStep[currentStep] || "/interview-creation/step1");
  };

  const handlePublish = () => {

  }

  return (
    <section className={formControls.pageContainer}>
      <div className={formControls.btnWrapper}>
        <div className={formControls.previousWrapper}>
          <Button
            onClick={handlePrevious}
            className={`${formControls.previous} ${
              currentStep === "step1" ? formControls.hidePrevious : ""
            }`}
          >
            <KeyboardArrowLeftIcon className={handlePrevious.icon} /> PREVIOUS
          </Button>
        </div>
        <div className={formControls.proceedWrapper}>
          <Button className={formControls.draft}>DRAFT</Button>
          {currentStep === 'step3' 
            ? (
              <Button
                className={formControls.proceed}
                onClick={handlePublish}
              >
                PUBLISH
              </Button>) 
            : (
              <Button
                className={formControls.proceed}
                onClick={handleProceed}
                disabled={!validationMap[currentStep]?.isValid} // inactive button if not valid
              >
                PROCEED
              </Button>)}
          {/* <Button
            className={formControls.proceed}
            onClick={handleProceed}
            disabled={!validationMap[currentStep]?.isValid} // inactive button if not valid
          >
            PROCEED
          </Button> */}
        </div>
      </div>
    </section>
  );
};

export default FormControls;
