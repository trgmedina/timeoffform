$(document).ready(function() {
  
  var requestsContainer = $(".requests-container");
  var requests;

  //This function grabs requests from the database and updates the view
  function getRequests() {
    $.get("/api/requests/", function(data) {
      console.log("Requests", data);

      requests = data; 

      if (!requests || !requests.length) {
        displayEmpty();
      }
      else {
        initializeRows();
      }
    });
  }

  //Getting the initial list of requests
  getRequests();

  //Handles appending all of the constructed request HTML inside requestsContainer
  function initializeRows() {
    requestsContainer.empty();
    var requestsToAdd = [];
    for (var i = 0; i < requests.length; i++) {
      requestsToAdd.push(createNewRow(requests[i]));
    }
    requestsContainer.append(requestsToAdd);
  }

  //This function constructs a requests' HTML
  function createNewRow(request) {
    //Create new request div and header with store name
    var newRequestDiv = $("<div>");
    newRequestDiv.addClass("card timeoff-request");
    var newRequestHeader = $("<div>");
    newRequestHeader.addClass("card-header bg-dark");
    var newRequestStoreName = $("<h4>");
    newRequestStoreName.text(request.storeName);

    //Fill out the request body
    var newRequestBody = $("<div>");
    newRequestBody.addClass("card-body");
    var employeeName = $("<p>");
    var employeeEmail = $("<p>");
    var datesRequested = $("<p>");
    var employeeComments = $("<p>");
    employeeName.text("NAME: " + request.firstname + " " + request.lastname);
    employeeEmail.text("EMAIL: " + request.email);
    datesRequested.text("DATE(S) REQUESTED: " + request.dates);
    employeeComments.text("COMMENTS: " + request.comments);

    //Append all info to appropriate areas 
    newRequestBody.append(employeeName);
    newRequestBody.append(employeeEmail);
    newRequestBody.append(datesRequested);
    newRequestBody.append(employeeComments);
    newRequestHeader.append(newRequestStoreName);
    newRequestDiv.append(newRequestHeader);
    newRequestDiv.append(newRequestBody);
    newRequestDiv.data("request", request);

    return newRequestDiv;
  }

  //This function displays a messgae when there are no posts
  function displayEmpty() {
    requestsContainer.empty();
    var messageh2 = $("<h2>");
    messageh2.css({ "text-align": "center", "margin-top": "50px" });
    messageh2.html("No time off requests have been made.");
    requestsContainer.append(messageh2);
  }

});
