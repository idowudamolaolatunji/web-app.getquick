import moment from "moment";


export function formatNumber(amount) {
	return Number(amount).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

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



export function openWidget() {
	FreshworksWidget('open');
}
export function closeWidget() {
	FreshworksWidget('close');
}