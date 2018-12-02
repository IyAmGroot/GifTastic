var topics = [
  "chris farley",
  "hodor",
  "fainting goats",
  "michael scott",
  "zombies",
  "mustang",
  "audi",
  "ironman",
  "avengers",
  "tyrion lannister",
  "wolverines",
  "honey badger",
  "sopranos",
  "redskins",
  "fishing"
];

$(document).ready(function() {
  loadTopics();
  $("#searchButton").on("click", function() {
    var newTopic = $("#newTopic").val();
    topics.push(newTopic);
    loadTopics();
  });

  $(document).on("click", ".topicBtn", function() {
    // $("#gifZone").empty(); --Removed this as part of bonus to not overwrite gifs
    getGiphy($(this).text());
  });
});
$(document).on("click", ".loadedImg", function() {
  if ($(this).attr("data-alive") === "off") {
    $(this).attr("src", $(this).attr("data-live"));
    $(this).attr("data-alive", "on");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-alive", "off");
  }
});

function loadTopics() {
  $("#buttonZone").empty();
  for (var i = 0; i < topics.length; i++) {
    createTopicButton(topics[i]);
  }
}

function createTopicButton(btnText) {
  var newButton = $("<button/>");
  newButton.text(btnText);
  newButton.addClass("topicBtn");
  $("#buttonZone").append(newButton);
}
function getGiphy(btnText) {
  var param = btnText.split(" ").join("-");
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    param +
    "&api_key=aSvEkzeWO3sni99lPvpPlFvv6zvFdWM0&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    for (var i = 0; i < response.data.length; i++) {
      //set response object data values to variables
      var stillImg = response.data[i].images.original_still.url;
      var liveImg = response.data[i].images.original.url;
      var rtng = response.data[i].rating;
      var imgTitle = response.data[i].title;

      //create and style html elements to be added to page
      var giphyRtg = $("<h6/>").text("Rating:  " + rtng);
      var giphyTitle = $("<h6/>").text("Title:  " + imgTitle);
      var giphyDiv = $("<div/>").addClass("iBlock");

      /*chaining functions:  add class and attr
      loadedImg is the class referenced in the page on click event to start/stop animation
      attr setting both standard and user defined attributes */
      var giphyImg = $("<img/>")
        .addClass("loadedImg ")
        .attr({
          src: stillImg,
          alt: btnText + " gif",
          "data-still": stillImg,
          "data-live": liveImg,
          "data-alive": "off"
        });

      //add dynamically created elements to page
      $("#gifZone").prepend(giphyDiv);
      $(giphyDiv).append(giphyRtg);
      $(giphyDiv).append(giphyImg);
      $(giphyDiv).append(giphyTitle);
    }
  });
}
