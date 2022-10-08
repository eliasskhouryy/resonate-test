function generateShortCode(storeId, transactionId) {
	const newStoreId = storeId.toString().padStart(3, '0');
	// padStart adds '0's until the length reaches 3 (only works on strings).
	const newTransactionId = transactionId.toString().padStart(4, '0');
	const date = new Date().getDate(); // gets the day of that months Date (1-31)

	return newStoreId + newTransactionId + date;
}

function decodeShortCode(shortCode) {
	const decodedStoreId = parseInt(shortCode.slice(0, 3));
	const decodedTransactionId = parseInt(shortCode.slice(3, 7));
	// Converts the decoded store and transaction id into integers which        automatically removes the initial '0's before the actual value.
	const decodedDate = shortCode.slice(7);
	// takes the day of the month from the initial shortcode and implements it in the new Date().
	console.log(new Date(new Date().setDate(decodedDate)));

	return {
		storeId: decodedStoreId, // store id goes here,
		shopDate: new Date(new Date().setDate(decodedDate)), // the date the customer shopped,
		transactionId: decodedTransactionId, // transaction id goes here
	};
}

// ------------------------------------------------------------------------------//
// --------------- Don't touch this area, all tests have to pass --------------- //
// ------------------------------------------------------------------------------//
function RunTests() {
	var storeIds = [175, 42, 0, 9];
	var transactionIds = [9675, 23, 123, 7];

	storeIds.forEach(function (storeId) {
		transactionIds.forEach(function (transactionId) {
			var shortCode = generateShortCode(storeId, transactionId);
			var decodeResult = decodeShortCode(shortCode);
			$('#test-results').append('<div>' + storeId + ' - ' + transactionId + ': ' + shortCode + '</div>');
			AddTestResult('Length <= 9', shortCode.length <= 9);
			AddTestResult('Is String', typeof shortCode === 'string');
			AddTestResult('Is Today', IsToday(decodeResult.shopDate));
			AddTestResult('StoreId', storeId === decodeResult.storeId);
			AddTestResult('TransId', transactionId === decodeResult.transactionId);
		});
	});
}

function IsToday(inputDate) {
	// Get today's date
	var todaysDate = new Date();
	// call setHours to take the time out of the comparison
	return inputDate.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0);
}

function AddTestResult(testName, testResult) {
	var div = $('#test-results').append("<div class='" + (testResult ? 'pass' : 'fail') + "'><span class='tname'>- " + testName + "</span><span class='tresult'>" + testResult + '</span></div>');
}
