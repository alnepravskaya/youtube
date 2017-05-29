function pagingBar() {
	let element = document.createElement('paging-bar');

	element.querySelector('button.next').onclick = ()=> {
		if (currentPage > 1) {
			element.querySelector('button.prev').removeAttribute('disabled');
		} else if (currentPage > pageCount) {
			element.querySelector('button.next').setAttribute('disabled', '');
		}
		else {
			element.querySelector('button.prev').setAttribute('disabled', '');
		}
		currentPage++;
		element.dispatchEvent(new Event('clickNext'));
	};
	element.querySelector('button.prev').onclick = ()=> {
		currentPage--;
		if (currentPage < 2) {
			element.querySelector('button.prev').setAttribute('disabled', '')
		} else if (currentPage < pageCount) {
			element.querySelector('button.next').removeAttribute('disabled')
		}
		else {
			element.querySelector('button.prev').removeAttribute('disabled')
		}

		element.dispatchEvent(new Event('clickPrev'));
	};


	element.querySelector('button.asterisk').addEventListener('mousedown',function () {
		element.querySelector('button.asterisk').innerHTML = currentPage;
		element.dispatchEvent(new Event('mousedownAsterisk'));
	});

	element.querySelector('button.asterisk').onmouseup = function () {
		element.querySelector('button.asterisk').innerHTML = '*'
	};
	element.querySelector('button.asterisk').addEventListener('touchstart',function () {
		element.querySelector('button.asterisk').innerHTML = currentPage;
		element.dispatchEvent(new Event('mousedownAsterisk'));
	});
	element.querySelector('button.asterisk').addEventListener('touchend',function () {
		element.querySelector('button.asterisk').innerHTML = '*'
	});

	return element;
}
const pagingBarProto = Object.create(HTMLElement.prototype);
pagingBarProto.createdCallback = function () {
	this.innerHTML = '<button class="prev" disabled>prev</button>' +
		'<button class="asterisk">*</button>' +
		'<button class="next" disabled>next</button>';
};
pagingBarProto.getValue = function () {
	return this.querySelector('button.acterics').value
}

pagingBarProto.setPageCount = function (a) {
	pageCount = Math.floor(a);
	if (pageCount > 1) {
		this.querySelector('button.next').removeAttribute('disabled')
	}

}
pagingBarProto.setCardCount = function (a) {
	pageCount = Math.floor(a);
}
pagingBarProto.getCardCount = function () {
	return pageCount;
}
pagingBarProto.getPageCount = function () {
	return pageCount;
}
pagingBarProto.getCurrentPage = function () {
	return currentPage;
}
pagingBarProto.changeCurrentPage = function (num) {
	currentPage = Math.ceil(num);
}


document.registerElement("paging-bar", {
	prototype: pagingBarProto
});
let currentPage = 1;
let pageCount = 0;
export default pagingBar;
