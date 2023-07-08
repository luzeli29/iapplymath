import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import style from "@styles/game_layout.module.css";
import translations from "@translations";
import "reactjs-popup/dist/index.css";
import Ayu from "@comps/game/quiz/ayu";
import AnswerBox from "@comps/game/quiz/answerBox";
import QuestionBox from "@comps/game/quiz/questionBox";
import Loading from "@comps/screens/loading";
import DevErr from "@utils/debug/devErr";
import getText from "@utils/text/getText";
import Error from "pages/error";
import useQuizCookies from "@hooks/quiz/useQuizCookies";
import DevLog from "@utils/debug/devLog";
import ProgressBar from "react-bootstrap/ProgressBar";

// Brain Breaks
// import DeepBreathingBreak from 'pages/brainBreak/deep-breathing-break';
// import PoppinBubblesBreak from 'pages/brainBreak/poppin-bubbles-break';
// import FreeSyleArtBreak from 'pages/brainBreak/free-style-art-break';
// import MandalaArtBreak from 'pages/brainBreak/madala-art-break';

//TODO: Change to "Quiz" and move to comps folder
const GameQuestionLayout = ({
  user,
  settings,
  quizData,
  initQuestionNum,
  children,
}) => {
  // const [showBrainBreak, setShowBrainBreak] = useState(false)

  if (!user) {
    DevErr('"user" is required for "Quiz" Screen');
    return <Error />;
  }
  if (!settings) {
    DevErr('"settings" is required for "Quiz" Screen');
    return <Error />;
  }

  const lang = settings.lang;

  if (!quizData) {
    DevErr('"quizData" is required for "Quiz" Screen');
    return <Error error={getText("quiz_data_not_found", lang)} />;
  }

  if (!quizData.questions) {
    DevErr('"questions" field in "quizData" is required for "Quiz" Screen');
    return <Error error={getText("quiz_dataquestions_not_found", lang)} />;
  }

  const { createQuizCookie } = useQuizCookies();

  const [questionNum, setQuestionNum] = useState(
    initQuestionNum ? parseInt(initQuestionNum) : 0
  );
  const [incorrectNum, setIncorrectNum] = useState(0);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const questions = quizData.questions;
  const onBack = quizData.onBack;
  const onFinish = quizData.onFinish;
  const isFinished = questionNum >= questions.length;

 

  useEffect(() => {
    

    const exitingFunction = () => {
      if (!isFinished) {
        createQuizCookie(quizData);
      }
    };

    router.events.on("routeChangeStart", exitingFunction);

    return () => {
      DevLog("Unmounting GameQuestionLayout");
      router.events.off("routeChangeStart", exitingFunction);
     
    };
  }, []);

  if (!router.isReady) return <Loading />;

  function handleAyuClick() {
    //TODO: Change to brain break
    var encodedUrl = encodeURIComponent(router?.asPath ?? "");
    router.push("/game/ayu/ayuLevelSelect?url=" + encodedUrl);
  }

  const handleFinish = async () => {
    handleExit();
    if (onFinish) {
      onFinish();
    } else {
      router.push("/game/map");
    }
  };

  const handleBack = async () => {
    await handleExit();
    if (onBack) {
      onBack();
    } else {
      router.push("/game/map");
    }
  };

  async function handleExit() {
    const cleanedQuestions = cleanQuestions(questions);

    if (cleanedQuestions.length > 0) {
      const gameType = router.pathname.split("/")[2];

      let questionData = {
        games_played: {
          questions: cleanedQuestions,
          username: user.username,
          gameType: gameType,
        },
      };

      if (gameType == "restaurant") {
        //questionData.order = cleanOrder()
      }

      try {
        user.putSession(questionData);
      } catch (e) {
        DevErr(e.message);
      }
    }
  }

  const handleSubmitAnswer = (answer) => {
    switch (questions[questionNum].answer) {
      case "": // No Correct answer, blank number pad (usually for feedback questions)
        handleCorrectAnswer();
        if (questions[questionNum].onAnswer) {
          questions[questionNum].onAnswer(answer);
        }
        break;
      case "fill_in": //Question requires value from user to be later used
        if (questions[questionNum].onAnswer(answer)) {
          handleCorrectAnswer();
        } else {
          //Filled in answer is not accepted
          handleIncorrectAnswer();
        }
        break;
      default:
        if (answer == questions[questionNum].answer) {
          //Answer is correct
          questions[questionNum].incorrectNum = incorrectNum;
          handleCorrectAnswer();
        } else {
          //Answer is incorrect
          handleIncorrectAnswer();
        }
    }
  };

  const handleCorrectAnswer = () => {
    setQuestionNum(questionNum + 1);
    setIncorrectNum(0);
    quizData.questionNum++;
  };

  const handleIncorrectAnswer = () => {
    setIncorrectNum(incorrectNum + 1);
  };

  const render = () => {
    if (loading) return <Loading />;

    if (isFinished) {
      handleFinish();
      return <Loading />;
    }

    const correctAnswer = questions?.[questionNum]?.answer;
    const questionFormatKey = questions?.[questionNum]?.questionFormatKey;
    const progress = Math.round((questionNum / questions?.length) * 100);
    return (
      <>
        <div className="back_button_container">
          <button
            className="basic_button"
            id={style.back_button}
            onClick={() => handleBack()}
          >
            {translations.back[lang]}
          </button>
        </div>
        <ProgressBar
          className="w-75"
          variant="success"
          now={progress}
          label={`${progress}%`}
        />
        <table className="fill_container">
          <tbody>
            <tr>
              <td className={style.child_container}>{children}</td>

              <td className={style.question_container} >
                <QuestionBox
                  className={style.question_box}
                  questionData={questions[questionNum]}
                  incorrectNum={incorrectNum}
                  
                />
              </td>
            </tr>
            <tr>
              <td className={style.numpad_container}>
                <AnswerBox
                  correctAnswer={correctAnswer}
                  questionFormatKey={questionFormatKey}
                  handleSubmitAnswer={handleSubmitAnswer}
                />
              </td>
              <td className={style.ayu_block}>
                <Ayu handleAyuClick={() => handleAyuClick()}  />
              </td>
            </tr>
          </tbody>
        </table>
      </>
    );
  };

  return render();
};

function cleanQuestions(questions) {
  let cleanedQuestions = [];
  questions.map((question) => {
    if (question.answer == "") return;
    if (question.answer == "fill_in") return;
    if (!(question.incorrectNum >= 0)) {
      question.incorrectNum = "not_answered";
    }
    cleanedQuestions[cleanedQuestions.length] = {
      question_text: question.en,
      correct_answer: question.answer,
      incorrect_num: question.incorrectNum,
      time_taken: question.timeTaken,
    };
  });
  return cleanedQuestions;
}

export default GameQuestionLayout;
