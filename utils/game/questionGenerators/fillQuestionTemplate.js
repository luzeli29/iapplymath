import fillTextTags from "@utils/text/fillTextTags"
import createGameQuestion from "../createGameQuestion"

export default function fillQuestionTemplate(template,tags) {
    const questionText = template.questionText
    const answer = tags.answer
    const questionFormatKey = template.questionFormatKey

    //FIXME: THIS IS TERRIBLE, I KNOW...
    const hintsObj = JSON.parse(JSON.stringify(template.hints));
    const hints = Object.values(hintsObj)

    hints.map((hint,index) => {
            hints[index].en = fillTextTags(hint.en,tags)
            hints[index].es = fillTextTags(hint.es,tags)
    }
    )

    const question = createGameQuestion(
        {
            en: fillTextTags(questionText.en,tags),
            es: fillTextTags(questionText.es,tags),
        },
        answer,
        hints,
        questionFormatKey

    )
    return question
}
