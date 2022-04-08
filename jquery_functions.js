//$(selector).action()
$(document).ready(function(){
    
    $(".startButton").click(startButtonAnimation);

    $.get("https://opentdb.com/api.php?amount=1&type=multiple", function(data){
        //alert("Data: " + JSON.stringify(data.results));
        data.results.forEach(result => {
            //alert(JSON.stringify(result));
            
            var answers = result.incorrect_answers;
            answers.push(result.correct_answer);
            shuffleArray(answers);
            //$(".question").html(answers);
            for (let i = 0; i < answers.length; i++) {
                $(".multipleChoice").append("<div class='multiAnswer" + i + "'>" + answers[i] + "</div>");
                if (answers[i] == result.correct_answer){
                    $(".multiAnswer" + i).css("color","green");
                }
            }
        });

        
        }
    );
});


function startButtonAnimation(){
    $(".startButtonText").html( $(".startButton").html() );
        $(".startButton").html("");
        $(".startButtonText").fadeOut({duration:1000, queue:false});
        $(".startButton").fadeOut({duration:1000, queue:false});
        $(".startButtonText").animate({"font-size": "150px"}, 1000);
        this.disabled = true;
}
/*function gameContent() {
    
}*/

// copied from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

