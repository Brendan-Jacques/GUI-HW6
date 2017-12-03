$("document").ready(function() {
	var i = 0;
	var input_fields = 0;

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
	$("#input_field_num").on("change", function() {
		var value = this.value;
		console.log(value);
		field_generate();
		$(num_of_cars).slider("value", parseInt(value));
		input_fields = input_fields + 1;
	});

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
	$("#per_gallon").on("change", function() {
		var value = this.value;
		console.log(value);
		$(per_gallon).slider("value", parseInt(value));
	});

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
	$("#miles_per_month").on("change", function() {
		var value = this.value;
		console.log(value);
		$(miles_per_month).slider("value", parseInt(value));
	});
})

