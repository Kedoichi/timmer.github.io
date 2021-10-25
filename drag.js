const dragElements = document.querySelectorAll("#drag");
containerW = $(".container").outerWidth();
containerH = $(".container").outerHeight();

dragElements.forEach((dragElement) => {
  var mouseX = 0,
    mouseY = 0,
    moveXby = 0,
    moveYby = 0;
  var RightEdge, LeftEdge, TopEdge, BottomEdge;

  if (document.getElementById(dragElement.id + "header")) {
    document.getElementById(dragElement.id + "header").onmousedown =
      dragMouseDown;
  } else {
    dragElement.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    mouseX = e.clientX;
    mouseY = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }
  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    moveXby = e.clientX - mouseX;
    moveYby = e.clientY - mouseY;
    mouseX = e.clientX;
    mouseY = e.clientY;

    RightEdge = dragElement.offsetLeft + dragElement.offsetWidth + moveXby;
    LeftEdge = dragElement.offsetLeft + moveXby;

    BottomEdge = dragElement.offsetTop + dragElement.offsetHeight + moveYby;
    TopEdge = dragElement.offsetTop + moveYby;

    if (RightEdge <= containerW && LeftEdge >= 0)
      dragElement.style.left = dragElement.offsetLeft + moveXby + "px";
    if (BottomEdge <= containerH && TopEdge >= 0)
      dragElement.style.top = dragElement.offsetTop + moveYby + "px";

    if (e.clientX < 0) dragElement.style.left = 0 + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
});
