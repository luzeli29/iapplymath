import Dialog from '@components/dialog/dialog';
import GameQuestionLayout from '@layouts/game_layouts/game_question_layout';
import getText from '@utils/text/getText';
import throwError from '@utils/error/throw_error';
import formatAnswer from '@utils/game/format_answer'
import simplifyAnswer from '@utils/game/simplify_answer'
import simplifyFraction from '@utils/game/simplify_fraction'
import {useWrapperContext} from '@components/context/context'
import GameFinishLayout from '@layouts/game_layouts/game_finish_layout';
import GameIndexLayout from '@layouts/game_layouts/game_index_layout';

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