import GameIndexLayout from '@layouts/gameLayouts/gameIndexLayout'
import ClickableIcon from '@comps/clickableIcon'
import IconGroup from '@comps/iconGroup'
import Loading from '@comps/screens/loading'
import { useUserContext } from '@hooks/siteContext/useUserContext'
import LoadSchoolTopics from '@utils/game/school/quiz/schoolTopics/loadSchoolTopics'
import { useRouter } from 'next/router'
import Error from 'pages/error'
import Login from 'pages/user/login'
import React, { useState } from 'react'
import RetrieveUserContext from '@hooks/HOF/retrieveUserContext'

export async function getStaticProps(){
  let schoolTopics = await LoadSchoolTopics()
  return {
    props: {
      schoolTopics,
    },
  }
}


const SchoolIndex = ({user,settings,schoolTopics}) => {
  const router = useRouter()
  const [selectedTopic, setSelectedTopic] = useState()
  const [instructionText, setInstructionText] = useState('school_index_instruction');

  const lang = settings.lang


  const getTopicIcon = (key,value) => {
    return (
        <ClickableIcon selected={selectedTopic == key} onClick={() => setSelectedTopic(key)}> 
          <div className='mx-auto px-2' style={{position:'relative'}}>
              <h1 className='text-center'style={{width:'40px', height:'50px'}}>
                {value.sign}
              </h1>
          </div>
        </ClickableIcon>
    )
  }

  const handleTopicSubmit = () => {

    if(!selectedTopic) {
      setInstructionText('no_school_topic_selected')
      return false
    }
    router.push('/game/school/basic/levelSelect?schoolTopicKey=' + selectedTopic)         
  }

  return (
    <GameIndexLayout
            lang={lang}
            gameName={'school'}
            instruction_text={instructionText}
            submit_text={'start'}
            handleSubmit={() => handleTopicSubmit()}>
        <div className='row'>
            <IconGroup 
                lang={lang}
                icons={schoolTopics}
                selectIcon={(topic) => setSelectedTopic(topic)}
                selectedIcon={selectedTopic}
                getContentFromValue={(key,value) => getTopicIcon(key,value)}
                width={2}
                height={3}/>
        </div>
        </GameIndexLayout>
  )
}

export default RetrieveUserContext(SchoolIndex,['gameReady','hasActiveGame'])