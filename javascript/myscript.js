function validateForm() {
    formValidated = true;

    numbers = (/^[0-9]+$/);
    letters = (/^[A-Za-z]+$/);
    lettersUpper = (/^[A-Z]+$/);
    numbersLetters = (/^[A-Za-z0-9]+$/);
    firstLetter = (/^[FIOQUWZ]+$/);

    errorField = document.getElementById('error');
    errorField.innerHTML = " ";

    FirstNameValidate();

    SurnameValidate();

    DateOfBirthValidate();

    EmailValidate();

    PhoneValidate();

    AddressValidate();

    AptValidate();

    CityValidate();

    ProvinceValidate();

    PostalCodeValidate();

    OwnRentValidate();

    MonthlyPaymentValidate();

    MonthlyIncomeValidate();

    YearsAtLocationValidate();

    AuthorizedCodeValidate();

    CreditCheckValidate(3);

    EmailConsentValidate();

	return formValidated;
}

function FirstNameValidate() {
    var hyphenPresent = 0;
    var fName = document.getElementById('fName').value;

    fName = fName.trim();
    fName = fName.toUpperCase();


    if (fName == "") {
        formValidated = false;
        errorField.innerHTML += "Enter first name.<br/>";
    } else if (fName.length < 3) {
        formValidated = false;
        errorField.innerHTML += "Name must be at least 3 characters long.<br/>";
    } else {
        if (!fName[0].match(letters) || !fName[1].match(letters) || !fName[2].match(letters)) {
            formValidated = false;
            errorField.innerHTML += "First name has to start with 3 letters<br/>";
        }

        if (fName[fName.length - 1] == '-') {
            formValidated = false;
            errorField.innerHTML += "First name cannot have a hyphen in the end.<br/>";
        }

        for (var i = 0 ; i < fName.length ; i++) {
            if (fName[i] == '-') {
                hyphenPresent += 1;
                if (hyphenPresent > 1) {
                    formValidated = false;
                    errorField.innerHTML += "First name can have only 1 hyphen.<br/>";
                    break;
                }
            }
        }

        for (var j = 0 ; j < fName.length ; j++) {
            if (!fName[j].match(letters) && fName[j] != '-') {
                formValidated = false;
                errorField.innerHTML += "First Name must have only characters and an optional hyphen<br/>";
                break;
            }
        }
        
    }
}

function SurnameValidate() {
    var hyphenPresent = 0;
    var apostrophePresent = 0;
    var sName = document.getElementById('sName').value;

    sName = sName.trim();
    sName = sName.toUpperCase();

    if (sName == "") {
        formValidated = false;
        errorField.innerHTML += "Enter surname.<br/>";
    } else if (sName.length < 4) {
        formValidated = false;
        errorField.innerHTML += "Surname must be at least 4 characters long.<br/>";
    } else {
        if (!sName[0].match(letters) || !sName[1].match(letters) || !sName[2].match(letters) || !sName[3].match(letters)) {
            formValidated = false;
            errorField.innerHTML += "Surname has to start with 4 letters<br/>";
        }
        if (sName[(sName.length - 1)] == '-') {
            formValidated = false;
            errorField.innerHTML += "Surname cannot have a hyphen in the end.<br/>";
        }

        if (sName[(sName.length - 1)] == '\'') {
            formValidated = false;
            errorField.innerHTML += "Surname cannot have a hyphen in the end.<br/>";
        }

        if (sName.match('\'') && sName.match('-')) {
            if (Math.abs(sName.indexOf('\'') - sName.indexOf('-')) < 2) {
                formValidated = false;
                errorField.innerHTML +=  "Surname cannot have a hyphen and an apostrophe right next to each other.<br/>";

            }
        }

        for (var i = 0 ; i < sName.length ; i++) {
            if (sName[i] == '-') {
                hyphenPresent += 1;
                if (hyphenPresent > 1) {
                    formValidated = false;
                    errorField.innerHTML += "First name Can have only 1 hyphen.<br/>";
                    break;
                }
            }
        }

        for (var i = 0 ; i < sName.length ; i++) {
            if (sName[i] == '\'') {
                apostrophePresent += 1;
                if (apostrophePresent > 1) {
                    formValidated = false;
                    errorField.innerHTML += "Surname Can have only 1 apostrophe.<br/>";
                    break;
                }
            }
        }

        for (var j = 0 ; j < (sName.length) ; j++) {
            if (!sName[j].match(letters) && sName[j] != '-' && sName[j] != '\'') {
                formValidated = false;
                errorField.innerHTML += "Surname must have only characters and an optional hyphen and an optional apostrophe<br/>";
                break;
            }
        }     
    }
}

