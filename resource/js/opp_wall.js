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

function drop(ev) {
  ev.preventDefault();
	ev.stopPropagation();
	var cell = document.createElement('div')
	var brick = document.getElementById(ev.dataTransfer.getData("dragging"));
	var source_cell = brick.parentElement;
	var source_row = source_cell.parentElement;
	var row = ev.target.parentElement;
	//put the data into a new cell
	cell.classList.add('cell');
	cell.appendChild(brick);
	//replace the target when dropping
	if (ev.target.classList.contains("cell-default") || ev.target.classList.contains('cell_Temp')) {
		$(ev.target).replaceWith(cell);
	}
	// add a blank brick into the source cell
	if(source_cell.classList.contains('cell')){
		// rearrange the original row
		if (3 < source_row.getElementsByClassName("cell").length + source_row.getElementsByClassName("cell-default").length){
		var blank = document.createElement("div");
		source_cell.appendChild(blank);
		blank.classList.add("brickOriginal-Blank");
		}
	}else if (source_cell.classList.contains('row_Temp_ListItem')){
		//modified style
		brick.getElementsByClassName('brickOriginal')[0].style.width = '100%';
	 	brick.getElementsByClassName('brickOriginal')[0].style.height = '100%';
		//delete the empty list element
		source_cell.remove();
	}
	//source cell transfer to default one and link to colorbox effect
	source_cell.className = 'cell-default';
	set_Colorbox_celldefault(source_cell);
}

function drop_toTemp(ev){
	 ev.preventDefault();ev.stopPropagation();
	 var brick = document.getElementById(ev.dataTransfer.getData("dragging"));
	 var source_cell = brick.parentElement;
	 var source_row = source_cell.parentElement;
	 //check source, forbidden temp row to temp row
	 if(source_cell.classList.contains('row_Temp_ListItem')){
		 return false;
	 }else if(source_cell.classList.contains('cell')){
		//create a new list element and append the drag data
		var li = document.createElement('li');
		li.classList.add('row_Temp_ListItem');
		li.appendChild(brick);
		//lock width and height
		brick.getElementsByClassName('brickOriginal')[0].style.width = '280px';
		brick.getElementsByClassName('brickOriginal')[0].style.height = '128px';
		//add brick into the temp row
		document.getElementsByClassName('row_Temp_List')[0].insertBefore(li, document.getElementsByClassName('row_Temp_List')[0].childNodes[0]);
		//manage source row
	 	if (3 < source_row.getElementsByClassName("cell").length + source_row.getElementsByClassName("cell-default").length){
			var blank = document.createElement("div");
			source_cell.appendChild(blank);
			blank.classList.add("brickOriginal-Blank");
	 	}
		source_cell.className = 'cell-default';
		set_Colorbox_celldefault(source_cell);
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

function rowSubmit(rowId, rowCode){
  axios.post('/rowupdate', {
    "rowId": rowId,
		"rowCode": rowCode
  })
  .then(
    function(res){
      console.log(res.data);
    }
  );
}

/*
function initialize(){
    document.addEventListener('drop', function(ev){
		if(ev.target.parentElement.classList.contains('row')){
			drop(ev);
		}else if(ev.target.classList.contains('row_Temp_List')){
			drop_toTemp(ev);
		}else if(ev.target.parentElement.classList.contains('brickOriginal')){
			drop_toTemp(ev);
		}
	});
    document.addEventListener('dragover', dragover_handler);
    document.addEventListener('dragleave', dragleave_handler);
	document.getElementById('main_text').addEventListener('paste', add_Title);
}

window.onload = initialize;*/
