const settings = browser.storage.sync
const api_key = document.querySelector("#api_key")
const video_ids = document.querySelector("#video_ids")
const channel_ids = document.querySelector("#channel_ids")
const saved_notice = document.querySelector("#saved_notice")

const DEFUALT_SETTINGS = {
  api_key: "none",
  DEBUG_urls: ["blue"],
  channel_ids: []
}

function restoreOptions() {
  settings.get(DEFUALT_SETTINGS).then(result => {
    console.log("got ", result)
    const id_list = result.DEBUG_urls.join("\n")
    video_ids.value = id_list

    api_key.value = result.api_key

    const channel_ids_list = result.channel_ids.join("\n")
    channel_ids.value = channel_ids_list

  }).catch(e => {
    console.error("getting setting gave error - ", e)
  })
}

function saveOptions(e) {
  e.preventDefault()
  settings.set({
    DEBUG_urls: video_ids.value.split("\n"),
    api_key: api_key.value || DEFUALT_SETTINGS.api_key,
    channel_ids: channel_ids.value.split("\n")
  }).then(() => {
    console.log("saved", video_ids.value, channel_ids.value)
    saved_notice.hidden = false
    setTimeout(() => saved_notice.hidden = true, 2000)
  })
}

document.addEventListener("DOMContentLoaded", restoreOptions)
document.querySelector("form").addEventListener("submit", saveOptions)
document.addEventListener("keydown", e => {
  if(e.code === "KeyS" && e.ctrlKey) {
    saveOptions(e)
  }
})

function updateTextareaSize(e) {
  const textarea = e.target
  const items = textarea.value.split("\n").length
  textarea.rows = items
}

video_ids.addEventListener("input", updateTextareaSize)
channel_ids.addEventListener("input", updateTextareaSize)
updateTextareaSize({ target: video_ids })
updateTextareaSize({ target: channel_ids })