function DateOfBirthValidate() {
    var currDate = new Date();
    var currYear = currDate.getFullYear();
    var monthArray = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    var dob = document.getElementById('dob').value;

    dob = dob.trim();
    var monthEntered = dob.substring(0, 3);
    monthEntered = monthEntered.toUpperCase();

    var yearEntered = dob.substring(3, 7);

    var validMonth = true;

    for (var i=0 ; i<12 ; i++){
        if (monthEntered == monthArray[i]) {
            break;            
        }
        if (i == 11) {
            validMonth = false;
        } 
    }

    if (dob == "") {
        formValidated = false;
        errorField.innerHTML += "Enter Date of Birth.<br/>";
    } else if (dob.length < 7) {
        formValidated = false;
        errorField.innerHTML += "Date Of Birth has to be 7 characters long.<br/>";
    } else {

        if (validMonth == false) {
            formValidated = false;
            errorField.innerHTML += "Enter a valid 3 letter abbreviation for month (not case sensitive).<br/>";
        }

        if (isNaN(yearEntered)) {
            formValidated = false;
            errorField.innerHTML += "Enter a valid 4 numbers for year.<br/>";
        } else if (yearEntered > currDate.getFullYear() - 20) {
            formValidated = false;
            errorField.innerHTML += "Must be at least 20 years old to apply.<br/>";
        }
    }   
}

function EmailValidate() {
    var email = document.getElementById('email').value;
    var atSignCount = 0;
    var periodCount = 0;

    email = email.replace(/\s/g, '');

    if (email == "") {
        formValidated = false;
        errorField.innerHTML += "Enter email.<br/>";
    } else if (email.length < 10) {
        formValidated = false;
        errorField.innerHTML += "Email has to be at least 10 characters long.<br/>";
    } else {

        for (var i = 0;i<email.length;i++){
            if (email[i] == '@'){
                atSignCount += 1;
            }else if (email[i] == '.'){
                periodCount += 1;
            }
        }

        if (atSignCount > 1) {
            formValidated = false;
            errorField.innerHTML += "Email can have only one '@' sign.<br/>";
        }

        if (periodCount > 1) {
            formValidated = false;
            errorField.innerHTML += "Email can have only one period.<br/>";
        }

        if (atSignCount == 1 && periodCount == 1) {

            if (Math.abs(email.indexOf('@') - email.indexOf('.')) < 2) {
                formValidated = false;
                errorField.innerHTML += "Surname cannot have a hyphen and an apostrophe right next to each other.<br/>";
            } else if (email[0] == '@') {
                formValidated = false;
                errorField.innerHTML += "Email cannot have '@' in the beggining.<br/>";
            } else if (email [0] == '.'){
                formValidated = false;
                errorField.innerHTML += "Email cannot have period in the beggining.<br/>";
            } else if (email[email.length-1] == '@'){
                formValidated = false;
                errorField.innerHTML += "Email cannot '@' in the end.<br/>";
            } else if (email[email.length-1] == '.'){
                formValidated = false;
                errorField.innerHTML += "Email cannot have period in the end.<br/>";
            } else {

                var splitOnAtSign = email.split("@");
                var splitOnPeriod = splitOnAtSign[1].split(".");
                var part1 = splitOnAtSign[0];
                var part2 = splitOnPeriod[0];
                var part3 = splitOnPeriod[1];

                if (part1.length < 3) {
                    formValidated = false;
                    errorField.innerHTML += "First part of email has to be at least 3 characters long.<br/>";
                } else if (!part1.match(numbersLetters)) {
                    formValidated = false;
                    errorField.innerHTML += "First part of email has to have letters or numbers only.<br/>";
                }

                if (part2.length < 3) {
                    formValidated = false;
                    errorField.innerHTML += "Second part of email has to be at least 3 characters long.<br/>";
                } else if (!part2.match(numbersLetters)) {
                    formValidated = false;
                    errorField.innerHTML += "Second part of email has to have letters or numbers only.<br/>";
                }

                if (part3 != "ca" && part3 != "com") {
                    formValidated = false;
                    errorField.innerHTML += "Third part of email has to be 'ca' or 'com'.<br/>";
                }

       
            }
        }

    }
}

