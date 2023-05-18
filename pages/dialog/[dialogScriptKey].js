import DevErr from '@utils/debug/devErr';
import loadDialogScripts from '@utils/dialog/loadDialogScripts';
import Error from 'pages/error';
import React from 'react'

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

const DialogScreen = ({dialogScript,dialogScriptError}) => {

  if(!dialogScript) {
    DevErr('No "dialogScript" given, setting as dialog error...')
    dialogScript = dialogScriptError
  }

  let stage = dialogScript.stage
  if(!stage) {
    DevErr('No "stage" in "dialogScript", setting as dialog error...')
    dialogScript = dialogScriptError
  }

  const render = () => {
    switch(stage) {
      //ayu stages
      case 'ayu':
        return (
          <div>
            Ayu focused
          </div>
        )

      //Speaker stages
      case 'auntHouse' :
      case 'restaurant' :
      case 'school' :
        return (
          <div>
            Ayu focused
          </div>
        )
      default :
          DevErr('"stage": ' + stage + ' is not properly mapped to a dialogType...')
        return (
          <div>
            Ayu focused error
          </div>
        )
    }
  }

  return (
    render()
  )
}

export default DialogScreen