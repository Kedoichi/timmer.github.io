//<i class='bx bxs-quote-single-right'></i>

$(document).ready(function () {
  //section click changes
  $(".section div").click(function () {
    $(".section div").removeClass("actived");
    $(this).addClass("actived");
  });
  let pause = true;
  $(".start").click(function () {
    if (pause) {
      pause = false;
      startTimer(3000);
      $(".start").text("Pause");
    } else {
      pause = true;
      stopTimer();
      $(".start").text("Start");
    }
  });

  function formattime(totalSeconds) {
    let hour = Math.floor(totalSeconds / 3600) % 24;
    let min = Math.floor(totalSeconds / 60) % 60;
    const sec = Math.floor(totalSeconds) % 60;
    return [hour, min, sec];
  }
  function startTimer(totalSeconds) {
    interval = setInterval(() => {
      console.log(pause);
      if (pause) return;
      totalSeconds--;
      $(".time").text(updateInputs(formattime(totalSeconds)));

      if (totalSeconds <= 0) {
        stopTimer();
      }
    }, 1000);
  }
  function updateInputs(Input) {
    let newtime = "";
    Input[0] > 0 ? (newtime = newtime + `${Input[0]}:`) : (newtime = newtime);
    Input[1] > 0 ? (newtime = newtime + `${Input[1]}:`) : (newtime = newtime);
    Input[2] > 0 ? (newtime = newtime + `${Input[2]}`) : (newtime = newtime);
    console.log(newtime);
    return newtime;
  }

  function stopTimer() {
    interval = clearInterval(interval);
  }
});
