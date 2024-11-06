export const accessLocalStorage = (key: string) => {
	if (typeof window !== "undefined") {
		const item = localStorage.getItem(key);
		return item ? JSON.parse(item) : null;
	}

	return null;
};

export const setLocalStorage = (key: string, value: string) => {
	localStorage.setItem(key, value);
};

export const removeLocalStorage = (key: string) => {
	localStorage.removeItem(key);
};

export const clearLocalStorage = () => {
	localStorage.clear();
};
