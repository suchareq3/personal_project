var questionIndex = 0;
var points = 0;

$(document).ready(function(){
    $(".startButton").click(function(){
        startButtonAnimation();
        var APIurl = buildAPICall();
        //add function ON THIS LINE to SHOW hidden loading screen/gif
        $.get(APIurl, function(APIdata){
            //add function ON THIS LINE to HIDE shown loading screen/gif
            var maxQuestions = APIdata.results.length;
            $(".points").html("0/" + maxQuestions);
            showGameContent(APIdata, maxQuestions);
        });
    });
});



function startButtonAnimation(){
    $(".startButtonText").html( $(".startButton").html() );
    $(".startButton").html("");
    $(".startButtonText").fadeOut({duration:1000, queue:false});
    $(".startButton").fadeOut({duration:1000, queue:false});
    $(".startButtonText").animate({"font-size": "150px"}, 1000);
    this.disabled = true;
}

function buildAPICall(){
    let APIurl = "https://opentdb.com/api.php?";
    $('.selectChoice').map(function(){
        if(this.value){
            APIurl = APIurl.concat(this.name + "=" + this.value + "&");
        }
    });

    let radioValue = $('input[name="type"]:checked').val();
    if (radioValue){
        let radioName = $('input[name="type"]:checked').attr('name');
        APIurl = APIurl.concat(radioName + "=" + radioValue);
    } else {
        APIurl = APIurl.slice(0, -1);
    }
    return APIurl;
}

function showGameContent(APIdata, maxQuestions){
    if (questionIndex == maxQuestions){
        //TODO: make this fancy
        $(".skipQuestion").html("You've reached the end! You have: " + points + " points out of " + maxQuestions + ".");
    } else {
        const currentResult = APIdata.results[questionIndex];
        let answers = currentResult.incorrect_answers;
        answers.push(currentResult.correct_answer);
        shuffleArray(answers);
        $(".question").html(currentResult.question);

        for (let j = 0; j < answers.length; j++) {
            const element = answers[j];
            $(".answers").append("<button class='answerButton'>" + answers[j] + "</button>");
        }

        $(".answerButton").click(function(){
            if (this.innerHTML == currentResult.correct_answer) {
                points++;
                //add fancy 'correct' screen here for a short time (timeout)
            } else {
                //add fancy 'incorrect' screen here for a short time (timeout)
            }
            $(".points").html(points + "/" + maxQuestions);
            $(".answers").html("");
            if (questionIndex < APIdata.results.length) {
                questionIndex += 1;
                showGameContent(APIdata, maxQuestions);
            }
        });
    }
}

// copied from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

