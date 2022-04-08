//$(selector).action()
$(document).ready(function(){
    
    $(".startButton").click(function(){
        
        $(".startButtonText").html( $(".startButton").html() );
        $(".startButton").html("");
        $(".startButtonText").fadeOut({duration:1000, queue:false});
        $(".startButton").fadeOut({duration:1000, queue:false});
        $(".startButtonText").animate({"font-size": "150px"}, 1000);
        this.disabled = true;
    });
    
});

/*function gameContent() {
    
}*/

