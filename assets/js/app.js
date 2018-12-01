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
var flip;

$(document).ready(function() {
  loadTopics();
  $("#searchButton").on("click", function() {
    var newTopic = $("#newTopic").val();
    //createTopicButton(newTopic);
    topics.push(newTopic);
    loadTopics();
  });

  // for (var i = 0; i < topics.length; i++) {
  //   createTopicButton(topics[i]);
  // }
  $(document).on("click", ".topicBtn", function() {
    $("#gifZone").empty();
    getGiphy($(this).text());
  });
});
$(document).on("click", ".loadedImg", function() {
  // toggleImage();
  var x = $(this).attr("alive");

  console.log(x);
  if ($(this).attr("alive") === "off") {
    console.log("alive");
    $(this).attr("src", $(this).attr("live"));
    flip = "on";
  } else {
    console.log("not alive");
    $(this).attr("src", $(this).attr("still"));
    flip = "off";
  }
  $(this).attr("alive", flip);
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
      var giphyRtg = $("<p/>");
      var lineBreak = $("<br/>");
      giphyRtg.text("Rating:  " + response.data[i].rating);
      var giphyImg = $("<img/>");
      giphyImg.attr("src", response.data[i].images.original_still.url);
      giphyImg.attr("still", response.data[i].images.original_still.url);
      giphyImg.attr("live", response.data[i].images.original.url);
      giphyImg.attr("alive", "off");
      giphyImg.addClass("loadedImg "); //loadedImg is the class that is needed to animage img.
      //Display option 1 comment out next line to show gifs how i want but w/o rating
      //$("#gifZone").append(giphyImg);
      //Adding rating text caused each to display on its own line.
      //Adding rating changes the way gifs are displayed.  why?

      //Next two lines change things somewhat but not the way I want.
      //giphyImg.addClass("loadedImg myFloat");
      //giphyRtg.addClass("myFloat");
      $("#gifZone").append(giphyRtg);
      giphyRtg.append(lineBreak);
      giphyRtg.append(giphyImg);
    }
  });
}
