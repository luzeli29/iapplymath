import DevErr from '@utils/debug/devErr';
import DevLog from '@utils/debug/devLog';

import loadDialogScripts from '@utils/dialog/loadDialogScripts';
import Error from 'pages/error';
import React from 'react'
import retrieveUserContext from '@hooks/HOF/retrieveUserContext';
import { useRouter } from 'next/router';
import Dialog from '../../comps/dialog/dialog';
import Loading from '../../comps/screens/loading';

export async function getStaticPaths() {
    const dialogScripts = await loadDialogScripts()
    const dialogScriptKeys = Object.keys(dialogScripts)

    let keyPaths = []
    for (let dialogScriptKey of dialogScriptKeys) {
      keyPaths.push({ params: { dialogScriptKey: dialogScriptKey}});
  }

  return {
      paths: keyPaths,
      fallback: false,
  };
}

export async function getStaticProps(context){
  const dialogScriptKey = context.params.dialogScriptKey
  const dialogScripts = await loadDialogScripts()
  const dialogScript = dialogScripts[dialogScriptKey]
  const dialogScriptError = dialogScripts.error

  return {
    props: {
      dialogScript,
      dialogScriptError
    },
  }
}

const DialogScreen = ({user,settings,dialogScript,dialogScriptError}) => {

  const lang = settings.lang
  const router = useRouter()
  const avatarId = user?.data?.avatarId ?? ''
  if(!dialogScript) {
    DevErr('No "dialogScript" given, setting as dialog error...')
    dialogScript = dialogScriptError
  }

  let stage = dialogScript.stage
  if(!stage) {
    DevErr('No "stage" in "dialogScript", setting as dialog error...')
    dialogScript = dialogScriptError
  }

  const verifyNeededStageData = () => {
    if(stage.isLogginRequired && !user.loggedIn) {
      DevLog('User is not logged in, but "stage.isLogginRequired" is true.')
      router.push('/user/login')
      return <Loading/>
    }

    if(stage.isAvatarRequired && !user.hasAvatar()) {
      DevLog('User does not have an avatar, but "stage.isAvatarRequired" is true.')
      router.push('/user/avatar/select')
      return <Loading/>
    }

  }

  verifyNeededStageData()

  return (
    <Dialog avatarId={avatarId} lang={lang} dialogScript={dialogScript}/>
  )
}

export default retrieveUserContext(DialogScreen)