function OwnRentValidate(value) {
	if (value == 1){
		document.getElementById('s02').checked = false;
	} else if (value == 2){
		document.getElementById('s01').checked = false;
	} else if (document.getElementById('s01').checked == true && document.getElementById('s02').checked == true){
		document.getElementById('s01').checked = false;
		document.getElementById('s02').checked = false;
		formValidated = false;
		errorField.innerHTML += "Select only 1 option for 'own' or 'rent' field<br/>";
	} else if (document.getElementById('s01').checked == false && document.getElementById('s02').checked == false) {
	    formValidated = false;
	    errorField.innerHTML += "Select an option for 'own' or 'rent' field<br/>";
	}
}

function MonthlyPaymentValidate() {
    monthlyPaymentValidated = true;
    monthlyPayment = document.getElementById('payment').value;
    monthlyPayment = monthlyPayment.trim();

    if (monthlyPayment.length == "") {
        formValidated = false;
        monthlyPaymentValidated = true;
        errorField.innerHTML += "Enter monthly payment.<br/>";
    } else if (isNaN(monthlyPayment)) {
        formValidated = false;
        monthlyPaymentValidated = true;
        errorField.innerHTML += "Monthly payment must be a number.<br/>";
    } else if (monthlyPayment <= 200) {
        formValidated = false;
        monthlyPaymentValidated = true;
        errorField.innerHTML += "Monthly payment must be greater than 200.<br/>";
    }
}

function MonthlyIncomeValidate() {
    var monthlyIncome = document.getElementById('income').value;
    monthlyIncome = monthlyIncome.trim();

    if (monthlyIncome.length == "") {
        formValidated = false;
        errorField.innerHTML += "Enter monthly income.<br/>";
    } else if (isNaN(monthlyIncome)) {
        formValidated = false;
        errorField.innerHTML += "Monthly income must be a number.<br/>";
    } else if (monthlyPaymentValidated == true && monthlyIncome < (monthlyPayment * 4)) {
        formValidated = false;
        errorField.innerHTML += "Monthly income must be at least 4 times monthly payment.<br/>";
    }
}

function YearsAtLocationValidate() {
    var currYears = document.getElementById('currYears').value;
    currYears = currYears.trim();

    if (currYears == "") {
        formValidated = false;
        errorField.innerHTML += "Enter years at current location.<br/>";
    } else if (isNaN(currYears)){
        formValidated = false;
        errorField.innerHTML += "Years at current location must be a number.<br/>";
    } else if (currYears < 1) {
        formValidated = false;
        errorField.innerHTML += "Years at current location must be greater than 0.<br/>";
    } else if (currYears > 40) {
        formValidated = false;
        errorField.innerHTML += "Years at current location must be less or equal to 40.<br/>";
    }
}

