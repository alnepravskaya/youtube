function searchBar() {
	let element = document.createElement('search-bar');
	let lastChangeTime=+(new Date());
	let a;
	element.querySelector('input').onkeyup = ()=> {
		a = setTimeout(()=> {
			element.dispatchEvent(new Event('search'));
		}, 300);
		if (+(new Date()) - lastChangeTime < 300) {
			clearTimeout(a);
		}
		 lastChangeTime = +(new Date());
	};

	return element;
}
const searchBarProto = Object.create(HTMLElement.prototype);
searchBarProto.createdCallback = function () {
	this.innerHTML = '<input>';
};
searchBarProto.getValue = function () {
	return this.querySelector('input').value
}
document.registerElement("search-bar", {
	prototype: searchBarProto
});
export default searchBar;