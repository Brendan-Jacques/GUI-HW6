/*
<!--
 Name: Brendan Jacques, brendan_jacques@student.uml.edu
 Student - Computer Science Major, UMass Lowell
 Comp.4610, GUI Programming I
 File: /usr/cs/2018/bjacques/public_html/461f2017/hw6/js/hw6.js
 Created: 31-November-2017
-->
*/

//Adds a new tab to the page
function addTab() {
	var label = "Tab " + tabCounter,
		name = "tabs-" + tabCounter,
		li = "<li><a id='label"+tabCounter+"' href='#"+name+"''>"+label+"</a> <span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>",
		new_table = table_compute();
		if(new_table == "") {
			console.log("No new table created.");
			return;
		}
		var tabs = $("#tabs").tabs();

	//appends a new tab into the tab list
	tabs.find(".ui-tabs-nav").append(li);
	//appends the content of that new tab (i.e. the table being inserted) into the html.
	tabs.append("<div id='"+ name +"'>"+ new_table + "</div>");
	tabs.tabs("refresh");

	//inserts a new checkbox field into the Table Modify tab.
	var checkbox = "<div id='field"+tabCounter+"'><input id='check"+tabCounter+"' type='checkbox' name='"+tabCounter+"'/>Tab "+tabCounter+"</div>";
	document.getElementById("tab-deletion").innerHTML += checkbox;

	//increments tabCounter, which keeps track of the # of tabs currently active.
	tabCounter++;
	return;
}

//Deletes the tabs selected by the user in the Table Modify section.
function deleteTabs() {
	var i = 1;
	for(i = tabCounter; i != 0; i--) {
		if($("#check"+i).is(":checked")) {
			$("#tabs").find(".ui-tabs-nav [aria-controls='tabs-"+i+"']").remove();
			$("#tabs").tabs("refresh");
			$("#field"+i).remove();
			tabCounter--;
		}
	}
	return;
}
 
//Deletes ALL tabs on the page except for Table Create and Table Modify.
function allTabs() {
	var i = 1;
	for(i = 1; i <= tabCounter; i++) {
		$("#tabs").find(".ui-tabs-nav [aria-controls='tabs-"+i+"']").remove();
		$("#tabs").tabs("refresh");
		$("#field"+i).remove();
	}
	tabCounter = 0;
}

