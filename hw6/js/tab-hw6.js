$( function() {
	tabCounter = 1;

	var tabs = $("#tabs").tabs();

	$("#car-compare-data").on("change", function() {
		addTab();
		event.preventDefault();
	});

	tabs.on( "click", "span.ui-icon-close", function() {
		var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
		$( "#" + panelId ).remove();
		panelId = panelId.replace('tabs-', '');
		$("#field" + panelId).remove();
		tabs.tabs( "refresh" );
    });
 
	tabs.on( "keyup", function( event ) { 
		if ( event.altKey && event.keyCode === $.ui.keyCode.BACKSPACE ) {
			var panelId = tabs.find( ".ui-tabs-active" ).remove().attr( "aria-controls" );
			$( "#" + panelId ).remove();
			panelId = panelId.replace('tabs-', '');
			$("#field" + panelId).remove();
			tabs.tabs( "refresh" );
      	}
    });
});