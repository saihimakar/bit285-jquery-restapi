$(document).ready(function(){
    //Replace with your own API if you have it functioning for Toys, Colors, and Users
    var baseURI = "http://toyauctionapi.azurewebsites.net/api/";
    // Create jQuery objects representing the UI elements
    var usernametext = $('input#user_name');
    var toynametext = $('input#toy_name');
    var toylegstext = $('input#legs');
    var colordropdown = $('select#toy_color');
    var userdropdown = $('select#toy_owner');
    var toydropdown = $('select#toy');
    // Populate the dropdown items using REST API
    getColors(colordropdown);
    getUsers(userdropdown);
    getToys(toydropdown);

    // Add a Create User button click event handler using AJAX to create a new User
    $('#addUser').click(function(){
        $.ajax({
            url: baseURI + "users/",
            method: "POST",
            data: {
                // TODO: start with static date to see it working,
                // then use the jQuery .val() method to get the value of the username UI field
                Name: usernametext.val()
            }
        }).done(function(result) {
            // display a message that the user is added
            $('<p></p>').html(result.Name + ' user added!').prependTo('section#user');
            // TODO: refresh the user dropdown list
            getUsers(userdropdown);

        });
    });

    // Add a Create Toy button click event handler using AJAX to create a new Toy
    $('#addToy').click(function(){
        $.ajax({
            url: baseURI + "toys/",
            method: "POST",
            data: {
                // TODO: start with static date to see it working,
                // then use the jQuery .val() method to get the value of each UI field
                Name: toynametext.val(),
                NumberLegs: toylegstext.val(),
                ColorID: colordropdown.val(),
                OwnerID: userdropdown.val()


            }
        }).done(function(result) {
            // display a message that the toy is added
            $('<p></p>').html(result.Name + ' toy added!').prependTo('section#toy');
            // TODO: refresh the toy dropdown list
            getToys(toydropdown);


        });
    });

    // TODO: Add a  button click event handler using AJAX  to delete a Toy using HTTP DELETE
    $('#deleteToy').click(function () {
        $.ajax({
            url: baseURI + "toys/" + toydropdown.val(),
            type: "Delete",
            dataType: "json",
            data: {},
            error: function (xhr, textStatus, errorThrown){
                alert("Error");
            }

        }).done(function(result){
            $('<p></p').html(result.Name + 'toy deleted!').prependTo('section#toy');
        });
        })
});

/*
 *  Helper methods for getting REST API data for esch dropdown
 */

  function getColors(dropdown){ //Add colors to the dropdown
		$.ajax({
      url: baseURI + "colors/",
      method: "GET"
    }).done(function(result) {
					console.log(result);  // Take a peek at the data
          $.each(result, function(k, v) {
              dropdown.append('<option value="' + v.ColorID + '">' + v.ColorName + '</option>');
          });
		});
  };
	function getUsers(dropdown){ // Add users to the dropdown
	    //TODO: write the AJAX method
	    $.ajax({
	        url: baseURI + "users/",
	        method: "GET"
	    }).done(function(result){
        console.log(result);
        $.each(result,function(k,v){
        dropdown.append('<option value = "' + v.UserID );

        });

   });
  // Add toys to the dropdown
    function getToys(dropdown){
        //TODO: write the AJAX method
        $.ajax({
            url:baseURI + "toys/",
            method: "GET"
        }).done(function(result){
            console.log(result);
            $.each(result,function(k,v){
                dropdown.append('<option value="' + v.ToyID + '">' + v.Name + '</option>');
            });
        });
    };

	};

