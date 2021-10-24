//<i class='bx bxs-quote-single-right'></i>

$(document).ready(function () {
  //init

  let pause = true;
  let Pomodoro = 1200;
  let Break = 300;
  let mode = "1";

  //section click changes
  $(".section div").click(function () {
    $(".section div").removeClass("actived");
    $(this).addClass("actived");
    mode = $(this).prop("id");
    reset();
  });
  $(".reset").click(reset);
  $(".start").click(function () {
    if (pause) {
      pause = false;
      mode == "1" ? startTimer(Pomodoro) : startTimer(Break);
      $(".start").text("Pause");
    } else {
      pause = true;
      stopTimer();
      $(".start").text("Start");
    }
  });

  $(".switch").click(function () {
    if ($(".time").hasClass("hide")) {
      $(".time").removeClass("hide");
      $(".setting").addClass("hide");
    } else {
      $(".setting").removeClass("hide");
      $(".time").addClass("hide");
    }
  });

  function startTimer(totalSeconds) {
    interval = setInterval(() => {
      if (pause) stopTimer();
      else {
        totalSeconds--;
        updateOverview(sliptime(totalSeconds));
      }

      if (totalSeconds <= 0) {
        stopTimer();
      }
    }, 1000);
  }
  function updateOverview([min, sec]) {
    let newtime = "";
    min > 0 ? (newtime = newtime + `${min}:`) : (newtime = newtime + "00");
    sec > 0 ? (newtime = newtime + `${sec}`) : (newtime = newtime + "00");
    $(".time").text(newtime);
  }
  function sliptime(input) {
    let min = Math.floor(input / 60) % 60;
    let sec = Math.floor(input) % 60;
    return [min, sec];
  }
  function stopTimer() {
    interval = clearInterval(interval);
  }

  function reset() {
    pause = true;
    $(".start").text("Start");
    mode == "1"
      ? $(".time").text(updateOverview(sliptime(Pomodoro)))
      : $(".time").text(updateOverview(sliptime(Break)));
  }
});
