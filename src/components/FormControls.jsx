"use client";

import React from "react";
import formControls from "./FormControls.module.scss";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

const FormControls = () => {
  const router = useRouter(); // navigate with useRouter
  const { isSection1Valid, isSection2Valid, jobTitle, jobDescription, jobLocation, interviewDuration, questions } = useSelector((state) => state.interview);

  const searchParams = useSearchParams();
  const interviewId = searchParams.get('id');
  const pathname = usePathname();
  const currentStep = pathname.split("/").pop();

  const isEditMode = pathname.includes("edit");  // check if edit mode

  // Validation map for each step (same for both edit and create mode)
  const validationMap = {
    step1: {
      isValid: isSection1Valid,
      nextStep: isEditMode ? `/interview-creation/edit/step2?id=${interviewId}` : "/interview-creation/step2",
      errorMessage: "Please fill all fields and proceed.",
    },
    step2: {
      isValid: isSection2Valid,
      nextStep: isEditMode ? `/interview-creation/edit/step3?id=${interviewId}` : "/interview-creation/step3",
      previousStep: isEditMode ? `/interview-creation/edit/step1?id=${interviewId}` : "/interview-creation/step1", // different URL for edit mode
      errorMessage: "Please fill all fields and proceed.",
    },
    step3: {
      previousStep: isEditMode ? `/interview-creation/edit/step2?id=${interviewId}` : "/interview-creation/step2", // different URL for edit mode
      errorMessage: "Please fill all fields and proceed.",
    }
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
    const currentValidation = validationMap[currentStep];
      router.push(currentValidation.previousStep); // previous step
  };

  const handlePublish = async () => {
    const interviewData = {
      jobTitle,
      jobDescription,
      interviewDuration,
      questions,
      jobLocation,
      createdAt: new Date(),
    };
  
    try {
      // new interview data to firestore
      const docRef = await addDoc(collection(db, "interviews"), interviewData);
      
      const interviewId = docRef.id;
  
      // navigate to edit page with interview id
      router.push(`/`);
      alert(`Interview published successfully! ID: ${interviewId}`);
    } catch (error) {
      console.error("Error publishing interview:", error);
      alert("An error occurred while publishing. Please try again.");
    }
  };

  const handleUpdate = async () => {
    const interviewId = searchParams.get('id'); // get interview id from URL
  
    if (interviewId) {
      const interviewRef = doc(db, "interviews", interviewId); // get interview reference from firestore
  
      try {
        // update interview data in firestore
        await updateDoc(interviewRef, {
          jobTitle,
          jobDescription,
          interviewDuration,
          jobLocation,
          questions, 
          updatedAt: new Date(),
        });
  
        // updated successfully
        console.log("Interview successfully updated!");
        router.push('/'); // navigate to home page
      } catch (error) {
        console.error("Error updating interview: ", error);
      }
    } else {
      console.log("No interview ID found to update.");
    }
  };

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
          {
            isEditMode 
              ? currentStep === 'step3' 
                ? (
                  <Button
                    className={formControls.proceed}
                    onClick={handleUpdate}
                    
                  >
                    UPDATE
                  </Button>
                ) 
                : (<Button
                  className={formControls.proceed}
                  onClick={handleProceed}
                  disabled={!validationMap[currentStep]?.isValid} 
                >
                  PROCEED
                </Button>)
              : (
                currentStep === 'step3' 
                  ? (
                    <Button
                      className={formControls.proceed}
                      onClick={handlePublish}
                    >
                      PUBLISH
                    </Button>
                  ) 
                  : (
                    // Diğer adımlarda PROCEED butonu aktif
                    <Button
                      className={formControls.proceed}
                      onClick={handleProceed}
                      disabled={!validationMap[currentStep]?.isValid} // validation kontrolü
                    >
                      PROCEED
                    </Button>
                  )
              )
          }
        </div>
      </div>
    </section>
  );
};

export default FormControls;
