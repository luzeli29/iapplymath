import React, {useState, useEffect,useCallback} from 'react';
import QuestionFormats from '@utils/game/quiz/questionGeneration/questionFormats'
import IconGroup from '@comps/iconGroup';
import getText from '@utils/text/getText'
import DevErr from '@utils/debug/devErr';
import DevLog from '@utils/debug/devLog';

const ButtonAnswerBox = ({questionFormat,lang,handleSubmitAnswer}) => {


  if(!questionFormat) {
    DevErr('"questionFormat" is required for ButtonAnswerBox.')
    questionFormat = QuestionFormats.trueFalse
  }

  if(!questionFormat.buttons) {
    DevErr('"questionFormat.buttons" is required for ButtonAnswerBox.')
  }


  const renderQuestionButton = (textId,value) => {
      return(
        <button className="btn btn-outline-dark" onClick={() => handleSubmitAnswer(value)}> {getText(textId,lang)} </button>
      )
  }


  // default width and height
  let groupWidth = (!questionFormat.groupWidth ? 2: questionFormat.groupWidth )  
  let groupHeight = (!questionFormat.groupHeight ? 1: questionFormat.groupHeight )

  return (
    <div>
      <IconGroup 
                    lang={lang}
                    icons={questionFormat.buttons}
                    getContentFromValue={(key,value) => renderQuestionButton(value.textId, value.value)}
                    width={ groupWidth  }
                    height={groupHeight}/>
    </div>
  )
}

export default ButtonAnswerBox
