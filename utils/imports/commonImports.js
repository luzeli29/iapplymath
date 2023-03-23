import Dialog from 'comps/dialog/dialog';
import GameQuestionLayout from '@layouts/gameLayouts/gameQuestionLayout';
import getText from '@utils/text/getText';
import throwError from '@utils/error/throwError';
import formatAnswer from '@utils/game/formatAnswer'
import simplifyAnswer from '@utils/game/simplifyAnswer'
import simplifyFraction from '@utils/game/simplifyFraction'
import {useWrapperContext} from '@hooks/useWrapperContext'
import GameFinishLayout from '@layouts/gameLayouts/gameFinishLayout';
import GameIndexLayout from '@layouts/gameLayouts/gameIndexLayout';

export {
  // Components
  Dialog,
  // Functions
  getText,
  throwError,
  formatAnswer,
  simplifyAnswer,
  simplifyFraction,
  useWrapperContext,
  // Layouts
  GameQuestionLayout,
  GameFinishLayout,
  GameIndexLayout,
  
}