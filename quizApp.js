$(function () {
    //questionDataExtract object is used to extract next question in the queue, get correct answer, get user answer and get the count of correct answers.

    const questionDataExtract = {
        questionId: 1,//this value will be incremented by 1 every time the answer status is shown and the user clicks next button and will be reset back to 1 when quiz finishes
        GetQuestion: function () {
            return questionList[this.questionId - 1]
        },
        CorrectAnswer = function () {
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
            text: `What country has the second largest population in the world?`,
            choice1: 'India',
            choice2: 'Russia',
            choice3: 'United States',
            choice4: 'Australia',
        },

        {
            number: 2,
            text: `What country has a maple leaf on its national flag?`,
            choice1: 'Brasil',
            choice2: 'Luxembourg',
            choice3: 'Canada',
            choice4: 'France',
        },

        {
            number: 3,
            text: `What country is home to the Great Barrier Reef?`,
            choice1: 'Chile',
            choice2: 'Madagascar',
            choice3: 'Cuba',
            choice4: 'Australia',
        },

        {
            number: 4,
            text: `What country was the first to land a man on the moon?`,
            choice1: 'Great Britain',
            choice2: 'Russia',
            choice3: 'United States',
            choice4: 'Germany',
        },

        {
            number: 5,
            text: `What is the largest country by size and population in South America?`,
            choice1: 'Chile',
            choice2: 'Brasil',
            choice3: 'Venezuela',
            choice4: 'Colombia',
        },

        {
            number: 6,
            text: `The Kiwi is a flightless bird that lives in what country?`,
            choice1: 'Mexico',
            choice2: 'Spain',
            choice3: 'China',
            choice4: 'New Zealand',
        },

        {
            number: 7,
            text: `Zurich is the largest city in what country`,
            choice1: 'Sweden',
            choice2: 'Denmark',
            choice3: 'Switzerland',
            choice4: 'Holland',
        },

        {
            number: 8,
            text: `In terms of land area, what is the largest country in the world?`,
            choice1: 'United States',
            choice2: 'Russia',
            choice3: 'Australia',
            choice4: 'Iceland',
        },

        {
            number: 9,
            text: `Mt. Fuji is the highest mountain in what country?`,
            choice1: 'American Samoa',
            choice2: 'China',
            choice3: 'Japan',
            choice4: 'Fiji',
        },

        {
            number: 10,
            text: `Leonardo da Vinci was born in what country?`,
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

    const userAnswers = {

        CorrectAnswer: ""//this property of object is used to hold the answer selected by the user
    }
    //const welcomePage = ``
const questionPageView = `<section id="question-page" role="main">
<h2 id="question">${questionDataExtract.GetQuestion().text}</h2>

<form>
  <fieldset>
    <label>
      <input class="answer" type="radio" name="option" checked></input>
      <span>${questionDataExtract.GetQuestion().choice1}</span>
    </label>

    <label>
      <input class="answer" type="radio" name="option"></input>
      <span>${questionDataExtract.GetQuestion().choice2}</span>
    </label>

    <label>
      <input class="answer" type="radio" name="option"></input>
      <span>${questionDataExtract.GetQuestion().choice3}</span>
    </label>

    <label>
      <input class="answer" type="radio" name="option"></input>
      <span>${questionDataExtract.GetQuestion().choice4}</span>
    </label>
  </fieldset>  
  <button id="js-submit-button">Submit</button>

</form>

<div id="status-bar">
  <span id="question-count">Question: ${questionDataExtract.questionId} of ${questionDataExtract.TotalQuestions}</span>
  </div>
</section>`
    
    const wrongAnsView = `<div>WRONG!</div>
      <div>Right Answer : <span class="rAns">${questionDataExtract.CorrectAnswer()}</span></div>
      <button class="nxtBtn">Next</button>
      <div>Score:<span class="currScore">${questionDataExtract.CorrectAnsCount}/${questionDataExtract.questionId}</span></div>`

    const rightAnsView = `<div>CORRECT!</div>
      <div><img src="thumbsUp.png"></div>
      <button class="nxtBtn">Next</button>
      <div>Score:<span class="currScore">${questionDataExtract.CorrectAnsCount}/${questionDataExtract.questionId}</span></div>`


    function SendFeedback() {
        try {
            //this function is responsible of sending the feedback to the quiz app user on whether the answer is correct or not.


            if (questionDataExtract.CorrectAnswer() === questionDataExtract.UserAnswer()) {
                //show the correct answer page
                $('.view-0').html(rightAnsView);
                questionDataExtract.CorrectAnsCount = questionDataExtract.CorrectAnsCount + 1;

            }
            else {
                //show wrong answer page
                $('.view-0').html(wrongAnsView);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    //Handle click event for Next Button
    $('body').on('click', '.nxtBtn', function () {

        questionDataExtract.questionId = questionDataExtract.questionId + 1;
        if (questionDataExtract.questionId === questionDataExtract.TotalQuestions) {
            //end of the quiz occurred show final score page
        }
        else {
            //go back to the question page
        }
    });

});




// A function that listens for button clicks and submits its ID to the decideView()

// A function that on form submit checks for if the answer is correct
    // then submits the view and any extra IDs to the decideView()

// A function that decides which view to change to
    // 1st arg = current view

// A function that checks the view num and updates the button text
    // Make an object with the possible texts

// A function that renders

// <!-- View 1 for starting Page -->

// // <div class="view0">
// //     <div id='welcomePicture'>
// //         <img src="https://longdonclub.co.uk/wp/wp-content/uploads/2017/12/Quiz@Kvarteret-e1518802228786.png"
// //             alt='Unable to Load Image'></img>
// //     </div>
// {/* <button id="quizBtn">Start Quiz</button> */}
// // </div>

// // /* <!-- View 2 for Question Page --> */
// //         <div class="view2" role="QuestionPage">
// //             <div class="questionPanel">

// //             </div>
// //             <div class="answerPanel">

// //             </div>
// {/* <button id="quizBtn">Start Quiz</button> */}
// //         </div>

// // /* <!-- View 3 for Response Page --> */
// //         <div class="view3" role="ResponsePage">
// //             <div class="responsePanel">

// //             </div>
// //             <div class="correctAnsPanel">
//https://www.google.com/search?q=thumbs+up&rlz=1C1CHBF_enUS842US842&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjNue3K4rfhAhUFnKwKHeLsAkUQ_AUIDigB&biw=1707&bih=778&dpr=1.5#imgrc=RQajt-rDHysSWM:
// //             </div>
// {/* <button id="quizBtn">Start Quiz</button> */}
// //         </div>
