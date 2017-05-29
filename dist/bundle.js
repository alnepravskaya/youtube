/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _searchBar = __webpack_require__(2);

var _searchBar2 = _interopRequireDefault(_searchBar);

var _pagingBar = __webpack_require__(1);

var _pagingBar2 = _interopRequireDefault(_pagingBar);

var _videoCardBox = __webpack_require__(4);

var _videoCardBox2 = _interopRequireDefault(_videoCardBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var numPage = 1;

var search = (0, _searchBar2.default)();
search.addEventListener('search', function () {
	paging.changeCurrentPage(1);
	videos.length = 0;
	videoCarBoxing.clear();
	init(search.getValue());
});

var paging = (0, _pagingBar2.default)();
paging.addEventListener('clickNext', function () {
	clickNext(search.getValue());
});
paging.addEventListener('clickPrev', function () {
	clickPrev(search.getValue());
});

var videoCarBoxing = (0, _videoCardBox2.default)();
document.body.appendChild(search);
document.body.appendChild(paging);
document.body.appendChild(videoCarBoxing);

var countVideoCard = 5;
var urlnext = void 0;
var urlprev = void 0;
var url = void 0;
var videos = [];

function init(thema) {
	url = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&type=video&part=snippet&maxResults=15&q=' + thema;
	fetch(url, {
		method: 'get'
	}).then(function (obj) {
		return obj.json();
	}).then(function (c) {
		if (search.getValue().length > 0) {
			urlnext = url + '&pageToken=' + c['nextPageToken'];
			getCountVideoCard();
			paging.setPageCount(Math.floor(c['pageInfo']['totalResults'] / countVideoCard));
			paging.setCardCount(Math.floor(c['pageInfo']['totalResults']));
			for (var i = 0; i < c['items'].length; i++) {
				videos[videos.length] = c['items'][i];
			}
			videoCarBoxing.createVideoCard(videos, paging.getCurrentPage(), countVideoCard);
			document.querySelector('paging-bar ').classList.add("visible");
		}
	});
}
var lastChangeTime = +new Date();
var a = void 0;
window.addEventListener('resize', function () {
	a = setTimeout(function () {
		var numElem = countVideoCard * (paging.getCurrentPage() - 1) + 1;
		var elements = paging.getCardCount() * countVideoCard;
		getCountVideoCard();
		if (paging.getCurrentPage() != 1) {
			paging.changeCurrentPage(numElem / countVideoCard);
		}
		paging.setPageCount(elements / countVideoCard);
		videoCarBoxing.createVideoCard(videos, paging.getCurrentPage(), countVideoCard);
	}, 300);
	if (+new Date() - lastChangeTime < 300) {
		clearTimeout(a);
	}
	lastChangeTime = +new Date();
});

function getCountVideoCard() {
	if (window.innerWidth > 1750) {
		countVideoCard = 5;
	} else if (window.innerWidth > 1600) {
		countVideoCard = 4;
	} else if (window.innerWidth > 1280) {
		countVideoCard = 3;
	} else if (window.innerWidth > 720) {
		countVideoCard = 2;
	} else if (window.innerWidth <= 720) {
		countVideoCard = 1;
	}
}
function clickNext(thema) {
	url = urlnext;
	var urlNe = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&type=video&part=snippet&maxResults=15&q=' + thema;
	fetch(url, {
		method: 'get'
	}).then(function (obj) {
		return obj.json();
	}).then(function (c) {

		if (numPage <= paging.getPageCount() && search.getValue().length > 0) {
			urlnext = urlNe + '&pageToken=' + (c['nextPageToken'] ? c['nextPageToken'] : '');
			urlprev = urlNe + '&pageToken=' + c['prevPageToken'];
			videoCarBoxing.createVideoCard(videos, paging.getCurrentPage(), countVideoCard);
			for (var i = 0; i < c['items'].length; i++) {
				videos[videos.length] = c['items'][i];
			}
		}
	});
}
function clickPrev(thema) {
	var url = urlprev;
	var urlNe = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&type=video&part=snippet&maxResults=' + countVideoCard + '&q=' + thema;
	if (paging.getPageCount() > 1) {
		fetch(url, {
			method: 'get'
		}).then(function (obj) {
			return obj.json();
		}).then(function (c) {
			if (numPage < paging.getPageCount() && search.getValue().length > 0) {
				urlnext = urlNe + '&pageToken=' + c['nextPageToken'];
				urlprev = urlNe + '&pageToken=' + (c['prevPageToken'] ? c['prevPageToken'] : '');
				videoCarBoxing.createVideoCard(videos, paging.getCurrentPage(), countVideoCard);
			}
		});
	}
}

var touchstartX = 0;
var touchstartY = 0;
var touchendX = 0;
var touchendY = 0;

var gesuredZone = document.body;

gesuredZone.addEventListener('mousedown', function (e) {
	touchstartX = e.screenX;
	touchstartY = e.screenY;
}, false);

gesuredZone.addEventListener('mouseup', function (e) {
	touchendX = e.screenX;
	touchendY = e.screenY;

	handleGesure();
}, false);

gesuredZone.addEventListener('touchstart', function (e) {
	touchstartX = e.changedTouches[0].clientX;
	// console.log('ts', e);
}, false);

gesuredZone.addEventListener('touchend', function (e) {
	touchendX = e.changedTouches[0].clientX;
	//console.log('te', e);
	handleGesure();
}, false);
function handleGesure() {

	if (touchendX - touchstartX > 50) {
		console.log(touchendX, touchstartX, 'prev');

		clickPrev(search.getValue());
		var num = paging.getCurrentPage();
		num = num > 1 ? num - 1 : num;
		paging.changeCurrentPage(num);
		clickPrev(search.getValue());
	}

	if (touchstartX - touchendX > 50) {
		console.log(touchendX, touchstartX, 'next');

		var _num = paging.getCurrentPage();
		_num = ++_num;
		paging.changeCurrentPage(_num);
		clickNext(search.getValue());
	}
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
function pagingBar() {
	var element = document.createElement('paging-bar');

	element.querySelector('button.next').onclick = function () {
		if (currentPage > 1) {
			element.querySelector('button.prev').removeAttribute('disabled');
		} else if (currentPage > pageCount) {
			element.querySelector('button.next').setAttribute('disabled', '');
		} else {
			element.querySelector('button.prev').setAttribute('disabled', '');
		}
		currentPage++;
		element.dispatchEvent(new Event('clickNext'));
	};
	element.querySelector('button.prev').onclick = function () {
		currentPage--;
		if (currentPage < 2) {
			element.querySelector('button.prev').setAttribute('disabled', '');
		} else if (currentPage < pageCount) {
			element.querySelector('button.next').removeAttribute('disabled');
		} else {
			element.querySelector('button.prev').removeAttribute('disabled');
		}

		element.dispatchEvent(new Event('clickPrev'));
	};

	element.querySelector('button.asterisk').addEventListener('mousedown', function () {
		element.querySelector('button.asterisk').innerHTML = currentPage;
		element.dispatchEvent(new Event('mousedownAsterisk'));
	});

	element.querySelector('button.asterisk').onmouseup = function () {
		element.querySelector('button.asterisk').innerHTML = '*';
	};
	element.querySelector('button.asterisk').addEventListener('touchstart', function () {
		element.querySelector('button.asterisk').innerHTML = currentPage;
		element.dispatchEvent(new Event('mousedownAsterisk'));
	});
	element.querySelector('button.asterisk').addEventListener('touchend', function () {
		element.querySelector('button.asterisk').innerHTML = '*';
	});

	return element;
}
var pagingBarProto = Object.create(HTMLElement.prototype);
pagingBarProto.createdCallback = function () {
	this.innerHTML = '<button class="prev" disabled>prev</button>' + '<button class="asterisk">*</button>' + '<button class="next" disabled>next</button>';
};
pagingBarProto.getValue = function () {
	return this.querySelector('button.acterics').value;
};

pagingBarProto.setPageCount = function (a) {
	pageCount = Math.floor(a);
	if (pageCount > 1) {
		this.querySelector('button.next').removeAttribute('disabled');
	}
};
pagingBarProto.setCardCount = function (a) {
	pageCount = Math.floor(a);
};
pagingBarProto.getCardCount = function () {
	return pageCount;
};
pagingBarProto.getPageCount = function () {
	return pageCount;
};
pagingBarProto.getCurrentPage = function () {
	return currentPage;
};
pagingBarProto.changeCurrentPage = function (num) {
	currentPage = Math.ceil(num);
};

document.registerElement("paging-bar", {
	prototype: pagingBarProto
});
var currentPage = 1;
var pageCount = 0;
exports.default = pagingBar;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
function searchBar() {
	var element = document.createElement('search-bar');
	var lastChangeTime = +new Date();
	var a = void 0;
	element.querySelector('input').onkeyup = function () {
		a = setTimeout(function () {
			element.dispatchEvent(new Event('search'));
		}, 300);
		if (+new Date() - lastChangeTime < 300) {
			clearTimeout(a);
		}
		lastChangeTime = +new Date();
	};

	return element;
}
var searchBarProto = Object.create(HTMLElement.prototype);
searchBarProto.createdCallback = function () {
	this.innerHTML = '<input>';
};
searchBarProto.getValue = function () {
	return this.querySelector('input').value;
};
document.registerElement("search-bar", {
	prototype: searchBarProto
});
exports.default = searchBar;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
function videoCard(obj) {
	var newLi = document.createElement('video-card');
	newLi.innerHTML = '<img src=' + obj['snippet']['thumbnails']['medium']['url'] + '>' + '<div class="wrapper"> <a  class="title" href=' + 'https://www.youtube.com/watch?v=' + obj['id']['videoId'] + '>' + obj['snippet']['title'] + '</a>' + '<p class="published"><i class="fa fa-calendar" aria-hidden="true"></i>' + obj['snippet']['publishedAt'] + '</p>' + '<p class="channelTitle"> <i class="fa fa-child" aria-hidden="true"></i>' + obj['snippet']['channelTitle'] + '</p>' + '<p class="video' + obj["id"]["videoId"] + '"></p>' + '<p class="desc">' + obj['snippet']['description'] + '</p>' + '</div>';
	viewCount(obj);
	return newLi;
}
function viewCount(obj) {
	var id = obj.id.videoId;
	if (obj.views && document.querySelector('p.video' + id)) {
		document.querySelector('p.video' + id).innerHTML = '<i class="fa fa-eye" aria-hidden="true"></i>' + obj.views;
	} else {
		var url = 'https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&id=' + id + '&part=snippet,statistics';
		fetch(url, {
			method: 'get'
		}).then(function (o) {
			return o.json();
		}).then(function (c) {
			if (document.querySelector('p.video' + id)) {
				obj.views = c.items[0].statistics.viewCount;
				document.querySelector('p.video' + id).innerHTML = '<i class="fa fa-eye" aria-hidden="true"></i>' + c.items[0].statistics.viewCount;
			}
		});
	}
}

var videoCardProto = Object.create(HTMLElement.prototype);

document.registerElement("video-card", {
	prototype: videoCardProto
});
exports.default = videoCard;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _videoCard = __webpack_require__(3);

var _videoCard2 = _interopRequireDefault(_videoCard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function videoCardBox() {
	var element = document.createElement('video-cardBox');
	return element;
}
var videoCardBoxProto = Object.create(HTMLElement.prototype);

videoCardBoxProto.createVideoCard = function (videos, page, countVideoCard) {
	this.innerHTML = '';
	for (var i = page * countVideoCard - countVideoCard; i < page * countVideoCard; i++) {
		this.appendChild((0, _videoCard2.default)(videos[i]));
	}
};
videoCardBoxProto.clear = function () {
	this.innerHTML = '';
};

document.registerElement("video-cardBox", {
	prototype: videoCardBoxProto
});

exports.default = videoCardBox;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(0);
module.exports = __webpack_require__(0);


/***/ })
/******/ ]);