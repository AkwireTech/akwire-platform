const aiPolicy = {

    maxConversationMessages: 20,

    maxUserMessageLength: 4000,

    defaultMode: "lesson",

    allowedModes: [

        "lesson",

        "lab",

        "exam",

        "career",

        "interview",

        "course-builder",

        "admin"

    ],

    generateConversationTitle: true,

    maxConversationTitleLength: 60

};

export default aiPolicy;