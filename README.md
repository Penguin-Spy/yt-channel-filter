# YouTube Channel Filter
A Firefox extension that restricts the ability to watch youtube videos based on which channel uploaded it. Intended to allow a child or younger sibling to experience the wonders of the internet without letting them browse completly unrestricted. Currently in beta and not particularly user-friendly to configure.  

Requires an [API key for the Youtube API V3](https://developers.google.com/youtube/v3/getting-started) (follow steps 1-3 to get an API key).  
Must be configured with both the channel ID and channel handle of each channel that should be allowed ((stupid) youtube API limitation). It's recommended to also subscribe to each of these channels, as the homepage (and most disallowed pages) are redirected to the subscriptions page.  
Currently also blocks commenting & replying; this will likely be optional in the future.  
The options page can be protected by a passcode, though this can be easily bypassed via inspect element; it's security via "i hope they don't think to try that".

## Permissions
- "Access your data for sites in the youtube.com domain" - for redirecting all youtube subdomains (studio, music, etc.) to www.youtube.com
- "Access your data for sites in the youtubekids.com domain" - same deal for youtube kids (it's somehow worse than regular youtube)
- "Access your data for youtube.googleapis.com" - access the Youtube API V3 to determine the channel that uploaded a video (for filtering)
- "Access your data for www.youtube.com" - filter which videos and channel pages can be viewed

This extension does not collect any analytics or personal data (i literally do not care whether or not you use this :)  
All settings are stored in the "sync" Storage, and are therefore stored in your Firefox account & will be synced to other devices.

# License
Copyright © Penguin_Spy 2024  

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.

Firefox is a trademark of the Mozilla Foundation in the U.S. and other countries.  
YouTube is a trademark of Google LLC.
