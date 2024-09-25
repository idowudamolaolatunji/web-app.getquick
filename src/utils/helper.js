import moment from "moment";

export function todayDate() {
	return moment().format("dddd, MMMM D, YYYY");
}

export function getGreeting() {
	const currentTime = moment().hours();
	if (currentTime < 12) {
		return "Good morning";
	} else if (currentTime < 16) {
		return "Good afternoon";
	} else {
		return "Good evening";
	}
}
