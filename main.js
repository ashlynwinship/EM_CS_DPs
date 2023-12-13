PennController.ResetPrefix(null)

Sequence("consent", "background", "intro-training", "training", "transition", rshuffle("experimental-trial", "filler"), "feedback", "end")

// Welcome and consent form
newTrial("consent",
    defaultText
        .center()
        .print()
    ,
    newText('consent-1', 'Thank you very much for your participation!')
    ,
    newText('consent-2', '<p> This experiment is part of a Cornell University scientific research project. Your decision to participate is completely voluntary. There is no way for us to identify you. The only information we will have, in addition to your responses, is the time at which you completed the survey. The results of the research may be presented at scientific meetings or published in scientific journals.')
    ,
    newText('consent-3', '<p> Clicking on the button below indicates that you are at least 18 years of age and agree to complete this experiment voluntarily.')
    ,
    newButton("continue", "Continue")
        .center()
        .size(200, 30)
        .print()
        .wait()
) 

//Participant background
newTrial("background",
    defaultText
        .center()
        .print()
    ,
    newText("bg-intro", "First, we will collect some background information from you. As a reminder, you will remain completely anonymous.")
    ,
    newText("age", "<p>Please type your age below, as a number.")
    ,
    newTextInput("age-input")
        .center()
        .print()
        .log()
    ,
    newButton("continue", "Continue")
        .center()
        .size(200, 30)
        .print()
        .wait()
    ,
    newText("bilingual", "<p>Do you identify as a bilingual Spanish-English speaker?")
    ,
    newText(" "),
    newText("y", "Yes"),
    newText(" "),
    newText("n", "No"),
    newText(" "),
    newSelector("BL-selector")
    .add(getText("y"), getText("n"))
    .once()
    .wait()
    .log()
    ,
    newText("BL-profile", "<p>Please briefly describe your language background below. At what age did you learn Spanish? English? Where do you speak each language - for example, at home, at school?")
    ,
    newTextInput("BL-profile-input")
        .size(500,200)
        .center()
        .print()
        .log()
    ,
    newButton("continue", "Continue")
        .center()
        .size(200, 30)
        .print()
        .wait()
    ,
    newText("Sp-dialect", "<p>Please provide the dialect of Spanish that you speak.")
    ,
    newTextInput("Sp-dialect-input")
        .size(500,50)
        .center()
        .print()
        .log()
    ,
    newButton("continue", "Continue")
        .center()
        .size(200, 30)
        .print()
        .wait()
    ,
    newText("Eng-dialect", "<p>Please provide the dialect of English that you speak.")
    ,
    newTextInput("Eng-dialect-input")
        .size(500,50)
        .center()
        .print()
        .log()
    ,
    newButton("continue", "Continue")
        .center()
        .size(200, 30)
        .print()
        .wait()
  
)

//Introduce training questions
newTrial("intro-training",
    defaultText
        .center()
        .print()
    ,
    newText("instructions-1", "<p>Before the experiment begins, you will answer some training questions."),
    newText("instructions-2", "<p>You will see a sentence on the screen with a blank. Click on the answer below that best fills in the blank."),
    newText("instructions-3", "<p>Some sentences may have two blanks. The answer choices for these will each contain two words, separated by commas. The first word will fill in the first blank, and the second word will fill in the second blank."),
    newText("instructions-4", "<p>Sentences may contain a mixture of both English and Spanish. Choose the answer that fits best."),
    newButton("continue", "Continue")
        .center()
        .size(200, 30)
        .print()
        .wait()
)

//Training questions
Template("CS_training.csv", row =>
    newTrial("training",
        defaultText
        .center()
        .print()
        ,
         newController("Question", {q: row.test, as: [row.choice1, row.choice2], hasCorrect: true, randomOrder: true})
        .center()
        .print()
        .wait()
        .log()
    )
)

//Transition to experiment
newTrial("transition",
    defaultText
    .center()
    .print()
    ,
    newText("transition-1", "<p>The practice is over, and now the experiment will begin."),
    newText("transition-3", "<p>Click the button below to continue."),
    newButton("continue", "Continue")
        .center()
        .size(200, 30)
        .print()
        .wait()
)

//Fillers
Template("CS_fillers.csv", row =>
    newTrial("filler",
        defaultText
            .center()
            .print()
        ,
        newController("Question", {q: row.test, as: [row.choice1, row.choice2], randomOrder: true})
        .center()
        .print()
        .wait()
        .log()
    )    
    .log("filler_item", row.item)
    .log("filler_type", row.type)
    .log("filler_sentence", row.test)
)

//Experiment
Template("CS_test_items.csv", row =>
    newTrial("experimental-trial",
        defaultText
        .center()
        .print()
    ,
    newController("Question", {q: row.test, as: [row.choiceF, row.choiceM], hasCorrect: true, randomOrder: true})
    .center()
    .print()
    .wait()
    .log()
    )
    .log("target_group", row.group)
    .log("target_item", row.item)
    .log("target_type", row.type)
    .log("target_fem_sentence", row.sentenceF)
    .log("target_choiceM", row.choiceM)
    .log("target_choiceF", row.choiceF)
    .log("target_adj", row.adj)
    .log("target_noun", row.noun)
)

//Feedback
newTrial("feedback",
    defaultText
    .center()
    .print()
    ,
    newText("feedback-prompt", "<p>Please leave any feeback you may have about the survey in the box below.")
    ,
    newTextInput("feedback-input")
        .size(500,200)
        .center()
        .log()
        .print()
    ,
    newButton("continue", "Continue")
        .center()
        .size(200, 30)
        .print()
        .wait()
)

//Completion Screen
newTrial("end",
    newText("Thank you for participation! You may now exit this window.")
        .center()
        .print()
)
