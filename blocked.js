/* blocked.js © Penguin_Spy 2024
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const back_button = document.getElementById("back")
if(history.length > 2) {
  back_button.hidden = false
  back_button.addEventListener("click", () => {
    history.go(-2)
  })
}

const reason = document.getElementById("reason")
const video_id_span = document.getElementById("video_id")
const channel_id_span = document.getElementById("channel_id")

const query = new URLSearchParams(document.location.search)
const video_id = query.get("v")
const video_title = query.get("vt")
const channel_id = query.get("c")
const channel_title = query.get("ct")
const previousUrl = query.get("prev")

if(video_id) {
  reason.textContent = `watching the video "${video_title}" by "${channel_title}" is not allowed.`
  video_id_span.textContent = video_id
  channel_id_span.textContent = channel_id
} else if(channel_id) {
  reason.textContent = `viewing the channel "${channel_id}" is not allowed.`
  channel_id_span.textContent = channel_id
}
