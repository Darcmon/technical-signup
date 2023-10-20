import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {
  Grid,
  Button,
  FormControl,
  Paper,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Toggle from "./Inputs/Toggle";
import TextInput from "./Inputs/TextInput";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(5),
    backgroundColor: "#F7F9FD",
    width: "30%",
  },
  formControl: { padding: theme.spacing(2) },
  error: { color: "red" },
  button: {
    marginTop: theme.spacing(4),
    alignContent: "right",
    backgroundColor: "#3A8DFF",
    padding: "5px 30px",
    color: "#ffffff",
    fontSize: "15px",
    "&:disabled": {
      color: "#ffffff",
      fontSize: "15px",
      backgroundColor: "lightgrey",
    },
    "&:hover": {
      color: "#ffffff",
      fontSize: "15px",
      backgroundColor: "#3A8DFF",
    },
  },
}));

const Onboarding = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [onboardingForm, setOnboardingForm] = useState({
    isFetching: true,
  });
  const [onboardingData, setOnboardingData] = useState(props.user);
  const [formStep, setFormStep] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const fetchOnboardingFormData = async () => {
      setOnboardingForm((prev) => ({ ...prev, isFetching: true }));
      try {
        const { data } = await axios.get("/api/onboarding");
        setOnboardingForm(data);
      } catch (error) {
        console.error(error);
      } finally {
        setOnboardingForm((prev) => ({ ...prev, isFetching: false }));
      }
    };
    fetchOnboardingFormData();
  }, []);

  useEffect(() => {
    // Check if all required fields are filled
    const requiredFields = ["firstName", "country"]; // Update with your required fields
    const isValid = requiredFields.every(
      (field) => onboardingData && onboardingData[field]
    );

    setIsFormValid(isValid);
  }, [onboardingData]);

  function prepareFormData(onboardingData) {
    const step1Fields = [
      { name: "firstName", value: onboardingData.firstName || "" },
      { name: "lastName", value: onboardingData.lastName || "" },
      { name: "bio", value: onboardingData.bio || "" },
    ];

    const step2Fields = [
      { name: "country", value: onboardingData.country || "" },
      {
        name: "receiveNotifications",
        value: onboardingData.receiveNotifications || false,
      },
      { name: "receiveUpdates", value: onboardingData.receiveUpdates || false },
    ];

    return { steps: [step1Fields, step2Fields] };
  }

  const onInputChange = (event, type = "text") => {
    setOnboardingData((prevData) => {
      return {
        ...prevData,
        [event.target.name]:
          type === "checkbox" ? event.target.checked : event.target.value,
      };
    });
  };

  const saveOnboarding = async () => {
    const formData = prepareFormData(onboardingData);

    try {
      const response = await axios.post("/api/onboarding", formData);
      console.log(response);
    } catch (error) {
      console.error(error);
    }

    history.push({
      pathname: "/home",
      state: { onboarding: true },
    });
  };

  const formDisplay = () => {
    if (formStep === 0) {
      return (
        <>
          <FormControl fullWidth className={classes.formControl}>
            <TextInput
              label={"First Name"}
              name={"firstName"}
              required={true}
              onboardingData={onboardingData}
              onChange={onInputChange}
            />
          </FormControl>

          <FormControl fullWidth className={classes.formControl}>
            <TextInput
              label={"Last Name"}
              name={"lastName"}
              required={false}
              onboardingData={onboardingData}
              onChange={onInputChange}
            />
          </FormControl>

          <FormControl fullWidth className={classes.formControl}>
            <TextInput
              label={"Country"}
              name={"country"}
              required={true}
              onboardingData={onboardingData}
              onChange={onInputChange}
            />
          </FormControl>

          <FormControl fullWidth className={classes.formControl}>
            <TextInput
              label={"Bio"}
              name={"bio"}
              required={false}
              onboardingData={onboardingData}
              onChange={onInputChange}
              textarea={true}
            />
          </FormControl>
        </>
      );
    } else {
      return (
        <>
          <FormControl fullWidth className={classes.formControl}>
            <Toggle
              label={
                "I would like to receive email notifications for new messages when I'm logged out"
              }
              name={"receiveNotifications"}
              onChange={onInputChange}
              onboardingData={onboardingData}
            />
          </FormControl>
          <FormControl fullWidth className={classes.formControl}>
            <Toggle
              label={"I would like to receive updates"}
              name={"receiveUpdates"}
              onChange={onInputChange}
              onboardingData={onboardingData}
            />
          </FormControl>
        </>
      );
    }
  };

  const renderButton = (text) => {
    if (text === "Back") {
      return (
        <Button
          className={classes.button}
          type="submit"
          variant="contained"
          size="large"
          onClick={() => {
            setFormStep((currentStep) => currentStep - 1);
          }}
          style={{ opacity: formStep === 0 ? "0" : "100" }} // Visibility of button changes based on formStep
        >
          {text}
        </Button>
      );
    } else if (text === "Next") {
      return (
        <Button
          className={classes.button}
          type="submit"
          variant="contained"
          size="large"
          onClick={() => {
            if (isFormValid) {
              setFormStep((currentStep) => currentStep + 1);
            }
          }}
          disabled={!isFormValid}
          style={{ opacity: formStep === 1 ? "0" : "100" }} // Visibility of button changes based on formStep
        >
          {text}
        </Button>
      );
    } else {
      return (
        <Button
          className={classes.button}
          type="submit"
          variant="contained"
          size="large"
          onClick={() => {
            if (isFormValid) {
              //Now handles the saveOnboarding
              setFormStep(0);
              saveOnboarding();
            }
          }}
          disabled={!isFormValid}
          style={{ opacity: formStep === 0 ? "0" : "100" }} // Visibility of button changes based on formStep
        >
          {text}
        </Button>
      );
    }
  };

  if (onboardingForm?.isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <Grid container justifyContent="center">
      <Paper className={classes.container}>
        {formDisplay()}

        <FormControl fullWidth className={classes.formControl}>
          {formStep === 0 ? (
            <Typography className={classes.error}>
              Please fill all the required fields before proceeding.
            </Typography>
          ) : null}

          <Grid justifyContent="space-between" container>
            <Grid item>
              {renderButton("Back")}
              {renderButton("Finish")}
              {renderButton("Next")}
            </Grid>
          </Grid>
        </FormControl>
      </Paper>
    </Grid>
  );
};

export default Onboarding;
