import searchBar from "./searchBar";
import pagingBar from "./pagingBar";
import videoCarBox from "./videoCardBox";


let numPage = 1;

const search = searchBar();
search.addEventListener('search', ()=> {
	paging.changeCurrentPage(1);
	videos.length = 0;
	videoCarBoxing.clear();
	init(search.getValue());
});

const paging = pagingBar();
paging.addEventListener('clickNext', ()=> {
	clickNext(search.getValue());
});
paging.addEventListener('clickPrev', ()=> {
	clickPrev(search.getValue());
});

const videoCarBoxing = videoCarBox();
document.body.appendChild(search);
document.body.appendChild(paging);
document.body.appendChild(videoCarBoxing);


let countVideoCard = 5;
let urlnext;
let urlprev;
let url;
let videos = [];

function init(thema) {
	url = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&type=video&part=snippet&maxResults=15&q=' + thema;
	fetch(url, {
		method: 'get'
	}).then(function (obj) {
		return obj.json();
	}).then(function (c) {
		if ((search.getValue()).length > 0) {
			urlnext = url + '&pageToken=' + c['nextPageToken'];
			getCountVideoCard();
			paging.setPageCount(Math.floor(c['pageInfo']['totalResults'] / countVideoCard));
			paging.setCardCount(Math.floor(c['pageInfo']['totalResults']));
			for (var i = 0; i < c['items'].length; i++) {
				videos[videos.length] = c['items'][i];
			}
			videoCarBoxing.createVideoCard(videos, paging.getCurrentPage(), countVideoCard);
			document.querySelector('paging-bar ').classList.add("visible")
		}
	});

}
let lastChangeTime = +(new Date());
let a;
window.addEventListener('resize', ()=> {
	a = setTimeout(()=> {
		let numElem = countVideoCard * (paging.getCurrentPage() - 1) + 1;
		let elements = paging.getCardCount() * countVideoCard;
		getCountVideoCard();
		if (paging.getCurrentPage() != 1) {
			paging.changeCurrentPage(numElem / countVideoCard);
		}
		paging.setPageCount(elements / countVideoCard);
		videoCarBoxing.createVideoCard(videos, paging.getCurrentPage(), countVideoCard);
	}, 300);
	if (+(new Date()) - lastChangeTime < 300) {
		clearTimeout(a);
	}
	lastChangeTime = +(new Date());


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
	let urlNe = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&type=video&part=snippet&maxResults=15&q=' + thema;
	fetch(url, {
		method: 'get'
	}).then(function (obj) {
		return obj.json();
	}).then(function (c) {

		if (numPage <= paging.getPageCount() && (search.getValue()).length > 0) {
			urlnext = urlNe + '&pageToken=' + (c['nextPageToken'] ? c['nextPageToken'] : '');
			urlprev = urlNe + '&pageToken=' + c['prevPageToken'];
			videoCarBoxing.createVideoCard(videos, paging.getCurrentPage(), countVideoCard);
			for (var i = 0; i < c['items'].length; i++) {
				videos[videos.length] = c['items'][i];
			}
		}
	})

}
function clickPrev(thema) {
	let url = urlprev;
	let urlNe = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&type=video&part=snippet&maxResults=' + countVideoCard + '&q=' + thema;
	if (paging.getPageCount() > 1) {
		fetch(url, {
			method: 'get'
		}).then(function (obj) {
			return obj.json();
		}).then(function (c) {
			if (numPage < paging.getPageCount() && (search.getValue()).length > 0) {
				urlnext = urlNe + '&pageToken=' + c['nextPageToken'];
				urlprev = urlNe + '&pageToken=' + (c['prevPageToken'] ? c['prevPageToken'] : '');
				videoCarBoxing.createVideoCard(videos, paging.getCurrentPage(), countVideoCard);
			}
		})
	}

}

let touchstartX = 0;
let touchstartY = 0;
let touchendX = 0;
let touchendY = 0;

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
		let num = paging.getCurrentPage();
		num = num > 1 ? num-1 : num;
		paging.changeCurrentPage(num);
		clickPrev(search.getValue());
	}

	if (touchstartX - touchendX > 50) {
		console.log(touchendX, touchstartX, 'next');

		let num = paging.getCurrentPage();
		num = ++num;
		paging.changeCurrentPage(num);
		clickNext(search.getValue());


	}
}




