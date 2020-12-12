var catNames = [];

/* sets all elems of className to background colors specified in class list
   # elems must = # colors in list */
function setColors(className, colorList) {
  $(className).each(function(ind) {
    $(this).css("background-color", colorList[ind]);
    console.log(ind + " " + colorList[ind] + "\n");
  });
}

function endTimer() {
    $("#timer").hide();
    $("#menu").show();
    var alarm = $("#alarmSound")[0];
    alarm.currentTime = 0;
    playAlarm();
}

var alarmRepFn;
function playAlarm() {
    alarmRepFn = window.setInterval(function() {
        console.log("starting");
        $("#alarmSound")[0].play();
    }, 100); //length of audio
}
function pauseAlarm() {
    $("#alarmSound")[0].pause();
    window.clearInterval(alarmRepFn);
} 
    

$().ready(function(){
    var classes = [];
    
    //console.log("test");
    var catColors = ["#390099", "#9e0059", "#ff0054", "#ff5400", "#ffbd00"];
    setColors(".cat", catColors);
    setColors(".proc-form .input-group-text", catColors);
    console.log(test);
    
    //$(".setters, .play").hide();
    setColors("#menu .cat", catColors);
    
    function checkValid() {
        var result = true;
        $("#setup .form-control").each(function() {
           if($(this).val().length == 0) {
             result = false; 
           }                       
        });
        return result;
    }
          
    function setCatNames() {
      console.log("submitted");
      // input validation
      if(!checkValid()) return false;
        
      //add names to list
      $("#setup input.form-control").each(function(ind) {
        catNames[ind] = $(this).val();  
      });
        
      // label menu buttons
      $("#menu .cat").each(function(ind) {
        $(this).text(catNames[ind]);               
      });
        
      $("#setup select").each(function(ind) {
        //console.log(parseInt($(this).find("option:selected").text()));
        classes.push(parseInt($(this).find("option:selected").text()));
      });
      // move to menu
      $("#setup").hide();
      $("#menu").show();
    }
    
    // bind submit button, enter key
    $("#start").click(setCatNames);
    $("#setup .form-control").keyup(function(event) {
        if (event.which === 13) {
          event.preventDefault();
          setCatNames();
        }
  });
    
    //disable pause/play of alarm (F10 key)
//    $("html").keyup(function(event) {
//        if(event.which == 179) {
//            console.log("prevented pause");
//            //$("#alarmSound")[0].play();
//            playAlarm();
//        }
//    })
    
    // set up timer when menu clicked
    $("#menu .btn").click(function() {
      if($(this).text() == "Break") { 
        if($(this).css("background-color") == $("#timer h1").css("color")) {
          console.log("break already pressed"); return;   
        }
      }
//      $("#alarmSound")[0].pause();
      pauseAlarm();
      var color = $(this).css("background-color");
      setTimer(color);
      $("#timer h1").css("color", color);    
      $("#timer h1").text($(this).text());
        
      // move to timer    
      $("#menu").hide();
      $("#timer").show();
      wholeTime = 60 * classes[$("#menu .btn").index(this)];
      $("#pause").click(); // starts timer
    });
    
    // set timer color to class
    function setTimer(color) {
        $(".display-remain-time").css("color", color);
        $(".e-c-progress").css("stroke", color);
    }
});

