# GifTastic

Goal
Return gifs from the Giphy website.

How Goal Was Solved
Retrieved content through the use of the Giphy API.

Technical Details
Created a series of buttons with categories already assigned when the user navigates to the page using jQuery.  Additional buttons were created by dynamically creating button HTML elements using jQuery.  

Clicking on the button executes a jQuery .ajax function call that sends a query string to Giphy API.  The category of the gifs requested is determined by the text value of the button that was clicked.  The logic takes the static image and sets it as the default image.  The gif rating and title are also displayed.  Clicking on the image will replace the static image with the animated gif.  Clicking the animated gif will set the static image to be displayed.

Bonus items
1.  Clicking topic buttons will not overwrite existing gifs.  gifDiv is prepended to #gifZone, then elements are appended to gifDiv. New elements are displayed at the top, and existing are pushed down.

2.  Display gif Title.
