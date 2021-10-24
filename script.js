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
    //change overview display base on selection
    mode == "1"
      ? $(".time").text(initForm(sliptime(Pomodoro)))
      : $(".time").text(initForm(sliptime(Break)));
  });

  //reset & start btn function
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

  //btn switch
  $(".switch").click(function () {
    mode == "1"
      ? $(".time").text(initForm(sliptime(Pomodoro)))
      : $(".time").text(initForm(sliptime(Break)));
    if ($(".time").hasClass("hide")) {
      //exit setting panel
      $(".time").removeClass("hide");
      $(".setting").addClass("hide");
      reset();
    } else {
      //view setting panel
      $(".setting").removeClass("hide");
      $(".time").addClass("hide");
    }
  });

  //listen change on input
  //limit 1 letter only by empty form each keydown
  $(".setting input").keydown(function () {
    $(this).val("");
  });
  //max min and sex is 59
  $(".setting .m1 input").keyup(function () {
    if ($(this).val() > 5) $(this).val("5");
  });
  $(".setting .s1 input").keyup(function () {
    if ($(this).val() > 5) $(this).val("5");
  });

  //change value of time base on current selection
  $(".setting input").keyup(function () {
    mode == "1" ? (Pomodoro = getinput()) : (Break = getinput());
  });
  //control button
  $(".setting i").click(function () {
    let obj = $(this).parent().attr("class");
    btnClickAction($(this).attr("class").split(" ")[2], obj);
    if ($(`${obj} input`) == "m1" || $(`${obj} input`) == "s1") {
      $(`${obj} input`).val("5");
    }
    if (obj == "m1" || obj == "s1") {
      if ($(`.${obj} input`).val() > 5) {
        $(`.${obj} input`).val(5);
      }
      if ($(`.${obj} input`).val() < 0) {
        $(`.${obj} input`).val(0);
      }
    } else {
      if ($(`.${obj} input`).val() > 9) {
        $(`.${obj} input`).val(9);
      }
      if ($(`.${obj} input`).val() < 0) {
        $(`.${obj} input`).val(0);
      }
    }
    mode == "1" ? (Pomodoro = getinput()) : (Break = getinput());
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
    min = Number(min);
    sec = Number(sec);
    min > 0
      ? (newtime = newtime + ("0" + min).slice(-2) + ":")
      : (newtime = newtime + "00");
    sec > 0
      ? (newtime = newtime + ("0" + sec).slice(-2))
      : (newtime = newtime + "00");
    $(".time").text(newtime);
  }
  function sliptime(input) {
    let min = Math.floor(input / 60) % 60;
    let sec = Math.floor(input) % 60;
    return [("0" + min).slice(-2), ("0" + sec).slice(-2)];
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
  function initForm([min, sec]) {
    $(".m1 input").val(min.split("")[0]);
    $(".m2 input").val(min.split("")[1]);
    $(".s1 input").val(sec.split("")[0]);
    $(".s2 input").val(sec.split("")[1]);
  }

  function getinput() {
    min = 10 * Number($(".m1 input").val()) + Number($(".m2 input").val());
    sec = 10 * Number($(".s1 input").val()) + Number($(".s2 input").val());
    let totalSeconds = 60 * min + sec;
    return totalSeconds;
  }

  function btnClickAction(action, obj) {
    let value = $(`.${obj} input`).val();
    if (action == "up") value++;
    else value--;
    $(`.${obj} input`).val(value);
  }
});