function AuthorizedCodeValidate() {
    var authorizedCodeValidated = true;
    var preCode = document.getElementById('preCode').value;
    document.getElementById('preCode').value = preCode;

    var first3preCode = preCode.substring(0,3)
    var last4preCode = preCode.substring(4, 8)

    first3preCode = first3preCode.replace(/\s/g, '');
    last4preCode = last4preCode.replace(/\s/g, '');

    var hyphenPresent = 0;
    var sumFirst3preCode = 0;
    var sumLast4preCode = 0;

    if (preCode == "") {
        return;
    } else if (preCode.length < 8) {
        authorizedCodeValidated = false;
        formValidated = false;
        errorField.innerHTML += "Pre-authorized code must be at least 8 characters long.<br/>";
    } else {
        if (isNaN(first3preCode)) {
            authorizedCodeValidated = false;
            formValidated = false;
            errorField.innerHTML += "Pre-authorized code must have 3 numbers at the beggining.<br/>";
        }

        if (isNaN(last4preCode)) {
            authorizedCodeValidated = false;
            formValidated = false;
            errorField.innerHTML += "Pre-authorized code must have 4 numbers at the end.<br/>";
        }

        for (var i = 0;i<preCode.length;i++){
            if (preCode[i] == '-'){
                hyphenPresent += 1;
                if (hyphenPresent > 1) {
                    authorizedCodeValidated = false;
                    formValidated = false;
                    errorField.innerHTML += "Pre-authorized can have only 1 hyphen.<br/>";
                    break;
                }
            }
        }

        if (preCode[3] != '-') {
            authorizedCodeValidated = false;
            formValidated = false;
            errorField.innerHTML += "Pre-authorized must have a hyphen at the position 4.<br/>";
        }
    }

    if (authorizedCodeValidated == true) {
        for (var i = 0; i < 3; i++) {
            sumFirst3preCode += +first3preCode[i];
        }

        for (var i = 0; i < 4; i++) {
            sumLast4preCode += +last4preCode[i];
        }

        if (sumFirst3preCode * 2 != sumLast4preCode) {
            formValidated = false;
            errorField.innerHTML += "Invalid Pre-authorized code.<br/>";
        }
    }
}

function CreditCheckValidate(value) {
	if (value == 1){
		document.getElementById('c02').checked = false;
	}else if (value == 2){
		document.getElementById('c01').checked = false;
	}else if (document.getElementById('c01').checked == true && document.getElementById('c02').checked == true){
		document.getElementById('c01').checked = false;
		document.getElementById('c02').checked = false;
		formValidated = false;
		errorField.innerHTML += "Select only 1 option for credit check consent field.<br/>";
	}else if (document.getElementById('c01').checked == false && document.getElementById('c02').checked == false){
		formValidated = false;
		errorField.innerHTML += "Select an option for credit check consent field.<br/>";
	}
}

function PhoneValidate() {
    var phone = document.getElementById('phone').value;

    phone = phone.trim();

    var first3phone = phone.substring(0,3);
    var middle3phone = phone.substring(4,7);
    var last4phone = phone.substring(8, 12);

    first3phone = first3phone.replace(/\s/g, '');
    middle3phone = middle3phone.replace(/\s/g, '');
    last4phone = last4phone.replace(/\s/g, '');

    if (phone == "") {
        formValidated = false;
        errorField.innerHTML += "Enter phone number.<br/>";
    } else if (phone.length != 12) {
        formValidated = false;
        errorField.innerHTML += "Phone number must be 12 characters long including 2 hyphens (nnn-nnn-nnnn).<br/>";
    } else if (isNaN(first3phone) || isNaN(middle3phone) || isNaN(last4phone)) {
        formValidated = false;
        errorField.innerHTML += "Phone number must include only numbers and 2 hyphens.<br/>";
    } else if (isNaN(first3phone) || isNaN(middle3phone) || isNaN(last4phone)) {
        formValidated = false;
        errorField.innerHTML += "Phone number must include only numbers and 2 hyphens.<br/>";
    } else {
        if (phone[3] != '-' || phone[7] != '-') {
            formValidated = false;
            errorField.innerHTML += "Phone number must have 2 hyphens in the correct position (nnn-nnn-nnnn).<br/>";
        }

        if (first3phone != "416" && first3phone != "647") {
            formValidated = false;
            errorField.innerHTML += "Phone number must start with '416' or '647'.<br/>";
        }

        if (middle3phone < 200 || middle3phone > 600 || last4phone < 1001 || last4phone > 9999) {
            formValidated = false;
            errorField.innerHTML += "Invalid phone number.<br/>";
        }
    }
}

function AddressValidate(){
    var address = document.getElementById('address').value;

    address = address.trim();
    address = address.toUpperCase();
    address = address.replace(/\./g, ' ');
    address = address.replace(/\s/g, '');

    if (address == "") {
        formValidated = false;
        errorField.innerHTML += "Enter address.<br/>";
    } else if (address.length < 5) {
        formValidated = false;
        errorField.innerHTML += "Address must be at least 5 characters long.<br/>";
    } else if (!address.match(numbersLetters)) {
        formValidated = false;
        errorField.innerHTML += "Address must have only letters.<br/>";
    }
}

