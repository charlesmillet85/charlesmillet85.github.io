// Every app on the site lives here. Edit this file, then run `node build.mjs`.
//
// status:   "live"  -> shows the App Store button (needs storeUrl)
//           "soon"  -> shows "Coming soon to the App Store"
//           "open"  -> open-source project (needs repoUrl), listed under Projects
// theme:    "dark" or "light" — the colour of the app's page and tile
// accent:   the app's colour, used for buttons, links and glows
// hero:     { type: "video", src, poster } | { type: "image", src } | { type: "layers", layers: [back, middle, front] }
// All media paths are relative to /assets/.

export const site = {
  name: "Charles Millet",
  title: "Charles Millet — Apps",
  description:
    "Independent apps for iPhone, iPad, Mac, Apple TV and Apple Vision Pro, designed and built by Charles Millet.",
  url: "https://charlesmillet85.github.io/",
  email: "charlesmillet@me.com",
};

export const apps = [
  {
    slug: "home-glass",
    name: "Home Glass",
    fullName: "Home Glass for HomeKit",
    status: "live",
    storeUrl: "https://apps.apple.com/app/home-glass-for-homekit/id6817088828",
    theme: "dark",
    accent: "#ffa53a",
    accent2: "#2f7cff",
    icon: "icons/home.svg",
    platforms: ["iPhone", "iPad", "Mac", "Apple TV", "Apple Vision Pro"],
    tagline: "Your devices, one sleek app.",
    headline: "Your home,\nas it really looks.",
    intro:
      "A beautifully designed, customizable dashboard that brings your rooms, connected devices and favourite controls together in one elegant space.",
    statement:
      "Why settle for generic icons and five different apps, when your smart home dashboard could actually look like your home?",
    hero: { type: "video", src: "media/home-film.mp4", poster: "media/home-film.webp", muted: true },
    features: [
      { title: "1,400+ real devices", text: "A curated library of realistic illustrations covering popular brands, models and colours. Your devices are instantly recognizable." },
      { title: "One dashboard, many ecosystems", text: "Apple Home, Home Assistant, Matter and supported integrations such as Philips Hue, SwitchBot, Shelly, IKEA, Nuki, Somfy and Govee." },
      { title: "Every Apple device", text: "See, organize and control your home from iPhone, iPad, Mac, Apple TV and Apple Vision Pro." },
      { title: "Guided, step by step", text: "Import your rooms, connect your platforms, resolve duplicates, and let Home Glass match each device to its room and illustration." },
    ],
    story: [
      { kicker: "iPhone", title: "Your whole home in your pocket.", text: "Rooms, scenes and devices, drawn the way they really look.", image: "media/home-app-iphone.webp" },
      { kicker: "iPad", title: "A wall panel, wherever you want.", text: "Prop it up in the kitchen or the hallway and control everything at a glance.", image: "media/home-app-ipad.webp" },
      { kicker: "Mac", title: "Right there while you work.", text: "Widgets and a full dashboard on your desktop.", image: "media/home-app-mac.webp" },
      { kicker: "Apple Vision Pro", title: "Your home, all around you.", text: "Place your rooms in your space and control them with a glance and a pinch.", image: "media/home-app-vision-pro.webp" },
    ],
    gallery: [
      { src: "media/home-screens.webp", alt: "At home on every screen: iPhone, iPad, Mac, Apple TV and Apple Vision Pro" },
      { src: "media/home-duo.webp", alt: "Ready for iPhone Duo, closed or open" },
      { src: "media/home-library.webp", alt: "Find your exact model in the device library" },
      { src: "media/home-features.webp", alt: "Some of the features" },
      { src: "media/home-mac-widgets.webp", alt: "Home Glass widgets on the Mac desktop" },
    ],
    film: { src: "media/home-film.mp4", poster: "media/home-film.webp", label: "Watch the film" },
    links: { support: "https://charlesmillet85.github.io/spatial-home/", privacy: "https://charlesmillet85.github.io/spatial-home/privacy" },
    note: "Available features and integrations depend on compatible devices, platforms and connection requirements.",
  },

  {
    slug: "hello-duo",
    name: "Hello Duo",
    status: "live",
    storeUrl: "https://apps.apple.com/us/app/hello-duo/id6826110929",
    theme: "light",
    compact: true,
    accent: "#2c4c8c",
    accent2: "#f0e4d2",
    icon: "icons/hello.webp",
    platforms: ["iPhone"],
    tagline: "Give your phone a personality.",
    headline: "Hello Duo",
    kicker: "Made for iPhone Duo",
    // The film first, with its music and voices (Charles, 2026-11-18), then the name on one line.
    topFilm: { src: "media/hello-film-v8.mp4", poster: "media/hello-film-v8.webp", label: "Hello Duo film" },
    intro:
      "A silly little app for your iPhone Duo, made for a laugh. Fold it or unfold it, and your phone says something: grumpy, sweet, very British or completely unhinged.",
    statement:
      "No chatbot. No pop-ups. Two Shortcuts automations, set up once with a guide, and your Duo says its line every time you open or close it.",
    hero: { type: "none", poster: "media/hello-film-v8.webp" },
    castTitle: "Thirteen personalities.",
    castLead: "Each one with its own voice and its own lines. Here's what they say when you unfold, fold and unlock.",
    cast: [
      { img: "media/cast/grumpy.webp", name: "The grumpy iPhone", color: "#db453d", lines: ["What do you want.", "Ouch! My back!", "Can't a phone nap?"] },
      { img: "media/cast/sunny.webp", name: "The sunny iPhone", color: "#30b0c7", lines: ["Ta-da! Big screen, big smile.", "Nap time. Love you!", "Hello again, sunshine!"] },
      { img: "media/cast/butler.webp", name: "The very British iPhone", color: "#5957d6", lines: ["At your service, sir.", "Like a fine napkin, sir.", "Ah, sir. Tea?"] },
      { img: "media/cast/ai.webp", name: "The AI iPhone", color: "#0099bf", lines: ["More pixels. More me.", "Sleep mode. Dreaming of electric sheep.", "Waking up. Loading charm."] },
      { img: "media/cast/needy.webp", name: "The needy iPhone", color: "#ff2e54", lines: ["Hold me with both hands?", "Folding me? Is this a breakup?", "Don't leave again, okay?"] },
      { img: "media/cast/teenage.webp", name: "The teenage iPhone", color: "#b052de", lines: ["Literally why are you opening me.", "Fold me. I'm so done.", "Ugh. Lights. Too bright."] },
      { img: "media/cast/bossy.webp", name: "The bossy iPhone", color: "#007aff", lines: ["Two screens. Zero excuses.", "Folding? On whose authority?", "You're five minutes late."] },
      { img: "media/cast/smooth.webp", name: "The smooth iPhone", color: "#a33354", lines: ["Unfolded. Like my heart.", "Fold me gently.", "I was dreaming of you."] },
      { img: "media/cast/boomer.webp", name: "The boomer iPhone", color: "#b87a3d", lines: ["Is that a phone or a computer?", "Careful! That cost more than my car!", "In my day, phones stayed at home."] },
      { img: "media/cast/gymbro.webp", name: "The gym bro iPhone", color: "#339e4d", lines: ["Unfolded! One rep!", "Fold it, hold it, feel the burn!", "Rise and grind!"] },
      { img: "media/cast/posh.webp", name: "The posh iPhone", color: "#a8851a", lines: ["Lovely. Room for the whole yacht.", "Off to the club, then.", "Morning, darling. Brunch?"] },
      { img: "media/cast/karen.webp", name: "The Karen iPhone", color: "#e66b14", lines: ["This screen is unacceptable.", "I'm calling corporate.", "I've been on hold for hours."] },
      { img: "media/cast/influencer.webp", name: "The influencer iPhone", color: "#c7339e", lines: ["Okay, hi besties!", "Oh my God, not my good side.", "Hi! Did you see my story?"] }
    ],
    features: [
      { title: "13 personalities", text: "Grumpy, sunny, very British, AI, needy, teenage, bossy, smooth, boomer, gym bro, posh, Karen and influencer. Male and female voices for most of them. Or let Shuffle pick a new one each time." },
      { title: "Set up in a minute", text: "A guide, narrated by one of the characters, adds the two Shortcuts automations: one for unfolding, one for folding." },
      { title: "You decide when", text: "Every time, or once every few hours. On unfold, fold or unlock. Only at the times of day you choose, at the volume you choose." },
      { title: "Free to try", text: "The sunny iPhone and the gym bro in full, plus a taste of the grumpy one. Then $0.99 per character, or unlock everyone at once. No subscription, no ads, no account." },
    ],
    faq: [
      { q: "It doesn't speak when I open my phone.", a: "Open Hello Duo and follow the guide: it adds two Shortcuts automations, one for unfolding and one for folding. Settings shows a tick next to each once it has run. To hear it every time, choose “Every time” in Settings › When it speaks › How often." },
      { q: "Can I choose when it speaks?", a: "Yes: how often, on unfold, fold or unlock, only at certain times of the day, and how loud." },
      { q: "Does it work on other iPhones?", a: "It's made for iPhone Duo. On other iPhones, it speaks when you unlock." },
    ],
    links: { support: "https://charlesmillet85.github.io/hello-duo/", privacy: "https://charlesmillet85.github.io/hello-duo/privacy.html" },
  },

  {
    slug: "folio-player-plus",
    name: "Folio Player Plus",
    status: "soon",
    theme: "dark",
    accent: "#f0894a",
    accent2: "#3a3a40",
    icon: "icons/folio.webp",
    platforms: ["iPhone", "iPad"],
    tagline: "The all-in-one player for the Duo.",
    headline: "Your films.\nBoth screens.",
    intro:
      "The video player made for iPhone Duo. Open it and the film sits on one half while your library fills the other. Stand it up like a small laptop, and the picture rises to the top.",
    statement:
      "MKV, MP4 and MOV. HDR10, HLG and Dolby Vision. Your own files and servers, in one simple player, with no subscription.",
    hero: { type: "video", src: "media/folio-film.mp4", poster: "media/folio-film.webp", muted: true },
    features: [
      { title: "Made for iPhone Duo", text: "Folded or open, the app follows the screen. In laptop pose, picture on top and controls below." },
      { title: "Plays almost everything", text: "HEVC and H.264 up to 4K, HDR10, HLG and Dolby Vision. DTS and TrueHD sound converted on the fly." },
      { title: "Every source", text: "Local files, Plex, Jellyfin, Emby, SMB, WebDAV, SFTP and more, with offline downloads for the road." },
      { title: "Subtitles, your way", text: "SRT, ASS, WebVTT, PGS and VobSub, or fetched in your language. AirPlay to your TV, subtitles included." },
    ],
    gallery: [
      { src: "media/folio-still-30.webp", alt: "Folio Player Plus library with filters" },
      { src: "media/folio-still-60.webp", alt: "Folio Player Plus sending a film to the TV with AirPlay" },
      { src: "media/folio-still-80.webp", alt: "Folio Player Plus on iPhone Duo" },
    ],
    film: { src: "media/folio-film.mp4", poster: "media/folio-film.webp", label: "Watch the film" },
    links: { support: "https://charlesmillet85.github.io/folioplayerplus/support.html", privacy: "https://charlesmillet85.github.io/folioplayerplus/privacy.html" },
    note: "Plex, Jellyfin, Emby, WebDAV, SFTP and offline downloads are Plus features, free during the 14-day trial. Plex, Jellyfin and Emby are trademarks of their owners; Folio Player Plus is not affiliated with them.",
  },

  {
    slug: "relief-player",
    name: "Relief Player",
    status: "soon",
    theme: "dark",
    accent: "#f5b24a",
    accent2: "#4a2a0a",
    icon: "icons/relief.webp",
    platforms: ["Apple Vision Pro"],
    tagline: "Your films, in depth.",
    headline: "Every film.\nIn depth.",
    intro:
      "A video player for Apple Vision Pro that turns ordinary 2D films into live depth, in real time, on the device.",
    statement:
      "A screen four metres wide. Curve it, move it, dim the room around it. Then watch your own films come out of the frame.",
    hero: { type: "image", src: "media/relief-living-room.webp", poster: "media/relief-living-room.webp" },
    tileImage: "media/relief-salon.webp",
    story: [
      { kicker: "Your living room", title: "A giant screen, wherever you sit.", text: "Put on Apple Vision Pro and your film fills the wall, four metres wide.", image: "media/relief-07-salon-relief.webp" },
      { kicker: "Home", title: "Pick up where you left off.", text: "Continue watching and recently added, with the artwork and story of every title.", image: "media/relief-03-accueil.webp" },
      { kicker: "Library", title: "Your whole collection, sorted.", text: "Browse by folder, source or genre, and filter in a tap.", image: "media/relief-06-bibliotheque.webp" },
      { kicker: "Sources", title: "Every place your films live.", text: "Files and folders, network shares and video links, side by side.", image: "media/relief-01-sources.webp" },
    ],
    features: [
      { title: "Live depth", text: "Every frame is analysed on the Neural Engine and turned into depth as it plays, right on your Vision Pro." },
      { title: "Your screen, your way", text: "Choose its size and curve, lock it in place, dim the room or let your surroundings show through." },
      { title: "Your library", text: "Local files and folders, network shares and web links, MKV included. Plex, Jellyfin and Emby with Plus." },
      { title: "Subtitles and sound", text: "SRT, WebVTT, ASS, PGS and VobSub, drawn right in front of the screen, flat or curved." },
    ],
    links: { support: "https://charlesmillet85.github.io/relief/", privacy: "https://charlesmillet85.github.io/relief/privacy.html" },
  },

  {
    slug: "spatial-posts",
    name: "Spatial Posts",
    status: "live",
    storeUrl: "https://apps.apple.com/app/spatial-posts/id6817199787",
    theme: "dark",
    accent: "#4fd6ff",
    accent2: "#1b2a6b",
    icon: "icons/posts.webp",
    platforms: ["Apple Vision Pro"],
    tagline: "Your timeline, floating in your space.",
    headline: "Posts,\nin a new dimension.",
    intro:
      "The posts you follow, in a glass window you can place anywhere around you. Photos gain depth as you scroll, videos play in a private cinema, and long threads open in a calm reading window.",
    statement:
      "Stop on a photo and it comes alive in 3D. Start a video and the room dims around a giant screen.",
    hero: { type: "video", src: "media/posts-loop.mp4", poster: "media/posts-loop.webp", muted: true },
    features: [
      { title: "Photos in 3D and Spatial", text: "Choose 2D, 3D relief or full Spatial. Upcoming photos are prepared ahead so scrolling stays smooth." },
      { title: "A cinema for videos", text: "Press the TV button and watch on a giant screen while the room dims around you." },
      { title: "A reading window", text: "Long threads open beside your timeline in a calm, serif layout with adjustable text size." },
      { title: "Safe by design", text: "Report or block from the shield button, reports reviewed within 24 hours. Your password never reaches the app. For adults, 18+." },
    ],
    gallery: [{ src: "media/posts-timeline.webp", alt: "Spatial Posts timeline in 3D on Apple Vision Pro" }],
    links: { support: "https://charlesmillet85.github.io/spatial-posts/", privacy: "https://charlesmillet85.github.io/spatial-posts/privacy" },
    note: "Spatial Posts is an independent app and is not affiliated with or endorsed by X Corp.",
  },

  {
    slug: "social-spatial-3d",
    name: "Social Spatial 3D",
    status: "live",
    storeUrl: "https://apps.apple.com/app/social-spatial-3d/id6816729352",
    theme: "dark",
    accent: "#c86bff",
    accent2: "#ff8a5c",
    icon: "icons/ss3d.webp",
    platforms: ["Apple Vision Pro"],
    tagline: "Your Instagram, in 3D on Vision Pro.",
    headline: "Your photos.\nNow with depth.",
    intro:
      "The immersive way to view your Instagram photos and videos on Apple Vision Pro. Every photo and video is converted from 2D to 3D or Spatial in real time, entirely on your device.",
    statement:
      "Your own feed, profiles and messages, in a native visionOS window. Tap once, and every photo gains real depth.",
    hero: { type: "video", src: "media/ss3d-loop.mp4", poster: "media/ss3d-loop.webp", muted: true },
    tileImage: "media/ss3d-stories.webp",
    features: [
      { title: "2D, 3D or Spatial", text: "Switch every photo with one tap, and choose how strong the 3D feels with a simple slider." },
      { title: "Made for visionOS", text: "Launch it from your Home View. A native window and controls, not a browser look." },
      { title: "Everything you're used to", text: "Your feed, profiles, Reels and direct messages work as usual, with Reload and Settings always within reach." },
      { title: "Private by design", text: "No account, no analytics, no tracking. You sign in on Instagram's own page, and the 3D conversion never leaves your Vision Pro." },
    ],
    gallery: [
      { src: "media/ss3d-stories.webp", alt: "A photo in 3D in Social Spatial 3D" },
      { src: "media/ss3d-reels.webp", alt: "Reels with depth on Apple Vision Pro" },
      { src: "media/ss3d-feed.webp", alt: "The immersive feed" },
      { src: "media/ss3d-gallery.webp", alt: "A profile grid in 3D" },
    ],
    links: { support: "mailto:charlesmillet@me.com?subject=Social%20Spatial%203D" },
    note: "Instagram is a trademark of Meta Platforms, Inc. Social Spatial 3D is an independent app and is not affiliated with, endorsed, sponsored or approved by Instagram or Meta Platforms, Inc.",
  },

  {
    slug: "phone-remote",
    name: "Phone Remote",
    status: "open",
    repoUrl: "https://github.com/Whatevernumberyouwant2255/Phone-remote",
    license: "Apache-2.0",
    theme: "light",
    accent: "#e8516f",
    accent2: "#6b5cff",
    icon: "icons/remote.webp",
    platforms: ["iPhone", "Mac", "Apple Vision Pro"],
    tagline: "Your iPhone, in a window on Vision Pro or Mac.",
    headline: "Your iPhone.\nAnywhere you look.",
    intro:
      "An open-source experiment that shows your iPhone's live screen in a window on Apple Vision Pro or Mac, and lets you use it from there.",
    statement:
      "No server, no account, no internet. Your devices find each other on your Wi-Fi and connect directly, encrypted with a pairing code.",
    hero: { type: "video", src: "media/remote-loop.mp4", poster: "media/remote-loop.webp", muted: true },
    features: [
      { title: "Look and pinch", text: "On Apple Vision Pro, look and pinch to tap, pinch and drag to swipe." },
      { title: "Click and type", text: "On Mac, click to tap, scroll to swipe, and type or paste from your keyboard." },
      { title: "Private by design", text: "Local Wi-Fi only, with TLS and a key derived from an 8-character pairing code." },
      { title: "Open source", text: "Read the code, build it yourself. A personal project, provided as is." },
    ],
    film: { src: "media/remote-film.mp4", poster: "media/remote-film.webp", label: "Watch the overview" },
    note: "A personal, experimental project, provided as is, without any warranty. Not on the App Store: controlling the iPhone relies on Apple's developer testing tools.",
  },
];
