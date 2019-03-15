var x1 = 0,
    y1 = 0,
    x2 = 0,
    y2 = 0;

export default function draggifyDiv(element) {
    element.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        x2 = e.clientX;
        y2 = e.clientY;
        document.onmouseup = closeDragEvent;
        document.onmousemove = elementDrag;
    }

    function closeDragEvent(e) {
        document.onmouseup = null;
        document.onmousemove = null;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        x1 = x2 - e.clientX;
        y1 = y2 - e.clientY;
        x2 = e.clientX;
        y2 = e.clientY;
        element.style.top = element.offsetTop - y1 + 'px';
        element.style.left = element.offsetLeft - x1 + 'px';
    }
}
