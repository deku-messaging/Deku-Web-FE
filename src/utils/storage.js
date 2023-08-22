const STORAGE_KEY = "DEKU-WEB-SESSION";

const storage = {
	getAllStorage() {
		return (
			JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
				from_session_id: null,
				data: null,
			}
		);
	},

	setStorage(key, value) {
		const allStorage = this.getAllStorage();
		allStorage[key] = value;
		localStorage.setItem(STORAGE_KEY, JSON.stringify(allStorage));
	},

	getFromStorage(key) {
		return this.getAllStorage()[key];
	},

	removeFromStorage(key) {
		const allStorage = this.getAllStorage();
		delete allStorage[key];
		localStorage.setItem(STORAGE_KEY, JSON.stringify(allStorage));
	},
};

export default storage;
