import React, {useState, useEffect,useCallback} from 'react';
import QuestionFormats from '@utils/game/quiz/questionGeneration/questionFormats'
import IconGroup from '@comps/iconGroup';
import getText from '@utils/text/getText'
import DevErr from '@utils/debug/devErr';

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

  return (
    <div>
      <IconGroup 
                    lang={lang}
                    icons={questionFormat.buttons}
                    getContentFromValue={(key,value) => renderQuestionButton(value.textId, value.value)}
                    width={2}
                    height={1}/>
    </div>
  )
}

export default ButtonAnswerBox
