$(document).ready(function() {

	//Handles filling in select form for stores
	var storesUrl = "https://hogsaltapi.com/hog_stores";
	$.getJSON(storesUrl).done(function(data) {
		console.log(data);
		//Loop through array of stores and set as options in store select
		for(var i=0; i<data.length; i++){
			var option = "<option value='" + data[i].name + "'>" + data[i].name + "</option>";
			$(".stores").append(option);
			// console.log(option);
		}
	});

	//Getting jQuery references to form
	var storeInput = $("#store");
	var firstnameInput = $("#firstname");
	var lastnameInput = $("#lastname");
	var emailInput = $("#email");
	var datesInput = $("#dates");
	var commentsInput = $("#comments");

	//Form button submit
	$("#requestoff").on("submit", function handleFormSubmit(event) {
	    event.preventDefault();

	    var newRequest = {
      		storeName: storeInput.val().trim(),
      		firstname: firstnameInput.val().trim(),
      		lastname: lastnameInput.val().trim(),
      		email: emailInput.val().trim(),
      		dates: datesInput.val().trim(),
      		comments: commentsInput.val().trim()
    	};

    	console.log(newRequest);

    	submitRequest(newRequest);
    });

	//Submits requests and posts JSON 
    function submitRequest(Request) {
    	$.post("/api/requests", Request, function() {
     	window.location.href = "/current-requests";
    });
  }

})
