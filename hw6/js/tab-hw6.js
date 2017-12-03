/*
<!--
 Name: Brendan Jacques, brendan_jacques@student.uml.edu
 Student - Computer Science Major, UMass Lowell
 Comp.4610, GUI Programming I
 File: /usr/cs/2018/bjacques/public_html/461f2017/hw6/js/tab-hw6.js
 Created: 29-November-2017
-->
*/

$( function() {
	//Keeps track of every non-critical tab currently on the page.
	tabCounter = 1;

	var tabs = $("#tabs").tabs();
	//attempts to add a new tab to the list whenever the price_per_gallon or miles_per_month values are changed.
	$("#car-compare-data").on("change", function() {
		addTab();
		event.preventDefault();
	});

	//Allows the user to delete a tab by clicking the x button on each tab
	tabs.on( "click", "span.ui-icon-close", function() {
		var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
		$( "#" + panelId ).remove();
		panelId = panelId.replace('tabs-', '');
		$("#field" + panelId).remove();
		tabs.tabs( "refresh" );
    });
});