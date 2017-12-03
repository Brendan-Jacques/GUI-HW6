/*
 Name: Brendan Jacques, brendan_jacques@student.uml.edu
 Student - Computer Science Major, UMass Lowell
 Comp.4610, GUI Programming I
 File: /usr/cs/2018/bjacques/public_html/461f2017/hw6/js/validation-hw6.js
 Created: 27-November-2017
*/

$("document").ready(function() {
	/* Validation info for the #car-number form */
	$("#car-number").validate({
		rules: {
			input_field_num: {
				required: true,
				digits: true,
				min: 1,
				max: 199
			}
		},
		messages: {
			input_field_num: {
				min: "*Please enter a valid integer greater than 0.",
				max: "*Please enter a valid integer less than 200.",
				digits: "*Please enter a vaild integer."
			}
		}
	});
	/* Validation info for the #car-compare-data form.
	   This form is the primary user-input form.
	   This info does not include rules for the user-inserted
	   car information because the number of cars being compared
	   is dynamic. As such, the rules for each car are inserted
	   when the input elements for each car are created in field_generate().
	 */
	$("#car-compare-data").validate({
		rules: {
			per_gallon: {
				required: true,
				number: true,
				min: 1,
				max: 1000000
			},
			miles_per_month: {
				required: true,
				number: true,
				min: 1,
				max: 1000000
			},
		},
		messages: {
			per_gallon: "*Please enter value greater than 0.",
			miles_per_month: "*Please enter value greater than 0."
		},
	});
	/* Prevents the page from refreshing upon form submit */
	$("#car-number").submit(function(e) {
		e.preventDefault();
	});
	$("#car-compare-data").submit(function(e) {
		e.preventDefault();
	});
	$("#tab_delete").submit(function(e) {
		e.preventDefault();
	});
})