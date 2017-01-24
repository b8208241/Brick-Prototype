function drag(ev) {
    //target the <a> tag which wrapping the "brick"<div>
	ev.dataTransfer.setData("dragging", ev.target.parentElement.id);
}

function dragleave_handler(ev) {
    ev.preventDefault();
	if (ev.target.classList.contains("dragover")){
    ev.target.classList.remove("dragover");
	};
	if(ev.target.classList.contains('cell_Temp')){
		var row = ev.target.parentElement;
		row.removeChild(ev.target.previousSibling);
		row.removeChild(ev.target);
	}
}

function dragover_handler(ev) {
    ev.preventDefault();
    if (ev.target.classList.contains("placeholder")){
		var row = ev.target.parentElement;
		var newCell = document.createElement('div');
		var newPlaceholder = document.createElement('div');
		newCell.className = 'cell_Temp';
		newPlaceholder.className = 'placeholder';
		row.insertBefore(newCell, ev.target);
		row.insertBefore(newPlaceholder, newCell);
    }
	else if (ev.target.classList.contains("cell-default")){
        ev.target.classList.add("dragover");
	}
}

function add_Title(event){
	var html = event.clipboardData.getData('text/html');
	document.getElementById('pasteHtml').innerHTML = html;
	var string = document.getElementById('pasteHtml').value;
	var stringUppercase = string.toUpperCase();
	var positionStart = stringUppercase.search(/<title>/i);
	var positionEnd = stringUppercase.search('</TITLE>');
	var title = string.slice(positionStart+7,positionEnd);
	document.getElementById('ref').innerHTML = title;
}

function cellDelete_colorbox(event){
	//for IE environment
	var ev = event || window.event;
	var target = ev.target || ev.srcElement;
	var brickId = target.parentElement.getAttribute('id')
	//starting locking the one should be replaced
	cellDelete_replace(brickId);
}

function cellDelete_replace(brickId){
	let targetCell = document.getElementById(brickId).parentElement.parentElement;
	let cellDefault = document.createElement('div');
	cellDefault.classList.add('cell-default');
	$(targetCell).replaceWith(cellDefault);
	set_Colorbox_celldefault(cellDefault);
	let cellDefaultParent = cellDefault.parentElement;
	let cellDefaultParentId = cellDefaultParent.getAttribute('id');
	rowSubmit(cellDefaultParentId, cellDefaultParent.innerHTML);
}
