const getQuestions = (order) => {
    return {
        basic: {
            lvl1: [
                {
                    en: "",
                    es: "",
                    answer: "",
                    hints: '',
                    type: '',
                    onAnswer: '',
                    imgSrc: ''
                },
            ],
            lvl2: [],
            lvl3: [],
        },
        multiply: {
            lvl1: [],
            lvl2: [],
            lvl3: [],
        },
        multiMultiply: {
        lvl1: [],
        lvl2: [],
        lvl3: [],
        },
        graph: {
        lvl1: [],
        lvl2: [],
        lvl3: [],
        },
    };
};

export default getQuestions;
