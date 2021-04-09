// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save Bookmark
function saveBookmark(e) {

    //Get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    // Storing the info in an object
    var bookmark = {
        name: siteName,
        url: siteUrl,
    }

    /*
    //Local storage test
    localStorage.setItem('Michael', "Michael Greaves was kinda better than DANZIG in my humble opinion.");
    console.log(localStorage.getItem('Michael'));
    localStorage.removeItem('Michael');
    console.log(localStorage.getItem('Michael'));
    */

    // Test if bookmarks = null
    if (localStorage.getItem('bookmarks') === null) {
        // Init array
        var bookmarks = [];
        // Add to array
        bookmarks.push(bookmark);
        // set to local storage, take JSON array and change it to a string before saving in local storage.
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        // Get bookmarks from local storage, turn it into JSON
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // Add bookmark to array
        bookmarks.push(bookmark);
        // Re-set back to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    // Prevent form from submitting
    e.preventDefault();
}

// Delete Bookmark
function deleteBookmark(url) {
    console.log(url);
}

// Fetch bookmarks
function fetchBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // Get output ID
    var bookmarksResults = document.getElementById('bookmarksResults');
    // Build output
    bookmarksResults.innerHTML = '';
    // Loop through bookmarks in local storage and output 1 by 1 into the div
    for (i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="well">' +
            '<h3>' + name + '</h3>' +
            '<a class="btn btn-default" target="_blank" href="' + url + '">' + 'Visit' + '</a>' +
            '<a onclick = "deleteBookmark(\' ' + url + '\')" class="btn btn-danger" href="#">' + 'Delete' + '</a>' +
            '</div>';
    }
}