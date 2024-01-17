import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Container,
} from "@mui/material";
import Createcase from "./Createcase";
import Createresponsibleperson from "./Createresponsibleperson";
import CheckDetails from "./CheckDetails";
import apiService from "../../Shared/Apiserver";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const steps = ["Step 1", "Step 2", "Step 3"];

function Steppercase() {
  let  history = useNavigate();

  const [activeStep, setActiveStep] = useState(0);
  const [caseData, setCaseData] = useState({});
  const [responsiblePersonData, setResponsiblePersonData] = useState({});
  const [isCreateCaseValid, setIsCreateCaseValid] = useState(false);
  const [isResponsiblePersonValid, setIsResponsiblePersonValid] =
    useState(false);

  const handleCaseDataChange = (data) => {
    setCaseData(data);
    // Validate data as per your requirements
  };

  const handleNext = async () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === steps.length - 1) {
      try {
        const data = {
          caseData: caseData,
          responsiblePersonData: responsiblePersonData,
        };
        const postData = await apiService.CreateCase(data);

        if ((postData.status = 200)) {
          Swal.fire({
            title: "Good job!",
            text: "You clicked the button!",
            icon: "info",
          }).then((result) => {
            if (
              result.isConfirmed ||
              result.dismiss === Swal.DismissReason.close
            ) {
              // Navigate to /lawyer/case when the modal is closed
              history("/case");
            }
          });
        }
      } catch (error) {
        console.log(error.message);
      }

      
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleResponsiblePersonDataChange = (data) => {
    setResponsiblePersonData(data);
    // Validate data as per your requirements
    const isValid =
      data.inputFields &&
      data.inputFields.every((field) => field.value !== "" && field.age !== "");
    setIsResponsiblePersonValid(isValid);
  };
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <Createcase onCaseDataChange={handleCaseDataChange} />;
      case 1:
        return (
          <Createresponsibleperson
            caseData={caseData}
            onResponsiblePersonDataChange={handleResponsiblePersonDataChange}
          />
        );
      case 2:
        return (
          <CheckDetails
            caseData={caseData}
            responsiblePersonData={responsiblePersonData}
          />
        );
      default:
        return "Unknown step";
    }
  };
  return (
    <Container maxWidth="xl">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <Container>
            <Typography>All steps completed</Typography>
          </Container>
        ) : (
          <div>
            {getStepContent(activeStep)}
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mt: 2, mr: 1 }}
              >
                Back
              </Button>
              <Button variant="contained" onClick={handleNext} sx={{ mt: 2 }}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}

export default Steppercase;