/*
function addPriceSlider(i) {
	$("<div id='price_slider"+ i +"' class='price_slider'></div>").insertAfter("#price"+i).slider({
		value: 2000,
		range: true,
		min: 1999,
		max: 10000000,
		step: 1000,
		create: function (e, ui) {
			var bar = $(this).slider('value');
		},
		slide: function( event, ui ) {
			var v = parseInt(ui.value);
			console.log("Please?");
			$("#price"+ i).val(v).change();
		}
	});

	$("#price_slider"+i).slider('enable');
}
*/
function table_compute() {
	//inputs: An array containing all info given about each car being compared.
	var inputs = [];
	//input_fields: The number of cars being compared.
	var input_fields = document.getElementById("input_field_num").value;
	//price: The array of valid given prices for cars. current_p: Contains the most recent price taken from the form.
	var price = []; var current_p;
	//mpg: The array of valid given mpgs for cars. current_m: Contains the most recent mpg taken from the form.
	var mpg = []; var current_m;
	//price_per_gallon: The price of gas given by the user. expected_miles: The number of miles PER MONTH given by the user.
	var price_per_gallon = document.getElementById("per_gallon").value;
	var expected_miles = document.getElementById("miles_per_month").value;
	//i, j, k, l: default values for the for loops/
	var i, j, k;
	var l = 0;
	//check1, check2: limiters on the for loops
	var check1 = 0, check2 = 0;
	//extra: used as temp storage while sorting the price and mpg arrays from least to greatest.
	var extra;
	//per_month, per_mile: will contain the per_month and per_mile values for each cell in the results table.
	var per_month; var per_mile;
	//valid_entries_p, valid_entries_m: The number of non-duplicate price and mpg values given by the user.
	var valid_entries_p = input_fields;
	var valid_entries_m = input_fields;
	//first_row, new_row: Will contain the new HTML that will be inserted into hw4.html to generate the table.
	var first_row = ""; var new_row = "";

	var final_table = "<table id='results' class='results' style='color: black; display: table;'><tbody>";

	//The info entered on each car will only be accepted if:
	//1) none of the values are blank,
	//2) every value is a number value (the inputs in the form are all type="number" and that prevents them from being letter values.)
	//3) Every number value is greater than or equal to zero.
	//4) The car's price is above $2000 (due to the common sense that no car would be sold for less than that.)
	for(i = 1; i <= input_fields; i++) {
		//Checks with the validation info given in validation-hw5.js to see if the car info given by the user is valid.
		//If it is, continue. if it isn't, skip to the next car's info.
		if(($("#price"+ i).valid()) && ($("#mpg"+ i).valid()) && ($("#insurance"+ i).valid()) && ($("#maintenance"+ i).valid())) {
			current_p = document.getElementById("price"+ i).value;
			current_m = document.getElementById("mpg" + i).value;
			current_i = document.getElementById("insurance" + i).value;
			current_main = document.getElementById("maintenance" + i).value;

			inputs[l] = {
				price: current_p,
				mpg: current_m,
				insurance: current_i,
				maintenance: current_main
			};
			l++;
			for(j = 0, check1 = 0; j < valid_entries_p && check1 != 1; j++) {
				//Searches through price[k] for the proper spot for the current_p
				//so that the array is ordered from least to greatest.
				if(price[j] == null) {
					//If current price[k] cell is empty, place current_p here
					//and end the loop.
					price[j] = current_p;
					check1 = 1;
				}
				else if(price[j] == +current_p) {
					//If current price[k] cell equals current_p, then current_p is a duplicate.
					//check1 is set to 1 to end the loop and the number of non_duplicate price entries is decreased.
					check1 = 1;
					valid_entries_p = valid_entries_p - 1;
				}
				else if(+price[j] > +current_p) {
					//If current_p is less than the value in price[k], place
					//current_p here, make the original value of price[k] the
					//new current_p, and continue the loop.
					extra = price[j];
					price[j] = current_p;
					current_p = extra;
					extra = 0;
				}
			} //end of for loop
			for(k = 0, check2 = 0; k < valid_entries_m && check2 != 1; k++) {
				//Searches through mpg[k] for the proper spot for the current_m
				//so that the array is ordered from least to greatest.
				if(mpg[k] == null) {
					//If current mpg[k] cell is empty, place current_m here
					//and end the loop.
					mpg[k] = current_m;
					check2 = 1;
				}
				else if(mpg[k] == +current_m) {
					//If current price[k] cell equals current_p, then current_p is a duplicate.
					//check1 is set to 1 to end the loop and the number of non_duplicate price entries is decreased.
					check2 = 1;
					valid_entries_m = valid_entries_m - 1;
				}
				else if(+mpg[k] > +current_m) {
					//If current_m is less than the value in mpg[k], place
					//current_m here, make the original value of mpg[k] the
					//new current_m, and continue the loop.
					extra = mpg[k];
					mpg[k] = current_m;
					current_m = extra;
					extra = 0;
				}
			} //end of for loop
		}  else { //end of if statement
			//If any of a car's values are invalid or missing, all info on that car is ignored.
			valid_entries_p = valid_entries_p - 1;
			valid_entries_m = valid_entries_m - 1;
		}
	} //end of for statement
	if(valid_entries_p == 0 || valid_entries_m == 0 || (valid_entries_p == 0 && valid_entries_m == 0)) {
		//If the user failed to enter any valid car values, print a response and end the program prematurely.
		return '';
	}
	/* Okay, starting from here you have every price & mpg value in sorted
	   arrays. Next steps:
	   1) First row should just be the list of every value in the price array
	   2) Each other row should be:
	   		a) That row's mpg value (in order)
	   		b) each cell (use 11, 12, 21, etc for cell content for now). 
	*/
	//Fill the first_row variable with the html that will be inserted into hw4.html, starting with the first default cell.
	first_row = "<td class='title'>Price/Fuel Consumption</td>"
	for(i = 0; i < valid_entries_p; i++) {
		//Each cell in the first row will be the values in the price array in order (that's already been sorted from least to greatest)
		first_row += "<td class='price'>$"+ price[i] +"</td>";
	}
	final_table += "<tr>" + first_row +"</tr>";
	//Every row afterward
	for(i = 0; i < valid_entries_m; i++) {
		//loop for each row in the table
		new_row += "<td class='mpg'>"+ mpg[i] +" mpg</td>";
		for(j = 0; j < valid_entries_p; j++) {
			//loop for each column in each row
			for(k = 0, check1 = 0; k < inputs.length && check1 != 1; k++) {
				//For every valid input given by the user...
				if((mpg[i] == inputs[k].mpg) && (price[j] == inputs[k].price)) {
					//If the mpg value of the current row and the price of the current column both appear in the info of a car input by the user,
					//calculate the per_month and per_mile values for the cell and add them to the new_row object.
					per_mile = ((+expected_miles / +inputs[k].mpg) * +price_per_gallon);
					per_month = (+inputs[k].insurance) + (+inputs[k].maintenance) + per_mile;
					new_row += "<td class='cell'>("+ per_month + " / " + per_mile +")</td>";
					check1 = 1;
				}
			}
			if(check1 != 1) {
				//If no entry in inputs[i] matches the current cell, insert "..." into the new_row object.
				new_row += "<td class='cell'> ... </td>";
			}
		}
		//insert the new_row object into hw4.html to make one row in the table.
		final_table += "<tr>"+ new_row +"</tr>";
		/* document.getElementById("results").innerHTML += "<tr>"+ new_row +"</tr>"; */
		new_row = "";
	}
	//Once all rows of the table have been submitted, make the table visible and end the program.
	final_table += "</tbody></table>";
	return final_table;
}

