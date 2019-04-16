$(function () {
    //questionDataExtract object is used to extract next question in the queue, get correct answer, get user answer and get the count of correct answers.

    let questionDataExtract = {
        questionId: 1,//this value will be incremented by 1 every time the answer status is shown and the user clicks next button and will be reset back to 1 when quiz finishes
        GetQuestion: function () {
            return questionList[this.questionId - 1]
        },
        CorrectAnswer: function () {
            return answers[this.questionId - 1];
        },
        UserAnswer: function () {
            return userAnswers.CurrentAnswer;
        },
        TotalQuestions: function () {
            return questionList.length;
        },
        CorrectAnsCount: 0//this value is incremented every time the user selects the correct answer.

    }

    const questionList = [
        {
            number: 1,
            text: `What country has the second largest population in the world ?`,
            choice1: 'India',
            choice2: 'Russia',
            choice3: 'United States',
            choice4: 'Australia',
        },

        {
            number: 2,
            text: `What country has a maple leaf on its national flag ?`,
            choice1: 'Brasil',
            choice2: 'Luxembourg',
            choice3: 'Canada',
            choice4: 'France',
        },

        {
            number: 3,
            text: `What country is home to the Great Barrier Reef ?`,
            choice1: 'Chile',
            choice2: 'Madagascar',
            choice3: 'Cuba',
            choice4: 'Australia',
        },

        {
            number: 4,
            text: `What country was the first to land a man on the moon ?`,
            choice1: 'Great Britain',
            choice2: 'Russia',
            choice3: 'United States of America',
            choice4: 'Germany',
        },

        {
            number: 5,
            text: `What is the largest country by size and population in South America ?`,
            choice1: 'Chile',
            choice2: 'Brasil',
            choice3: 'Venezuela',
            choice4: 'Colombia',
        },

        {
            number: 6,
            text: `The Kiwi is a flightless bird that lives in what country ?`,
            choice1: 'Mexico',
            choice2: 'Spain',
            choice3: 'China',
            choice4: 'New Zealand',
        },

        {
            number: 7,
            text: `Zurich is the largest city in what country ?`,
            choice1: 'Sweden',
            choice2: 'Denmark',
            choice3: 'Switzerland',
            choice4: 'Holland',
        },

        {
            number: 8,
            text: `In terms of land area, what is the largest country in the world ?`,
            choice1: 'United States',
            choice2: 'Russia',
            choice3: 'Australia',
            choice4: 'Iceland',
        },

        {
            number: 9,
            text: `Mt. Fuji is the highest mountain in what country ?`,
            choice1: 'American Samoa',
            choice2: 'China',
            choice3: 'Japan',
            choice4: 'Fiji',
        },

        {
            number: 10,
            text: `Leonardo da Vinci was born in what country ?`,
            choice1: 'Italy',
            choice2: 'Monaco',
            choice3: 'Belgium',
            choice4: 'Turkey',
        }]

    const answers = [
        'India',
        'Canada',
        'Australia',
        'United States of America',
        'Brasil',
        'New Zealand',
        'Switzerland',
        'Russia',
        'Japan',
        'Italy',
    ];

    let userAnswers = {

        CurrentAnswer: ""//this property of object is used to hold the answer selected by the user
    }






    //Handle click event for Next Button
    $('.view-0').on('click', '.nxtBtn', function (evt) {
        //console.log('Next Button Clicked');
        evt.preventDefault();
        userAnswers['CurrentAnswer'] = "";
        questionDataExtract.questionId = questionDataExtract.questionId + 1;
        if ((Number(questionDataExtract.questionId) - 1) >= Number(questionDataExtract.TotalQuestions())) {
            //end of the quiz occurred show final score page
            LoadFinalPage();
        }
        else {

            LoadQuestion();
        }

    });

    $('.sQuizBtn').click(function (event) {
        event.preventDefault();
        LoadQuestion();
    });

    $('.view-0').on('click', '#js-submit-button', function (event) {
        event.preventDefault();
        SendFeedback();
    });

    $('.view-0').on('click', 'input[type="radio"]', function () {
        //console.log('radio btn checked' + $(this).val());
        userAnswers['CurrentAnswer'] = $(this).val();
    });

    $('.view-0').on('click', '.btnStartAgain', function () {
        userAnswers['CurrentAnswer'] = "";
        questionDataExtract.questionId = 1;
        questionDataExtract.CorrectAnsCount = 0;
        LoadQuestion();
    });

    function SendFeedback() {
        try {
            //this function is responsible of sending the feedback to the quiz app user on whether the answer is correct or not.
            let rightAnswer = questionDataExtract.CorrectAnswer();
            let userAnswer = questionDataExtract.UserAnswer();
            let cntCorrectAns = questionDataExtract.CorrectAnsCount;
            let currentQuestionId = questionDataExtract.questionId;
            if(userAnswer===null || userAnswer==="")
            {
                userAnswer = GetDefaultRadioBtnVal();
            }
            if (rightAnswer === userAnswer) {
                //show the correct answer page

                questionDataExtract.CorrectAnsCount = questionDataExtract.CorrectAnsCount + 1;
                cntCorrectAns = questionDataExtract.CorrectAnsCount;
                LoadCorrectAnsView(cntCorrectAns, currentQuestionId);

            }
            else {
                //show wrong answer page
                LoadWrongAnsView(rightAnswer, cntCorrectAns, currentQuestionId);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    function GetDefaultRadioBtnVal()
    {
        let radios = document.getElementsByName('option');
        for(var i=0; i< radios.length;i++)
        {
            if(radios[i].type==="radio" && radios[i].checked===true)
            {
                //console.log(`Default Checkbox Value : ${$(radios[i]).attr('value')}`);
                return $(radios[i]).attr('value');
                
            }
        }
    }

    function LoadQuestion() 
    {
        let Question = questionDataExtract.GetQuestion().text;
        let opt1 = questionDataExtract.GetQuestion().choice1;
        let opt2 = questionDataExtract.GetQuestion().choice2;
        let opt3 = questionDataExtract.GetQuestion().choice3;
        let opt4 = questionDataExtract.GetQuestion().choice4;

        let questionView = `<section id="question-page" role="main">
        <div id="status-bar">
          <span id="question-count">Question: ${questionDataExtract.questionId} of ${questionDataExtract.TotalQuestions()}</span>
          </div>
    <h2 class="question">${Question}</h2>
    <form>
      <div class="form-field">
      
          <input class="answer" type="radio" name="option" value = "${opt1}">
         <label>${opt1}</label><br/><br/><br/>
        
          <input class="answer" type="radio" name="option" value = "${opt2}" checked>
          <label>${opt2}</label><br/><br/><br/>
          
          <input class="answer" type="radio" name="option" value = "${opt3}">
          <label>${opt3}</label><br/><br/><br/>
         
          <input class="answer" type="radio" name="option" value = "${opt4}">
          <label>${opt4}</label><br/><br/>
          </div>
          <br/><br/>
          <button id="js-submit-button">Submit</button>
        
        </form>
        </section>`

        $('.view-0').html(questionView);

    }






    function LoadWrongAnsView(rightAns, cntCorrect, questionNbr) {
        let wrongAnsView = `<div class="resultContainer">
        <div class="scoreCard">
            <div class = "scoreHeader">Score</div>
            <div class="score">${cntCorrect}/${questionNbr}</div>
        </div>
        <div class="resultIconFail">
        <img src="VerySadFace.png" alt="N/A" class="responsivePt">
        </div>
        <div class="ansStatus">Your Answer Is Incorrect </div><br/>
        <div class="ansStatus">Right Answer : ${rightAns} </div>
        <button class ="nxtBtn">Next</button> 
        </div>`
        $('.view-0').html(wrongAnsView);
    }

    function LoadCorrectAnsView(cntCorrect, questionNbr) {
        
        let rightAnsView = `<div class="resultContainer">
        <div class="scoreCard">
            <div class = "scoreHeader">Score</div>
            <div class="score">${cntCorrect}/${questionNbr}</div>
        </div>
        <div class="resultIconSuccess">
        <img src="SmilingFace.png" alt="N/A" class="responsivePt">
        </div>
        <div class="ansStatus">Your Answer Is Correct </div>
        <button class ="nxtBtn">Next</button>
       </div>`
        $('.view-0').html(rightAnsView);
    }

    function LoadFinalPage() {
        let cntCorrectAns = questionDataExtract.CorrectAnsCount;
        let cntTotalQuestions = questionDataExtract.TotalQuestions();
        let finalPageView = `<div role="finalPage">
        <h2>Final Score : ${cntCorrectAns}/${cntTotalQuestions}</h2>
        <br><br>
        
        <button class="btnStartAgain">Start Again ?</button>
    </div>`;
        $('.view-0').html(finalPageView);
    }



});








