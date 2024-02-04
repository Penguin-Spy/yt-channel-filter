if(document.location.hostname !== "www.youtube.com") {
  console.info(`[yt-channel-filter] url '${url.href}' is not allowed`)
  document.location = "https://youtube.com/feed/subscriptions"
  history.replaceState(null, "", "/feed/subscriptions")
}
