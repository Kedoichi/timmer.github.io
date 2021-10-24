maxW = $(".container").outerWidth();
maxH = $(".container").outerHeight();

const dragElementss = document.querySelectorAll("#drag");
dragElementss.forEach((dragElement) => {
  MaxXMove = maxW - $("#drag").outerWidth() / 2;
  MaxYMove = maxH - $("#drag").outerHeight() / 2;
  MinXMove = 0 + $("#drag").outerWidth() / 2;
  MinYMove = 0 + $("#drag").outerHeight() / 2;

  if (document.getElementById(dragElement.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(dragElement.id + "header").onmousedown =
      dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    dragElement.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }
  function elementDrag(e) {
    if (e.clientY > MaxYMove) dragElement.style.top = MaxYMove + "px";
    else dragElement.style.top = e.clientY + "px";
    if (e.clientX > MaxXMove) dragElement.style.left = MaxXMove + "px";
    else dragElement.style.left = e.clientX + "px";

    if (e.clientY < MinYMove) dragElement.style.top = MinYMove + "px";
    if (e.clientX < MinXMove) dragElement.style.left = MinXMove + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
});
