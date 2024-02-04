const ALLOWED_PATHS = ["/feed/subscriptions", "/feed/history", "/feed/channels", "/results", "/account", "/account_notifications", "/account_playback", "/account_privacy"]

// handles initial load and in-page navigation
async function handleNavigation(url) {
  console.log("[yt-channel-filter] filtering", url)

  // filter watching videos
  if(url.pathname === "/watch") {
    const video_id = url.searchParams.get("v")

    const settings = await browser.storage.sync.get(["api_key", "channel_ids"])

    if(settings.api_key === "none" || !settings.api_key) {
      console.warn("[yt-channel-filter] no api key set! cannot filter")
      return
    }

    const res = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${video_id}&key=${settings.api_key}`)
    if(res.status !== 200) {
      console.error("[yt-channel-filter] fetching youtube api failed - ", res)
      return
    }

    const data = await res.json()
    const snippet = data.items[0].snippet
    const channel_id = snippet.channelId

    if(!settings.channel_ids.includes(channel_id)) {
      console.info(`[yt-channel-filter] channel id '${channel_id}' of video '${video_id}' is not in allowed list`)
      document.location = browser.runtime.getURL("blocked.html") + `?c=${channel_id}&v=${video_id}&ct=${snippet.channelTitle}&vt=${snippet.title}`
    } else {
      console.info(`[yt-channel-filter] channel id '${channel_id}' of video '${video_id}' is allowed`)
    }

    // filter browsing channels (TODO: handle the @handle form of urls too (allow them for allowed channels, right now they get blocked))
  } else if(url.pathname.startsWith("/channel")) {
    const channel_id = url.pathname.split("/")[2]
    const settings = await browser.storage.sync.get(["channel_ids"])

    if(!settings.channel_ids.includes(channel_id)) {
      console.info(`[yt-channel-filter] channel id '${channel_id}' is not in allowed list`)
      document.location = browser.runtime.getURL("blocked.html") + '?c=' + channel_id
    } else {
      console.info(`[yt-channel-filter] channel id '${channel_id}' is allowed`)
    }

    // block everything else that's not an allowed path
  } else if(!ALLOWED_PATHS.includes(url.pathname)) {
    console.info(`[yt-channel-filter] path '${url.pathname}' is not allowed`)
    history.replaceState(null, "", "/feed/subscriptions")
    document.location = "/feed/subscriptions"
  }
}

// initial load
handleNavigation(new URL(document.location))

// navigation event
document.addEventListener("yt-navigate-start", e => {
  handleNavigation(new URL(e.detail.url, document.location))
})
