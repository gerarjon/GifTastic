$(document).ready(function() {
    // GLOBAL VARIABLES
    var button;

    // Array of Topics
    var topics = ["the office", "shiba", "tzuyu", "pokemon", "jennie", "danmachi", "yugioh", "gordan ramsay"];
    
    // Function to add buttons of topics to the page
    var displayButton = (arrayToUse, classToAdd, areaToAdd) => {
        // empties the area so that there are no duplicate buttons
        $(areaToAdd).empty();
        // loops through array and adds a button with the name of the topic
        for ( var i = 0; i < arrayToUse.length; i++ ) {
            button = $("<button>");
            button.addClass(classToAdd);
            button.attr("data-type", arrayToUse[i]);
            button.text(`#${arrayToUse[i]}`);
            $(areaToAdd).append(button);
        }
    }

    // .gif-button on click
    $(document).on("click", ".gif-button", function() {
        $(".gif-button").removeClass("active");
        $(this).addClass("active");

        //generates a random number between 1 and 25
        var randomNumber = Math.floor(Math.random() * 25) + (Math.floor(Math.random() * 10));
        // the offset will be a random number between 1-25 + 1-10
        var offset = `&offset=${randomNumber}`;

        var type = $(this).attr("data-type");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=ah4zNuFUTA4wcUfYLEGQtw5clQ5ArL8s&limit=10" + offset;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            var results = response.data;
            // loops through ther response
            for (var i = 0; i < results.length; i++) {
                // for each response
                // create a div with .gif-item
                var gifItem = $("<div class=\"gif-item\">");
                var rating = results[i].rating;
                var title = results[i].title;
                var t = $("<p>").text(`Title: ${title}`);
                var r = $("<p>").text(`Rating: ${rating}`);
                var animated = results[i].images.fixed_height.url;
                var still = results[i].images.fixed_height_still.url;

                // creates the gif with the "still" and "animate" data attr
                var image = $("<img>");
                image.attr("src", still)
                image.attr("data-still", still);
                image.attr("data-animate", animated);
                image.attr("data-state", "still");
                image.addClass("gif");

                // Appends gif to the gif container
                gifItem.append(image);
                gifItem.append(t);
                gifItem.append(r);
                $("#gif-container").prepend(gifItem);
            }
        })
    })

    // .gif on click 
    $(document).on("click", ".gif", function() {
        var state = $(this).attr("data-state");
        // if
        state === "still" ? (
            $(this).attr("src", $(this).attr("data-animate")),
            $(this).attr("data-state", "animate")
        ): ( 
        // else
            $(this).attr("src", $(this).attr("data-still")),
            $(this).attr("data-state", "still")
        );
    })

    // creating new buttons 
    $("#add-gif").on("click", function(e) {
        e.preventDefault();
        var newTopic = $("input").val().trim();
        // returns false if search bar is empty
        if (newTopic === "") {
            alert("Please enter a gif topic");
            return false;
        }
        topics.push(newTopic);
        displayButton(topics, "gif-button", "#button-container");
    })

    // scroll to top function that hides the scroll button 
    $(window).scroll(function() {
        if ($(this).scrollTop() > 200 ) {
            $("#scroll-to-top").show();
        } else {
            $("#scroll-to-top").hide();
        }
    })

    // when button is pressed, will scroll to top of document
    $("#scroll-to-top").on("click", function(e) {
        e.preventDefault();
        $("html, body").animate({scrollTop:0}, "200");
      });

    // Running displayButton();
    displayButton(topics, "gif-button", "#button-container");
})