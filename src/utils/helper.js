import moment from "moment";

export function formatNumber(amount) {
	return Number(amount)
		.toFixed(0)
		.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function todayDate() {
	return moment().format("dddd, MMMM D, YYYY");
}

const currentTime = moment().hours();
export function getGreeting() {
	if (currentTime < 12) {
		return "Good morning";
	} else if (currentTime < 16) {
		return "Good afternoon";
	} else {
		return "Good evening";
	}
}

export function getExpression() {
	if (currentTime < 12) {
		return "🌞";
	} else if (currentTime < 16) {
		return "👋🏿";
	} else {
		return "🌙";
	}
}

export function openWidget() {
	FreshworksWidget("open");
}
export function closeWidget() {
	FreshworksWidget("close");
}

export function formatDate(givenDate) {
	const currentDate = moment().startOf("day");
	const inputDate = moment(givenDate);

	const diffInSeconds = moment().diff(inputDate, "seconds");
	if (diffInSeconds === 0) {
		return "Just now";
	}
	if (diffInSeconds < 60) {
		return `${diffInSeconds} secs ago`;
	}

	const diffInMins = moment().diff(inputDate, "minutes");
	if (diffInMins < 60) {
		return `${diffInMins} mins. ago`;
	}

	if (inputDate.isSame(currentDate, "day")) {
		return `Today, ${inputDate.format("h:mm A")}`;
	} else if (inputDate.isSame(currentDate.clone().subtract(1, "day"), "day")) {
		return `Yesterday, ${inputDate.format("h:mm A")}`;
	} else if (inputDate.isSame(currentDate.clone().subtract(2, "day"), "day")) {
		return `Two days ago, ${inputDate.format("h:mm A")}`;
	} else {
		const diffInDays = moment().diff(inputDate, "days");
		if (diffInDays < 7) {
			return `Last ${inputDate.format("dddd")}, at ${inputDate.format("h:mm A")}`;
		} else if (diffInDays < 14) {
			return `Last week, ${inputDate.format("dddd")}, at ${inputDate.format("h:mm A")}`;
		} else if (diffInDays < 21) {
			return `2 weeks ago, ${inputDate.format("dddd")}, at ${inputDate.format("h:mm A")}`;
		} else if (diffInDays < 30) {
			return `3 weeks ago, ${inputDate.format("dddd")}, at ${inputDate.format("h:mm A")}`;
		} else {
			const diffInMonths = moment().diff(inputDate, "months");
			if (diffInMonths < 12) {
				return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
			} else {
				const day = inputDate.date();
				const suffix = day === 1 || day === 21 || day === 31 ? "st" : day === 2 || day === 22 ? "nd" : day === 3 || day === 23 ? "rd" : "th";
				return `on ${inputDate.format("MMM Do") + suffix + ", " + inputDate.format("YYYY")}`;
			}
		}
	}
}

export function capitalizeFirstLetter(string) {
	return string.slice(0, 1).toUpperCase() + string.slice(1);
}

export function validateForm(data, type) {
	const errors = {};

	if (type === "login") {
		if (!data.email.trim()) {
			errors.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(data.email)) {
			errors.email = "Email is invalid";
		}

		if (!data.password) {
			errors.password = "Password is required";
		} else if (data.password.length < 8) {
			errors.password = "Password must be at least 8 characters long";
		}

		return errors;
	}

	if (type === "signup") {
		if (!data.firstname.trim()) {
			errors.firstname = "Firstname is required";
		} else if (data.firstname.length < 3) {
			errors.firstname = "Firstname must be at least 3 characters long";
		}
		if (!data.lastname.trim()) {
			errors.lastname = "Lastname is required";
		} else if (data.lastname.length < 3) {
			errors.lastname = "Lastname must be at least 3 characters long";
		}

		if (!data.email.trim()) {
			errors.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(data.email)) {
			errors.email = "Email is invalid";
		}

		if (!data.phone.trim()) {
			console.log(data.phone);
			errors.phone = "Phone number is required";
		} else if (data.phone.length < 13) {
			errors.phone = `Phone number must have 10 numbers after +${data.phone.slice(0, 3)}`;
		}

		if (!data.password) {
			errors.password = "Password is required";
		} else if (data.password.length < 8) {
			errors.password = "Password must be at least 8 characters long";
		}

		// if (data.confirmPassword !== data.password) {
		// 	errors.confirmPassword = "Passwords do not match";
		// }

		return errors;
	}

	if(type === "verifyOtp") {
		if (!data?.otp.trim()) {
			errors.otp = "OTP code is required";
		} else if (data.otp.length < 4) {
			errors.otp = "OTP must be be 4 character long";
		}

		return errors;
	}
}

export function getInitials(fullName) {
	const nameArray = fullName.split(" ");
	const firstInitial = nameArray[0].charAt(0);
	const secondInitial = nameArray[1].charAt(0);
	return `${firstInitial}${secondInitial}`;
}

export function countdownTimer(duration = 120, callback) {
	let secondsLeft = duration;
	const intervalId = setInterval(() => {
		callback(
			`${Math.floor(secondsLeft / 60)
				.toString()
				.padStart(2, "0")}:${(secondsLeft % 60).toString().padStart(2, "0")}`,
		);
		secondsLeft--;
		if (secondsLeft === 0) {
			clearInterval(intervalId);
			callback("00:00");
		}
	}, 1000);
}
