function videoCard(obj) {
	let newLi = document.createElement('video-card');
	newLi.innerHTML =
		'<img src=' + obj['snippet']['thumbnails']['medium']['url'] + '>' +
		'<div class="wrapper"> <a  class="title" href=' + 'https://www.youtube.com/watch?v=' + obj['id']['videoId'] + '>' + obj['snippet']['title'] + '</a>' +
		'<p class="published"><i class="fa fa-calendar" aria-hidden="true"></i>' + obj['snippet']['publishedAt'] + '</p>' +
		'<p class="channelTitle"> <i class="fa fa-child" aria-hidden="true"></i>' + obj['snippet']['channelTitle'] + '</p>' +
		'<p class="video' + obj["id"]["videoId"] + '"></p>' +
		'<p class="desc">' + obj['snippet']['description'] + '</p>' +
		'</div>';
	viewCount(obj);
	return newLi;
}
function viewCount(obj) {
	let id = obj.id.videoId;
	if (obj.views && document.querySelector('p.video' + id)) {
		document.querySelector('p.video' + id).innerHTML = '<i class="fa fa-eye" aria-hidden="true"></i>' + obj.views;
	} else {
		let url = 'https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&id=' + id + '&part=snippet,statistics';
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

const videoCardProto = Object.create(HTMLElement.prototype);

document.registerElement("video-card", {
	prototype: videoCardProto
});
export default videoCard;