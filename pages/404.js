import React from 'react';
import Link from "next/link"
import { getText} from '@utils/imports/commonImports'
import Loading from '@comps/screens/loading';
import { useUserContext } from '@hooks/siteContext/useUserContext';
import { useRouter } from 'next/router';

//404 page if user goes to page not found
export default function Error() {
  const {user,settings,loading, error} = useUserContext()

  const router = useRouter()

  if(loading || !router.isReady) return <Loading/>
  if(error) return <Error error={error}/>

  const lang = settings.lang

  return (
    //TODO: Make pretty
    <>
      <h2>{getText('page_not_found',lang)}</h2>
      <p>
        {getText('click',lang) + " "}
          <Link href="/"><strong>{getText('here',lang)}</strong></Link> 
        {" " + getText('to_return_home',lang)}
      </p>
    </>
  )
  }
  