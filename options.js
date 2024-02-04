const settings = browser.storage.sync
const api_key = document.querySelector("#api_key")
const channel_ids = document.querySelector("#channel_ids")
const channel_handles = document.querySelector("#channel_handles")
const saved_notice = document.querySelector("#saved_notice")

const DEFUALT_SETTINGS = {
  api_key: "none",
  channel_ids: [],
  channel_handles: []
}

function restoreOptions() {
  settings.get(DEFUALT_SETTINGS).then(result => {
    console.log("got ", result)
    api_key.value = result.api_key

    channel_ids.value = result.channel_ids.join("\n")
    updateTextareaSize({ target: channel_ids })

    channel_handles.value = result.channel_handles.join("\n")
    updateTextareaSize({ target: channel_handles })

  }).catch(e => {
    console.error("getting setting gave error - ", e)
  })
}

function saveOptions(e) {
  e.preventDefault()
  settings.set({
    api_key: api_key.value || DEFUALT_SETTINGS.api_key,
    channel_ids: channel_ids.value.split("\n"),
    channel_handles: channel_handles.value.split("\n")
  }).then(() => {
    saved_notice.hidden = false
    setTimeout(() => saved_notice.hidden = true, 1500)
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

channel_ids.addEventListener("input", updateTextareaSize)
channel_handles.addEventListener("input", updateTextareaSize)
updateTextareaSize({ target: channel_ids })
updateTextareaSize({ target: channel_handles })
