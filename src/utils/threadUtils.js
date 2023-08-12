import { formatDistanceToNow } from "date-fns";

let lastLabel = "";

const groupThreads = (messages) => {
	return messages.reduce((threads, message) => {
		message.date = parseInt(message.date);

		const threadId = message.threadId;

		if (!threads[threadId]) {
			threads[threadId] = [];
		}

		threads[threadId].push(message);

		return threads;
	}, {});
};

const sortThreads = (threads) => {
	const sortedThreads = Object.values(threads).sort((a, b) => {
		const latestMessageA = new Date(a[a.length - 1].date);
		const latestMessageB = new Date(b[b.length - 1].date);
		return latestMessageB - latestMessageA;
	});
	return sortedThreads;
};

const getThreadLabel = (date) => {
	const messageDate = new Date(date);
	const currentDate = new Date();
	let label = "";

	if (
		messageDate.getDate() === currentDate.getDate() &&
		messageDate.getMonth() === currentDate.getMonth() &&
		messageDate.getFullYear() === currentDate.getFullYear()
	) {
		label = "Today";
	} else if (
		messageDate.getDate() === currentDate.getDate() - 1 &&
		messageDate.getMonth() === currentDate.getMonth() &&
		messageDate.getFullYear() === currentDate.getFullYear()
	) {
		label = "Yesterday";
	} else {
		label = formatDistanceToNow(messageDate, { addSuffix: true });
	}

	if (lastLabel === label) {
		return "";
	}

	lastLabel = label;
	return label;
};

export { groupThreads, sortThreads, getThreadLabel };