function AptValidate() {
    var apt = document.getElementById('apt').value;

    if (apt.length > 0 && !apt.match(numbersLetters)) {
        formValidated = false;
        errorField.innerHTML += "Apartment must include only numbers and letters.<br/>";
    }
}

function CityValidate() {
    var city = document.getElementById('city').value;
    var hyphenPresent = 0;

    city = city.trim();
    city = city.toUpperCase();
    
    if (city == "") {
        formValidated = false;
        errorField.innerHTML += "Enter city.<br/>";
    } else if (city.length < 5){
        formValidated = false;
        errorField.innerHTML += "City must be at least 5 characters long.<br/>";
    } else {
        if (!city[0].match(letters) || !city[1].match(letters) || !city[2].match(letters) || !city[3].match(letters) || !city[4].match(letters)) {
            formValidated = false;
            errorField.innerHTML += "City has to have 5 letters at the beggining.<br/>";
        }

        if (city[city.length - 1] == '-') {
            formValidated = false;
            errorField.innerHTML += "City cannot have a hyphen in the end.<br/>";
        }

        for (var j = 0 ; j < city.length ; j++) {
            if (!city[j].match(letters) && city[j] != '-') {
                formValidated = false;
                errorField.innerHTML += "City must have only characters and an optional hyphen<br/>";
                break;
            }
        }

        for (var i = 0 ; i < city.length ; i++) {
            if (city[i] == '-') {
                hyphenPresent += 1;
                if (hyphenPresent > 1) {
                    formValidated = false;
                    errorField.innerHTML += "City can have only 1 hyphen.<br/>";
                    break;
                }
            }
        }
    }
}

function ProvinceValidate() {
	if (document.getElementById('province').selectedIndex == -1){
	    formValidated = false;
	    errorField.innerHTML += "Select a province.<br/>";
	}
}

function PostalCodeValidate() {
    var postalCode = document.getElementById('postal').value;

    if (postalCode[3] != " ") {
        postalCode = postalCode.replace(/\s/g, '');
    }

    if (postalCode == "") {
        formValidated = false;
        errorField.innerHTML += "Enter postal code.<br/>";
    } else if (postalCode.length != 7) {
        formValidated = false;
        errorField.innerHTML += "Postal code has to be 7 characters long.<br/>";
    } else if (postalCode[3] != " ") {
        formValidated = false;
        errorField.innerHTML += "Postal code has to have a space in the middle.<br/>";
    } else {

        postalCode = postalCode.split(" ");
        var part1 = postalCode[0];
        var part2 = postalCode[1];

        part1 = part1.replace(/\s/g, '');
        part2 = part2.replace(/\s/g, '');

        if (part1[0].match(firstLetter)) {
            formValidated = false;
            errorField.innerHTML += "Postal code has invalid first letter.<br/>";
        }
        if (!isNaN(part1[0]) || isNaN(part1[1]) || !isNaN(part1[2])){
            formValidated = false;
            errorField.innerHTML += "Postal code has invalid format.<br/>";
        } else if (isNaN(part2[0]) || !isNaN(part2[1]) || isNaN(part2[2])) {
            formValidated = false;
            errorField.innerHTML += "Postal code has invalid format.<br/>";
        } else if (!part1[0].match(lettersUpper) || !part1[2].match(lettersUpper) || !part2[1].match(lettersUpper)) {
            formValidated = false;
            errorField.innerHTML += "Postal code must be upper case.<br/>";
        }
    }
}

function getCurrentDate(){
	
	var fullDate = new Date();
	var day = fullDate.getDay();
	var month = fullDate.getMonth();

	var monthArray = ["January","February","March","April","May","June","July","August","September","October","November","December"];

	if ( day < 10 ){day = ("0" + day);}
	return (monthArray[month] + " " + day + ", " + fullDate.getFullYear());
}

function EmailConsentValidate() {
    if (document.getElementById('m01').checked == false && document.getElementById('m02').checked == false) {
        formValidated = false;
        errorField.innerHTML += "Select an option for email consent.<br/>";
    }
}