//Creates a # of html form lines to account for the # of fields given in input_field_num.
function field_generate() {
	//Checks to see if the info submitted by the user is valid based on the info given in validation-hw5.js. If it is, continue.
	if($("#car-number").valid()) {
		//input_fields: The number of input fields requested by the user.
		var input_fields = document.getElementById("input_field_num").value;
		var i = +1;
		var blank = "";

		document.getElementById("fields").innerHTML = blank;

		var new_field = "";
		for(i = 1; i <= input_fields; i++) {
			//For each input field requested, insert the html for one input field into hw4.html.
			new_field = "<tbody class='field'><tr><th>Car "+ i +":</th><th>Insert Values Below</th></tr><tr><td>Price:</td><td> <input type='text' class='data_input' id='price"+ i + "' name='price"+ i +"'/></td></tr><tr><td>Miles Per Gallon:</td><td><input type='text' class='data_input' id='mpg" + i + "' name='mpg"+ i +"'/></td></tr><tr><td>Insurance Cost Per Month:</td><td><input type='text' class='data_input' id='insurance" + i + "' name='insurance"+ i +"'/><div id='insurance_slider"+ i +"' /></td></tr><tr><td>Maintenance Cost Per Month:</td><td><input type='text' class='data_input' id='maintenance" + i + "' name='maintenance" + i + "'/><div id='maintenance_slider"+ i +"' /></td></tr></tbody>";
			document.getElementById("fields").innerHTML += new_field;
			//Add validation rules for each new input element that was just inserted into the html.
			$("#price"+ i).rules("add", {
				required: true,
				min: 2000,
				max: 10000000
			});

			$("#mpg"+ i).rules("add", {
				required: true,
				min: 1,
				max: 1000
			});
			$("#insurance"+ i).rules("add", {
				required: true,
				min: 0,
				max: 10000000
			});
			$("#maintenance"+ i).rules("add", {
				required: true,
				min: 0,
				max: 10000000
			});
			//addPriceSlider(i);
			/*
			$("<div id='mpg_slider"+ i +"'></div>").insertAfter("#mpg"+i).slider({
				value: 1,
				min: 0,
				max: 1000,
				range: true,
				step: 1,
				slide: function( event, ui ) {
					$("#mpg"+i).val(ui.value);
				}
			});

			$("#fields").on('change', "#price"+i, function() {
				var value = parseInt(this.value);
				console.log(value);
				$("#price_slider"+i).slider("value", value);
			})
			$("#fields").on('change', "#mpg"+i, function() {
				var value = parseInt(this.value);
				console.log(value);
				$("#mpg_slider"+i).slider("value", value);
			})
			*/
		}
		$(".data_input").on("change", function() {
			addTab();
			return;
		});
		//Make the default values table, the form submit button, and the two notes visible on the page, then ends the program.
		document.getElementById("defaults").style.display = "table";
		document.getElementById("submit").style.display = "inline-block";
		document.getElementById("note1").style.display = "block";
		document.getElementById("note2").style.display = "block";
		document.getElementById("note3").style.display = "block";
	} else {
		//delete all added inner html from defaults
		document.getElementById("fields").innerHTML = "";
		document.getElementById("defaults").style.display = "none";
		document.getElementById("submit").style.display = "none";
		document.getElementById("note1").style.display = "none";
		document.getElementById("note2").style.display = "none";
		document.getElementById("note3").style.display = "none";
	}
}