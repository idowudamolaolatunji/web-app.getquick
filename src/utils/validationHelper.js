export function validateOnboardForm(data, type) {
	const errors = {};

	if (!data.name.trim()) {
		errors.name = "Business name is required";
	} else if (data.name.length < 3) {
		errors.name = "Business name must be more than 3 characters long";
	} else if (data.name.trim() && !data.storeUrl) {
		errors.storeUrl = "A URL is needed for your store";
	}

	if (data.isRegistered == "yes" && !data.regType) {
		errors.type = "Registeration type is required";
	}
	if (data.selectedCategory.length < 1 && !data.selectedCategory.name) {
		errors.category = "Picking a category is required";
	}

	return errors;
}

export function validateAuthForm(data, type) {
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
		} else if (!["234", "233"].includes(data.phone.slice(0, 3))) {
			errors.phone = "Quicka is only allowed in Nigeria and Ghana";
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

	if (type === "verifyOtp") {
		if (!data?.otp.trim()) {
			errors.otp = "OTP code is required";
		} else if (data.otp.length < 4) {
			errors.otp = "OTP must be be 4 character long";
		}

		return errors;
	}
}

export function validateProductForm(data, _) {
	const errors = {};

	if (!data.name.trim()) {
		errors.name = "Produt title is required";
	} else if (data.name.length < 3) {
		errors.name = "Produt title must be more than 3 characters!";
	}

	if (!data.price) {
		errors.price = "Price is required";
	} else if (+data.price < 500) {
		errors.price = "Price must not be less than 500";
	} else if (+data.price <= +data.itemCost) {
		errors.itemCost = "Price cannot be more than or the same as cost price";
	}

	if (data.inventory && !data.stockAmount) {
		errors.stockAmount = "Stock Quantity is required";
	} else if (data.inventory && +data.stockAmount < 1) {
		errors.stockAmount = "Stock Quantity cannot be less than 1";
	}

	if (data.discountType != "no-discount" && !data.discount) {
		errors.discount = "Discount is required";
	}

	if (data.images.length === 0) {
		errors.images = "Produt image is required";
	}

	if (!data.description.trim()) {
		errors.description = "Produt description is required";
	}

	if (data.productCollection.length < 1 && !data.productCollection.name) {
		errors.productCollection = "Produt collection is required";
	}

	return errors;
}

export function validateDeliveryForm(data, _) {
	const errors = {};

	if (!data.title.trim()) {
		errors.title = "Delivery title is required";
	} else if (data.title.length < 3) {
		errors.title = "Delivery title must be more than 3 characters!";
	}
	
	if (data.deliveryType == "paid" && !+data.fee) {
		errors.fee = "A fee is required";
	}

	return errors;
}

export function validateBankForm(data, _) {
	const errors = {};

	if (data.bankName.length < 1 && !data.bankName.bankname) {
		errors.bankName = "Bank Name is required";
	}

	if (!data.accountNumber) {
		errors.accountNumber = "Password is required";
	} else if (data.accountNumber.length < 10) {
		errors.accountNumber = "Account Number must be 10 Numbers";
	}
	
	if (!data.accountName.trim()) {
		errors.accountName = "Account Name is required";
	} else if (data.accountName.length < 3) {
		errors.accountName = "Account Name must be more than 3 Letters!";
	}

	return errors;
}


export function validateExportCsvInput(email) {
	let error;

	if (!email.trim()) {
		error = "An email address is required";
	} else if (!/\S+@\S+\.\S+/.test(email)) {
		error = "Email address is invalid!";
	}

	return error;
}
