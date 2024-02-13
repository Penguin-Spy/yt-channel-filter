/* options.js © Penguin_Spy 2024
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const settings = browser.storage.sync
const api_key = document.querySelector("#api_key")
const channel_ids = document.querySelector("#channel_ids")
const channel_handles = document.querySelector("#channel_handles")
const edit_passcode = document.querySelector("#edit_passcode")
const saved_notice = document.querySelector("#saved_notice")

/* --- OPTIONS AREA --- */
const DEFUALT_SETTINGS = {
  api_key: "none",
  channel_ids: [],
  channel_handles: [],
  passcode: ""
}

function restoreOptions() {
  settings.get(DEFUALT_SETTINGS).then(result => {
    console.log("got ", result)
    api_key.value = result.api_key

    channel_ids.value = result.channel_ids.join("\n")
    updateTextareaSize({ target: channel_ids })

    channel_handles.value = result.channel_handles.join("\n")
    updateTextareaSize({ target: channel_handles })

    edit_passcode.value = result.passcode
    if(result.passcode.length === 0) {
      revealOptions()
    }

  }).catch(e => {
    console.error("getting setting gave error - ", e)
  })
}

function saveOptions(e) {
  e.preventDefault()
  settings.set({
    api_key: api_key.value || DEFUALT_SETTINGS.api_key,
    channel_ids: channel_ids.value.split("\n"),
    channel_handles: channel_handles.value.split("\n"),
    passcode: edit_passcode.value.trim() || DEFUALT_SETTINGS.passcode
  }).then(() => {
    saved_notice.hidden = false
    setTimeout(() => saved_notice.hidden = true, 1500)
  })
}

document.addEventListener("DOMContentLoaded", restoreOptions)
document.querySelector("#options_form").addEventListener("submit", saveOptions)
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
edit_passcode.addEventListener("focus", () => edit_passcode.type = "text")
edit_passcode.addEventListener("blur", () => edit_passcode.type = "password")


/* --- PASSCODE AREA --- */
const enter_passcode = document.querySelector("#enter_passcode")
const passcode_notice = document.querySelector("#passcode_notice")

function revealOptions() {
  document.querySelector("#passcode_area").hidden = true
  document.querySelector("#options_area").hidden = false
}

function tryPasscode(e) {
  e.preventDefault()

  if(enter_passcode.value === edit_passcode.value) {
    revealOptions()
  } else {
    passcode_notice.hidden = false
    setTimeout(() => passcode_notice.hidden = true, 1500)
  }
}

document.querySelector("#passcode_form").addEventListener("submit", tryPasscode)
