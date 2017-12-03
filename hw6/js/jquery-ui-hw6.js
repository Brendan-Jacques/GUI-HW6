/*
 Name: Brendan Jacques, brendan_jacques@student.uml.edu
 Student - Computer Science Major, UMass Lowell
 Comp.4610, GUI Programming I
 File: /usr/cs/2018/bjacques/public_html/461f2017/hw6/jquery-ui-hw6.html
 Created: 27-November-2017
*/

$("document").ready(function() {
	//Gives the custom settings for the slider that determines the number of cars being compared.
	var num_of_cars = $("<div id='slider1'></div>").insertAfter("#input_field_num").slider({
		value: 1,
		min: 1,
		max: 50,
		range: "min",
		step: 1,
		slide: function( event, ui ) {
			$("#input_field_num").val(ui.value).change();
			field_generate();
		}
	});
	//On any change to the number of cars, change the slider's value to compensate and run field_generate().
	$("#input_field_num").on("change", function() {
		var value = this.value;
		console.log(value);
		field_generate();
		$(num_of_cars).slider("value", parseInt(value));
		input_fields = input_fields + 1;
	});
	//Settings for the slider that determines price of gasoline.
	var per_gallon = $("<div id='slider_gallon'></div>").insertAfter("#per_gallon").slider({
		value: 0,
		min: 0,
		max: 100,
		range: "min",
		step: 10,
		slide: function( event, ui ) {
			$("#per_gallon").val(ui.value);
			addTab();
		}
	});
	//On change to amount of gasoline, fix the slider's current position
	$("#per_gallon").on("change", function() {
		var value = this.value;
		console.log(value);
		$(per_gallon).slider("value", parseInt(value));
	});

	//Settings for the slider determining the miles driven per month.
	var miles_per_month = $("<div id='slider_miles'></div>").insertAfter("#miles_per_month").slider({
		value: 0,
		min: 0,
		max: 2000,
		range: "min",
		step: 100,
		slide: function( event, ui ) {
			$("#miles_per_month").val(ui.value);
			addTab();
		}
	});
	//On change to miles per month, fix the slider's current position.
	$("#miles_per_month").on("change", function() {
		var value = this.value;
		console.log(value);
		$(miles_per_month).slider("value", parseInt(value));
	});
})

