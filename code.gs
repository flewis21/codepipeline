function doGet() {
  return HtmlService
      .createTemplateFromFile('index')
      .evaluate();
}


/**
 * This function retrieves the user's uploaded videos by:
 * 1. Fetching the user's channel's.
 * 2. Fetching the user's "uploads" playlist.
 * 3. Iterating through this playlist and logs the video IDs and titles.
 * 4. If there is a next page of resuts, fetching it and returns to step 3.
 */
function retrieveMyUploads() {
  var results = YouTube.Channels.list('contentDetails', {
    mine: true
  });

  for (var i = 0; i < results.items.length; i++) {
    var item = results.items[i];
    // Get the channel ID - it's nested in contentDetails, as described in the
    // Channel resource: https://developers.google.com/youtube/v3/docs/channels
    var playListId = item.contentDetails.relatedPlaylists.uploads;
    var nextPageToken;
    while (nextPageToken !== null); {
      var playlistResponse = YouTube.PlaylistItems.list('snippet', {
        playlistID: playListId,
        maxResults: 25,
        pageToken: nextPageToken
      });

  for (var j = 0; j < playlistResponse.items.length; j++) {
    var playlistItem = playlistResponse.items[j];
    Logger.log('[%s] Title: %s', 
      playlistItem.snippit.resourceId.videoId,
      playlistItem.snippet.title);

  }
  nextPageToken = playlistResponse.nextPageToken;p
    }
  }
}


/**
 * This sample subscribes the user to the Google Developers channel on YouTube.
 */
function addSubscription() {
  // Replace this channel ID with the channel ID you want to subscribe to
  var channelId = ('UC6DIsv9CTQTUvdo0qCzmYrQ');
  var resource = {
    snippet: {
      resourceId: {
        kind: 'youtube#channel',
        channelId: channelId
      }
    }
  };

  try {
    var response = YouTube.Subscriptions.insert(resource, 'snippet');
    Logger.log(response);
  } catch (e) {
    if (e.message.match('subscriptionDuplicate')) {
      Logger.log('Cannot subscribe; already subscribed to channel: ' +
          channelId);
    } else {
      Logger.log('Error adding subscription: ' + e.message);
    }
  }
}

// Creates an import or include function so files can be added
// inside the main index.
function include(filename){
  return HtmlService.createHtmlOutputFromFile(filename)
    .getContent();
};
