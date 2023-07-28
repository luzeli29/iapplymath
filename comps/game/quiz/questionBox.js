import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import style from "@styles/game_layout.module.css";
import "reactjs-popup/dist/index.css";
import Loading from "@comps/screens/loading";
import Error from "pages/error";
import Login from "pages/user/login";
import { useUserContext } from "@hooks/siteContext/useUserContext";
import TextReader from "@comps/accessibility/textReader";
import DevLog from "@utils/debug/devLog";
import Popup from "@comps/popups/popup";

export default function QuestionBox({ questionData, incorrectNum }) {
  const { user, settings, loading, error } = useUserContext();
  const isLoggedIn = user.loggedIn;
  const router = useRouter();
  if (loading) return <Loading />;
  if (!router.isReady) return <Loading />;
  if (error) return <Error error={error} />;
  if (!isLoggedIn) return <Login />;
  const lang = settings.lang;

  let hintText = "";
  const clickToOpenText ={
    en:"Click to open the image",
    es:"Haga click para abrir la imagen"
  }
  if (incorrectNum > 0) {
    if (incorrectNum > questionData.hints.length) {
      hintText = questionData.hints.at(-1)[lang];
    } else {
      hintText = questionData.hints[incorrectNum - 1][lang];
    }
  }
  /*
    const hintText = incorrectNum > 0 ? 
                            (incorrectNum) > questionData.hints.length ? 
                            questionData.hints.at(-1)[lang] 
                            : questionData.hints[incorrectNum-1][lang] 
                            : "";
    */

  DevLog("Question:" + questionData);

  const questionSrc = questionData?.imgSrc;
  const path = "/img/questionExamples/" + questionSrc + ".png";
  return (
    <div className={style.question_text_container}>
      <div className="row">
        <div className="col-lg-2"></div>
        <div className="col-lg-10">
          <p className="small-font new-line-compatible">{questionData[lang]}</p>
          <TextReader text={questionData[lang]} reader={"restaurant"} />
        </div>
      </div>
      {questionSrc ? (
        <div className="">
          <Popup
            icon={
            <div className="col-lg">
                <Image
                  width={50}
                  height={50}
                  src="/img/other/image.png"
                  alt="calculator"
                />
                <p>{
                  clickToOpenText[lang]
                  }</p>
            </div>
            }
            content={
              <Image
                priority={true}
                width={250}
                height={250}
                src={path}
                alt={"example image"}
              />
            }
            lang={lang}
          />
        </div>
      ) : (
        <></>
      )}
      {hintText ? (
        <div className="row">
          <div className="col-lg-2"></div>
          <div className="col-lg-10">
            <p className="small-font new-line-compatible">{hintText}</p>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
