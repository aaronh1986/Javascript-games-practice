// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

//Save bookmark
function saveBookmark(e) {
    // Get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    if (!siteName || !siteUrl) {
        alert('Please, will you fill in the ******* form.');
        return false;
    }

    var bookmark = {
        name: siteName,
        url: siteUrl,
    }

    /*
    //Local storage text(Local storage only stores strings)
    // Below is standard way of getting info from local storage
    localStorage.setItem('test', 'Hello world');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test'));
    */

    //We want to save the bookmark in local storage
    //But first we have to check if there's a bookmark value already there
    if (localStorage.getItem('bookmarks') === null) {

        //Init array
        var bookmarks = [];
        //Add to array
        bookmarks.push(bookmark);

        //Set to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } /* So to add something else if it's already null we do this */
    else {
        //Get bookmarks from localStorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // Add bookmark to array
        bookmarks.push(bookmark);
        // Re-set back to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    //Clear form after submission
    document.getElementById('myForm').reset();

    //Re-fetch bookmarks
    fetchBookmarks();

    //Prevent form from submitting
    e.preventDefault();
}

// Delete Bookmark
function deleteBookmark(url) {
    //Must now loop through local Storage array. If passed in url matches one in localStorage we will splice it out.
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Loop through bookmarks
    for (i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url) {
            //Remove from array
            bookmarks.splice(i, 1);
        }
    }
    // Re-set the local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    //Re-fetch bookmarks
    fetchBookmarks();
}




//We need to fetch bookmarks from localStorage and display them onscreen in the div
function fetchBookmarks() {
    // This simply defines it so on body in HTML file we need to put onload=fetchBookmarks() in <body> tag
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // Get output Id
    var bookmarksResults = document.getElementById('bookmarksResults');

    //Build output
    bookmarksResults.innerHTML = '';

    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<h3>' + name +
            ' <a class="btn btn-default" target="_blank" href="' + url + '">Visit</a> ' +
            ' <a onclick="deleteBookmark(\'' + url + '\')" class="btn btn-danger" href="#">Delete</a> ' +
            '</h3>' +
            '</div>';
    }
}