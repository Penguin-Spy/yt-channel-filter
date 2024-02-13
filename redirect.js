/* options.js © Penguin_Spy 2024
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

if(document.location.hostname !== "www.youtube.com") {
  console.info(`[yt-channel-filter] url '${url.href}' is not allowed`)
  document.location = "https://youtube.com/feed/subscriptions"
  history.replaceState(null, "", "/feed/subscriptions")
}
