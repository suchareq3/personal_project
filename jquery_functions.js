//$(selector).action()
$(document).ready(function(){
    $(".startButton").click(function(){
        callAPI();
        startButtonAnimation();
    });

    /*$.get("https://opentdb.com/api.php?amount=1&type=multiple", function(data){
        data.results.forEach(result => {
            var answers = result.incorrect_answers;
            answers.push(result.correct_answer);
            shuffleArray(answers);
            for (let i = 0; i < answers.length; i++) {
                $(".multipleChoice").append("<div class='multiAnswer" + i + "'>" + answers[i] + "</div>");
                if (answers[i] == result.correct_answer){
                    $(".multiAnswer" + i.css("color","green"));
                }
            }
        });
        }
    );*/
});



function callAPI(){
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

    //alert(APIurl);

    $.get(APIurl, function(data){
        alert(JSON.stringify(data));
    });
}


function startButtonAnimation(){
    $(".startButtonText").html( $(".startButton").html() );
    $(".startButton").html("");
    $(".startButtonText").fadeOut({duration:1000, queue:false});
    $(".startButton").fadeOut({duration:1000, queue:false});
    $(".startButtonText").animate({"font-size": "150px"}, 1000);
    this.disabled = true;
}

function showGameContent(){
    
}

// copied from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

