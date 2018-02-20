
const mouseUp = (e) => {
    //props.handleDragStart(props.id);
    if (dragItem.temp !== undefined) {
        dragItem.temp.rollback.apply(dragItem);
        //item.remove();
    }
    dragItem = {};
};
const mouseMove = (e) => {
    if (dragItem.item === undefined)
        return;
    else {
        if (dragItem.temp === undefined) {
            let moveX = e.pageX - dragItem.downX;
            let moveY = e.pageY - dragItem.downY;
            if (Math.abs(moveX) < 3 && Math.abs(moveY) < 3) {
                return false;
            }
            dragItem.temp = createDrag(e);
            if (!dragItem.temp) {
                dragItem = undefined;
                return;
            }
            var coords = getCoords(dragItem.temp);
            dragItem.shiftX = dragItem.downX - coords.left;
            dragItem.shiftY = dragItem.downY - coords.top;

            startDrag(e); // отобразить начало переноса
        }
        //console.log(dragItem);
//            console.log(e.pageX - dragItem.shiftX);
        dragItem.temp.style.left = e.pageX - dragItem.shiftX + 'px';
        dragItem.temp.style.top = e.pageY - dragItem.shiftY + 'px';
        let it = findDroppable(e);
        console.log(it);
        return false;
    }
}
const startDrag = (e) => {
    item = dragItem.temp;
    // инициировать начало переноса
    let width = item.offsetWidth;
    document.body.appendChild(item);
    item.style.width = width + "px";
    item.classList.add("draggable_item-drag");

}
const createDrag = (e) => {
    // запомнить старые свойства, чтобы вернуться к ним при отмене переноса
    let temp = dragItem.item;
    let old = {
        parent: temp.parentNode,
        nextSibling: temp.nextSibling,
        position: temp.position || '',
        left: temp.left || '',
        top: temp.top || ''
    };

    // функция для отмены переноса
    temp.rollback = function () {
        temp.classList.remove("draggable_item-drag");
        temp.style.width = "";
        old.parent.insertBefore(item, old.nextSibling);
        temp.style.left = old.left;
        temp.style.top = old.top;
        temp.style.zIndex = old.zIndex
    };
    return temp;
}
const findDroppable = (e) => {

    // взять элемент на данных координатах
    var elem = document.elementFromPoint(e.clientX, e.clientY);

    // найти ближайший сверху droppable
    return elem;
}

const getCoords = (elem) => {
    //var box = elem.getBoundingClientRect();
    return {
        top: elem.offsetTop + window.pageYOffset,
        left: elem.offsetLeft + window.pageXOffset
    };
}; const mouseDown = (e) => {
    props.setActiveItem(props.children.props);
    //props.handleDragStart(props.id);
    /*   dragItem = {
           downX: e.pageX,
           downY: e.pageY,
           item: e.target.parentNode
       };*/
    return false;
};