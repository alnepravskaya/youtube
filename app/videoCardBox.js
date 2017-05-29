import videoCard from "./videoCard";
function videoCardBox() {
	let element = document.createElement('video-cardBox');
	return element;
}
const videoCardBoxProto = Object.create(HTMLElement.prototype);

videoCardBoxProto.createVideoCard = function (videos, page,countVideoCard) {
	this.innerHTML = '';
	for (var i = page*countVideoCard-countVideoCard; i < page*countVideoCard; i++) {
		this.appendChild(videoCard(videos[i]));
	}
}
videoCardBoxProto.clear = function () {
	this.innerHTML = '';
	
}

document.registerElement("video-cardBox", {
	prototype: videoCardBoxProto
});

export default videoCardBox;
