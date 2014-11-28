/**
 * Created by liu on 11/28/14.
 */
$(document).ready(function(){
    var highlightCurrentPage = function(){
        // this will get the full URL at the address bar
        var url = window.location.href;

        // passes on every "a" tag
        $("#container-fluid a").each(function() {
            // checks if its the same on the address bar
            if (url == (this.href)) {
                $(this).closest("li").addClass("active");

            }
        });
    }

    highlightCurrentPage();

});
