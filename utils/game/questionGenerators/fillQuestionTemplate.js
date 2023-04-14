import fillTextTags from "@utils/text/fillTextTags"
import createGameQuestion from "../createGameQuestion"

export default function fillQuestionTemplate(template,tags) {
    const questionText = template.questionText
    const answer = tags.answer
    template.hints.map((hint,index) => {
        template.hints[index].en = fillTextTags(hint.en,tags)
        template.hints[index].es = fillTextTags(hint.es,tags)
    }
    )

    return createGameQuestion(
        {
            en: fillTextTags(questionText.en,tags),
            es: fillTextTags(questionText.es,tags),
        },
        answer,
        template.hints,

    )
}
