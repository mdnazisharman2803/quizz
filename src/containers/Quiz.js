import { useEffect, useState } from "react";
import "./Quiz.css";
import Grid from "@mui/material/Grid";
import {
  CircularProgress,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";

const Quize = ({ onExit }) => {
  const [loading, setLoading] = useState(1);
  const [totalMarks, setTotalMarks] = useState(0);
  const [marks, setMarks] = useState(0);
  const [completed, setCompleted] = useState(0);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);

  const handleNext = () => {
    setCurrentQuestion(currentQuestion + 1);
  };

  const handleSubmit = () => {
    var _marks = 0;
    var _totolMarks = 0;
    questions.forEach(function (question) {
      _totolMarks += question.marks;
      if (question.value === question.correctOption) _marks += question.marks;
    });
    setTotalMarks(_totolMarks);
    setMarks(_marks);
    setCompleted(true);
  };

  const handlePrev = () => {
    setCurrentQuestion(currentQuestion - 1);
  };

  const fetch = async () => {
    const questionRef = collection(db, "questions");
    const data = await getDocs(questionRef);
    // setQuestions(
    const d = data.docs.map((doc) => ({
      ...doc.data(),
    }));

    setQuestions(d.map((question) => ({ ...question, value: -1 })));
    setLoading(0);
  };
  useEffect(() => {
    fetch();
  }, []);

  if (loading) {
    return (
      <div className="main-container">
        <CircularProgress />
      </div>
    );
  }
  if (completed) {
    var question = questions[currentQuestion];

    return (
      <div className="main-container">
        <div>
          <Typography variant="h4" textAlign="center" color="initial">
            Congratulations
          </Typography>
          <Typography variant="h6" textAlign="center" color="initial">
            Your score is {`${marks} / ${totalMarks}`}
          </Typography>
          <button
            style={{ margin: "10px auto", display: "block" }}
            className="exit-btn"
            onClick={onExit}
          >
            Exit
          </button>
          <div className="question">
            <Typography variant="h6" color="initial">
              Question No. {currentQuestion + 1}
            </Typography>
            <Typography variant="h5" color="primary">
              {question.questions}
            </Typography>
            <br />

            <FormControl component="fieldset">
              <RadioGroup
                aria-label={question.questions}
                name="{inputData.label}"
                value={
                  question.value > -1 ? question.options[question.value] : null
                }
                onChange={() => {}}
              >
                {question.options.map((option, index) => {
                  return (
                    <FormControlLabel
                      id={index}
                      style={
                        question.value == index
                          ? {
                              color:
                                question.value == question.correctOption
                                  ? "green"
                                  : "red",
                            }
                          : {}
                      }
                      value={index}
                      control={
                        <Radio
                          style={
                            question.value == index
                              ? {
                                  color:
                                    question.value == question.correctOption
                                      ? "green"
                                      : "red",
                                }
                              : {}
                          }
                        />
                      }
                      label={option}
                    />
                  );
                })}
              </RadioGroup>
            </FormControl>
            <Grid container justifyContent="flex-end" spacing={2}>
              {currentQuestion > 0 && (
                <Grid item>
                  <button onClick={handlePrev} className="exit-btn">
                    Prev
                  </button>
                </Grid>
              )}
              {currentQuestion < questions.length - 1 && (
                <Grid item>
                  <button onClick={handleNext} className="exit-btn">
                    Next
                  </button>
                </Grid>
              )}
            </Grid>
          </div>
        </div>
      </div>
    );
  } else {
    var question = questions[currentQuestion];

    return (
      <div>
        <div>
          <div className="header">
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>Please complete the test</Grid>
              <Grid item>
                <button onClick={onExit} className="exit-btn">
                  Exit
                </button>
              </Grid>
            </Grid>
          </div>
          <div>
            <Grid container>
              <Grid
                item
                style={{ borderRight: "1px solid #ccc", minHeight: "90vh" }}
                sm={3}
                xs={2}
                md={1}
              >
                <Grid container>
                  {questions.map((question, index) => {
                    return (
                      <Grid id={index} item xs={12} sm={6}>
                        <div
                          className={`question-tile ${
                            question.value >= 0 ? "attempted" : ""
                          }`}
                        >
                          {index + 1}
                        </div>
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
              <Grid item xs={9} md={11}>
                <Grid
                  container
                  style={{ minHeight: "90vh" }}
                  justifyContent="center"
                  alignItems="center"
                >
                  <div className="question">
                    <Typography variant="h6" color="initial">
                      Question No. {currentQuestion + 1}
                    </Typography>
                    <Typography variant="h5" color="primary">
                      {question.questions}
                    </Typography>
                    <br />

                    <FormControl component="fieldset">
                      <RadioGroup
                        aria-label={question.questions}
                        name="{inputData.label}"
                        value={question.value}
                        onChange={(e) => {
                          const newQuestions = [...questions];
                          newQuestions[currentQuestion].value = +e.target.value;
                          console.log(newQuestions);
                          setQuestions(newQuestions);
                        }}
                      >
                        {question.options.map((option, index) => {
                          return (
                            <FormControlLabel
                              id={index}
                              value={index}
                              control={<Radio />}
                              label={option}
                            />
                          );
                        })}
                      </RadioGroup>
                    </FormControl>
                    <Grid container justifyContent="flex-end" spacing={2}>
                      {currentQuestion > 0 && (
                        <Grid item>
                          <button onClick={handlePrev} className="exit-btn">
                            Prev
                          </button>
                        </Grid>
                      )}
                      {currentQuestion < questions.length - 1 ? (
                        <Grid item>
                          <button onClick={handleNext} className="exit-btn">
                            Next
                          </button>
                        </Grid>
                      ) : (
                        <Grid item>
                          <button onClick={handleSubmit} className="submit-btn">
                            Submit
                          </button>
                        </Grid>
                      )}
                    </Grid>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
};

export default Quize;
