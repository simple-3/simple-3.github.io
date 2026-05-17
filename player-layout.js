let searchTimer = null;
const GAME_CATEGORIES = window.GAME_CATEGORIES || {};
const RECENTS_KEY = "recentGames";
const RECENTS_LIMIT = 24;
const FAVORITES_KEY = "favoriteGames";
const TAB_DISGUISE_KEY = "backdoorlabs_tab_disguise";
const STATS_KEY = "backdoorlabs_stats";
const GAME_PLAY_MIN_MS = 3000;
const defaultTabTitle = document.title;
let gameSessionStartedAt = null;
let gameSessionTracked = false;
let currentVisitElapsedMs = 0;
let currentVisitCounted = false;
const GAME_PAGES = [
    {
        "file": "slope.html",
        "logo": "../game%20logos/slope.png",
        "title": "Slope"
    },
    {
        "file": "2048.html",
        "logo": "../game%20logos/2048.png",
        "title": "2048"
    },
    {
        "file": "moto-x3m.html",
        "logo": "../game%20logos/moto-x3m.png",
        "title": "Moto X3M"
    },
    {
        "file": "basket-random.html",
        "logo": "../game%20logos/basket-random.png",
        "title": "Basket Random"
    },
    {
        "file": "run-3.html",
        "logo": "../game%20logos/run-3.png",
        "title": "Run 3"
    },
    {
        "file": "granny.html",
        "logo": "../game%20logos/granny.png",
        "title": "Granny"
    },
    {
        "file": "baldi's-basics.html",
        "logo": "../game%20logos/baldis-basics.png",
        "title": "Baldi's Basics"
    },
    {
        "file": "bitlife.html",
        "logo": "../game%20logos/bitlife.png",
        "title": "Bitlife"
    },
    {
        "file": "papas-pizzaria.html",
        "logo": "../game%20logos/papas-pizzeria.png",
        "title": "Papa's Pizzeria"
    },
    {
        "file": "retro-bowl.html",
        "logo": "../game%20logos/retro-bowl.png",
        "title": "Retro Bowl"
    },
    {
        "file": "monkey-mart.html",
        "logo": "../game%20logos/monkey-mart.png",
        "title": "Monkey Mart"
    },
    {
        "file": "crossy-road.html",
        "logo": "../game%20logos/crossy-road.png",
        "title": "Crossy Road"
    },
    {
        "file": "duck-life-2.html",
        "logo": "../game%20logos/duck-life-2.png",
        "title": "Duck Life 2"
    },
    {
        "file": "wordle.html",
        "logo": "../game%20logos/wordle.png",
        "title": "Wordle"
    },
    {
        "file": "five-nights-at-epstein's.html",
        "logo": "../game%20logos/five-nights-at-epsteins.png",
        "title": "Five Nights at Epstein's"
    },
    {
        "file": "geometry-dash-subzero.html",
        "logo": "../game%20logos/geometry-dash-subzero.png",
        "title": "Geometry Dash SubZero"
    },
    {
        "file": "block-blast.html",
        "logo": "../game%20logos/block-blast.png",
        "title": "Block Blast"
    },
    {
        "file": "plants-vs-zombies.html",
        "logo": "../game%20logos/plants-vs-zombies.png",
        "title": "Plants vs Zombies"
    },
    {
        "file": "subway-surfers.html",
        "logo": "../game%20logos/subway-surfers.png",
        "title": "Subway Surfers"
    },
    {
        "file": "btd1.html",
        "logo": "../game%20logos/btd1.png",
        "title": "Bloons Tower Defense 1"
    },
    {
        "file": "btd2.html",
        "logo": "../game%20logos/btd2.png",
        "title": "Bloons Tower Defense 2"
    },
    {
        "file": "btd3.html",
        "logo": "../game%20logos/btd3.png",
        "title": "Bloons Tower Defense 3"
    },
    {
        "file": "btd4.html",
        "logo": "../game%20logos/btd4.png",
        "title": "Bloons Tower Defense 4"
    },
    {
        "file": "btd5.html",
        "logo": "../game%20logos/btd5.webp",
        "title": "Bloons Tower Defense 5"
    },
    {
        "file": "fnaf1.html",
        "logo": "../game%20logos/fnaf1.png",
        "title": "Five Nights at Freddy's 1"
    },
    {
        "file": "drive-mad.html",
        "logo": "../game%20logos/drive-mad.png",
        "title": "Drive Mad"
    },
    {
        "file": "fnaf2.html",
        "logo": "../game%20logos/fnaf2.png",
        "title": "Five Nights at Freddy's 2"
    },
    {
        "file": "fnaf3.html",
        "logo": "../game%20logos/fnaf3.png",
        "title": "Five Nights at Freddy's 3"
    },
    {
        "file": "fnaf4.html",
        "logo": "../game%20logos/fnaf4.png",
        "title": "Five Nights at Freddy's 4"
    },
    {
        "file": "soccer-random.html",
        "logo": "../game%20logos/soccer-random.png",
        "title": "Soccer Random"
    },
    {
        "file": "boxing-random.html",
        "logo": "../game%20logos/boxing-random.png",
        "title": "Boxing Random"
    },
    {
        "file": "volley-random.html",
        "logo": "../game%20logos/volley-random.png",
        "title": "Volley Random"
    },
    {
        "file": "head-soccer.html",
        "logo": "../game%20logos/head-soccer.png",
        "title": "Head Soccer"
    },
    {
        "file": "adventure-capatilist.html",
        "logo": "../game%20logos/adventurre-capatilist.png",
        "title": "Adventure Capitalist"
    },
    {
        "file": "happy-wheels.html",
        "logo": "../game%20logos/happy-wheels.png",
        "title": "Happy Wheels"
    },
    {
        "file": "minecraft.html",
        "logo": "../game%20logos/minecraft.png",
        "title": "Minecraft"
    },
    {
        "file": "wheelie-life.html",
        "logo": "../game%20logos/wheelie-life.png",
        "title": "Wheelie Life"
    },
    {
        "file": "tiny-fishing.html",
        "logo": "../game%20logos/tiny-fishing.png",
        "title": "Tiny Fishing"
    },
    {
        "file": "melon-sandbox.html",
        "logo": "../game%20logos/melon-sandbox.png",
        "title": "Melon Sandbox"
    },
    {
        "file": "snow-rider-3d.html",
        "logo": "../game%20logos/snow-rider-3d.png",
        "title": "Snow Rider 3D"
    },
    {
        "file": "drift-boss.html",
        "logo": "../game%20logos/drift-boss.png",
        "title": "Drift Boss"
    },
    {
        "file": "among-us.html",
        "logo": "../game%20logos/among-us.png",
        "title": "Among Us"
    },
    {
        "file": "little-alchemy-2.html",
        "logo": "../game%20logos/little-alchemy-2.png",
        "title": "Little Alchemy 2"
    },
    {
        "file": "1v1-lol.html",
        "logo": "../game%20logos/1v1-lol.png",
        "title": "1v1 LOL"
    },
    {
        "file": "cookie-clicker.html",
        "logo": "../game%20logos/cookie-clicker.png",
        "title": "Cookie Clicker"
    },
    {
        "file": "ultrakill.html",
        "logo": "../game%20logos/ultrakill.png",
        "title": "UltraKill"
    },
    {
        "file": "rocket-league.html",
        "logo": "../game%20logos/rocket-league.png",
        "title": "Rocket League"
    },
    {
        "file": "tabs.html",
        "logo": "../game%20logos/tabs.png",
        "title": "TABS"
    },
    {
        "file": "crazy-cattle-3d.html",
        "logo": "../game%20logos/crazy-cattle-3d.png",
        "title": "Crazy Cattle 3D"
    },
    {
        "file": "terraria.html",
        "logo": "../game%20logos/terraria.png",
        "title": "Terraria"
    },
    {
        "file": "survivor-io.html",
        "logo": "../game%20logos/survivor-io.png",
        "title": "Survivor.io"
    },
    {
        "file": "smashy-road.html",
        "logo": "../game%20logos/smashy-road.png",
        "title": "Smashy Road"
    },
    {
        "file": "papas-hotdoggeria.html",
        "logo": "../game%20logos/papas-hotdoggeria.png",
        "title": "Papa's Hotdoggeria"
    },
    {
        "file": "papas-freezeria.html",
        "logo": "../game%20logos/papas-freezeria.png",
        "title": "Papa's Freezeria"
    },
    {
        "file": "papas-pastaria.html",
        "logo": "../game%20logos/papas-pastaria.png",
        "title": "Papa's Pastaria"
    },
    {
        "file": "papas-donuteria.html",
        "logo": "../game%20logos/papas-donuteria.png",
        "title": "Papa's Donuteria"
    },
    {
        "file": "geometry-dash-world.html",
        "logo": "../game%20logos/geometry-dash-world.png",
        "title": "Geometry Dash World"
    },
    {
        "file": "geometry-dash-meltdown.html",
        "logo": "../game%20logos/geometry-dash-meltdown.png",
        "title": "Geometry Dash Meltdown"
    },
    {
        "file": "red-ball-4.html",
        "logo": "../game%20logos/red-ball-4.png",
        "title": "Red Ball 4"
    },
    {
        "file": "a-small-world-cup.html",
        "logo": "../game%20logos/a-small-world-cup.png",
        "title": "A Small World Cup"
    },
    {
        "file": "moto-x3m-spookyland.html",
        "logo": "../game%20logos/moto-x3m-spookyland.png",
        "title": "Moto X3M SpookyLand"
    },
    {
        "file": "moto-x3m-winter.html",
        "logo": "../game%20logos/moto-x3m-winter.png",
        "title": "Moto X3M Winter"
    },
    {
        "file": "moto-x3m-pool-party.html",
        "logo": "../game%20logos/moto-x3m-pool-party.png",
        "title": "Moto X3M Pool Party"
    },
    {
        "file": "retro-bowl-college.html",
        "logo": "../game%20logos/retro-bowl-college.png",
        "title": "Retro Bowl College"
    },
    {
        "file": "idle-breakout.html",
        "logo": "../game%20logos/idle-breakout.png",
        "title": "Idle Breakout"
    },
    {
        "file": "run-1.html",
        "logo": "../game%20logos/run-1.png",
        "title": "Run 1"
    },
    {
        "file": "run-2.html",
        "logo": "../game%20logos/run-2.png",
        "title": "Run 2"
    },
    {
        "file": "fall-guys.html",
        "logo": "../game%20logos/fall-guys.png",
        "title": "Fall Guys"
    },
    {
        "file": "helix-jump.html",
        "logo": "../game%20logos/helix-jump.png",
        "title": "Helix Jump"
    },
    {
        "file": "polytrack.html",
        "logo": "../game%20logos/polytrack.png",
        "title": "PolyTrack"
    },
    {
        "file": "ice-dodo.html",
        "logo": "../game%20logos/ice-dodo.png",
        "title": "Ice Dodo"
    },
    {
        "file": "ahoy-survival.html",
        "logo": "../game%20logos/ahoy-survival.png",
        "title": "Ahoy Survival"
    },
    {
        "file": "duck-life-1.html",
        "logo": "../game%20logos/duck-life-1.png",
        "title": "Duck Life 1"
    },
    {
        "file": "backrooms.html",
        "logo": "../game%20logos/backrooms.png",
        "title": "Backrooms"
    },
    {
        "file": "basketball-legends.html",
        "logo": "../game%20logos/basketball-legends.png",
        "title": "Basketball Legends"
    },
    {
        "file": "basketball-bros.html",
        "logo": "../game%20logos/basketball-bros.png",
        "title": "Basketball Bros"
    },
    {
        "file": "dumb-ways-to-die.html",
        "logo": "../game%20logos/dumb-ways-to-die.png",
        "title": "Dumb Ways to Die"
    },
    {
        "file": "fisquarium.html",
        "logo": "../game%20logos/fisquarium.png",
        "title": "Fisquarium"
    },
    {
        "file": "hole-io.html",
        "logo": "../game%20logos/hole-io.png",
        "title": "Hole.io"
    },
    {
        "file": "money-rush.html",
        "logo": "../game%20logos/money-rush.png",
        "title": "Money Rush"
    },
    {
        "file": "ragdoll-drop.html",
        "logo": "../game%20logos/ragdoll-drop.png",
        "title": "Ragdoll Drop"
    },
    {
        "file": "slice-master.html",
        "logo": "../game%20logos/slice-master.png",
        "title": "Slice Master"
    },
    {
        "file": "shell-shockers.html",
        "logo": "../game%20logos/shell-shockers.png",
        "title": "Shell Shockers"
    },
    {
        "file": "paper-io-2.html",
        "logo": "../game%20logos/paper-io-2.png",
        "title": "Paper.io 2"
    },
    {
        "file": "stickman-hook.html",
        "logo": "../game%20logos/stickman-hook.png",
        "title": "Stickman Hook"
    },
    {
        "file": "space-waves.html",
        "logo": "../game%20logos/space-waves.png",
        "title": "Space Waves"
    },
    {
        "file": "slow-roads.html",
        "logo": "../game%20logos/slow-roads.png",
        "title": "Slow Roads"
    },
    {
        "file": "tomb-of-the-mask.html",
        "logo": "../game%20logos/tomb-of-the-mask.png",
        "title": "Tomb of the Mask"
    },
    {
        "file": "tunnel-rush.html",
        "logo": "../game%20logos/tunnel-rush.png",
        "title": "Tunnel Rush"
    },
    {
        "file": "worlds-hardest-game.html",
        "logo": "../game%20logos/worlds-hardest-game.png",
        "title": "World's Hardest Game"
    },
    {
        "file": "elastic-face.html",
        "logo": "../game%20logos/elastic-face.png",
        "title": "Elastic Face"
    },
    {
        "file": "aviamasters.html",
        "logo": "../game%20logos/aviamasters.png",
        "title": "Aviamasters"
    },
    {
        "file": "learn-2-fly.html",
        "logo": "../game%20logos/learn-2-fly.png",
        "title": "Learn 2 Fly"
    },
    {
        "file": "geometry-dash-lite.html",
        "logo": "../game%20logos/geometry-dash-lite.png",
        "title": "Geometry Dash Lite"
    },
    {
        "file": "jetpack-joyride.html",
        "logo": "../game%20logos/jetpack-joyride.png",
        "title": "Jetpack Joyride"
    },
    {
        "file": "boxel-rebound.html",
        "logo": "../game%20logos/boxel-rebound.png",
        "title": "Boxel Rebound"
    },
    {
        "file": "grindcraft.html",
        "logo": "../game%20logos/grindcraft.png",
        "title": "Grindcraft"
    },
    {
        "file": "stack-ball.html",
        "logo": "../game%20logos/stack-ball.png",
        "title": "Stack Ball"
    },
    {
        "file": "brawl-stars.html",
        "logo": "../game%20logos/brawl-stars.png",
        "title": "Brawl Stars"
    },
    {
        "file": "minecraft-case-simulator.html",
        "logo": "../game%20logos/minecraft-case-simulator.png",
        "title": "Minecraft Case Simulator"
    },
    {
        "file": "papas-scooperia.html",
        "logo": "../game%20logos/papas-scooperia.png",
        "title": "Papas Scooperia"
    },
    {
        "file": "osu.html",
        "logo": "../game%20logos/osu.png",
        "title": "OSU!"
    },
    {
        "file": "krunker-io.html",
        "logo": "../games%20logos/krunker-io.png",
        "title": "Krunker.io"
    },
    {
        "file": "dreadhead-parkour.html",
        "logo": "../game%20logos/dreadhead-parkour.png",
        "title": "Dreadhead Parkour"
    },
    {
        "file": "eggy-car.html",
        "logo": "../game%20logos/eggy-car.png",
        "title": "Eggy Car"
    },
    {
        "file": "raft-life.html",
        "logo": "../game%20logos/raft-life.png",
        "title": "Raft Life"
    },
    {
        "file": "paper-minecraft.html",
        "logo": "../game%20logos/paper-minecraft.png",
        "title": "Paper Minecraft"
    },
    {
        "file": "gas-station-simulator.html",
        "logo": "../game%20logos/gas-station-simulator.png",
        "title": "Gas Station Simulator"
    }

];

function goHome() {
    window.location.href = "../index.html";
}

function openRecentlyPlayedPage() {
    window.location.href = "../recently-played.html";
}

function openFavouritesPage() {
    window.location.href = "../favourites.html";
}

function openSoundEffectsPage() {
    window.location.href = "../sound-effects.html";
}

function openStatsPage() {
    window.location.href = "../stats.html";
}

function openSettingsPage() {
    window.location.href = "../settings.html";
}

function renderGameSidebar() {
    const body = document.body;
    if (!body || body.querySelector(".sidebar")) return;

    const sidebar = document.createElement("aside");
    sidebar.className = "sidebar sidebar-static";
    sidebar.setAttribute("aria-label", "Game categories");
    sidebar.innerHTML = `
        <nav class="sidebar-nav">
            <button class="sidebar-link" type="button" onclick="goHome()">
                <span class="sidebar-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" focusable="false">
                        <path d="M12 4 3 11h2v9h5v-6h4v6h5v-9h2z"></path>
                    </svg>
                </span>
                <span class="sidebar-label">Home</span>
            </button>
            <button class="sidebar-link" type="button" onclick="openRecentlyPlayedPage()">
                <span class="sidebar-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" focusable="false">
                        <path d="M12 7a1 1 0 0 1 1 1v3.59l2.7 2.7a1 1 0 1 1-1.4 1.41l-3-3A1 1 0 0 1 11 12V8a1 1 0 0 1 1-1zm0-5a10 10 0 1 1 0 20 10 10 0 0 1 0-20z"></path>
                    </svg>
                </span>
                <span class="sidebar-label">Recently Played</span>
            </button>
            <button class="sidebar-link" type="button" onclick="openFavouritesPage()">
                <span class="sidebar-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" focusable="false">
                        <path d="m12 18.2-5.29 3.12 1.4-5.98-4.64-4.02 6.12-.52L12 5.2l2.41 5.6 6.12.52-4.64 4.02 1.4 5.98z"></path>
                    </svg>
                </span>
                <span class="sidebar-label">Favourites</span>
            </button>
            <button class="sidebar-link" type="button" onclick="openSoundEffectsPage()">
                <span class="sidebar-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" focusable="false">
                        <path d="M5 9v6h4l5 4V5l-5 4zm11.5 3a4.5 4.5 0 0 0-2.5-4.03v8.06A4.5 4.5 0 0 0 16.5 12zm0-8.5v2.06a7 7 0 0 1 0 12.88v2.06a9 9 0 0 0 0-17z"></path>
                    </svg>
                </span>
                <span class="sidebar-label">Sound Effects</span>
            </button>
            <button class="sidebar-link" type="button" onclick="openStatsPage()">
                <span class="sidebar-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" focusable="false">
                        <path d="M5 19h14v2H5zm1-3h3V8H6zm5 0h3V4h-3zm5 0h3v-6h-3z"></path>
                    </svg>
                </span>
                <span class="sidebar-label">Stats</span>
            </button>
            <button class="sidebar-link" type="button" onclick="openSettingsPage()">
                <span class="sidebar-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" focusable="false">
                        <path d="M19.14 12.94a7.43 7.43 0 0 0 .05-.94 7.43 7.43 0 0 0-.05-.94l2.03-1.58a.5.5 0 0 0 .12-.64l-1.92-3.32a.5.5 0 0 0-.6-.22l-2.39.96a7.28 7.28 0 0 0-1.63-.94l-.36-2.54a.5.5 0 0 0-.5-.42h-3.84a.5.5 0 0 0-.5.42l-.36 2.54a7.28 7.28 0 0 0-1.63.94l-2.39-.96a.5.5 0 0 0-.6.22L2.71 8.84a.5.5 0 0 0 .12.64l2.03 1.58a7.43 7.43 0 0 0-.05.94 7.43 7.43 0 0 0 .05.94l-2.03 1.58a.5.5 0 0 0-.12.64l1.92 3.32a.5.5 0 0 0 .6.22l2.39-.96c.5.39 1.05.71 1.63.94l.36 2.54a.5.5 0 0 0 .5.42h3.84a.5.5 0 0 0 .5-.42l.36-2.54c.58-.23 1.13-.55 1.63-.94l2.39.96a.5.5 0 0 0 .6-.22l1.92-3.32a.5.5 0 0 0-.12-.64zM12 15.5A3.5 3.5 0 1 1 12 8.5a3.5 3.5 0 0 1 0 7z"></path>
                    </svg>
                </span>
                <span class="sidebar-label">Settings</span>
            </button>
        </nav>
    `;

    body.insertBefore(sidebar, body.firstChild);
}

function applyTabDisguise() {
    document.title =
        localStorage.getItem(TAB_DISGUISE_KEY) === "google" ? "Google" : defaultTabTitle;
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
        favicon.href =
            localStorage.getItem(TAB_DISGUISE_KEY) === "google" ? "../game%20logos/google.png" : "../game%20logos/logo.png";
    }
}

function isTabDisguised() {
    return localStorage.getItem(TAB_DISGUISE_KEY) === "google";
}

function updateDisguiseTabButton() {
    const topbarDisguiseBtn = document.getElementById("topbarDisguiseBtn");
    if (!topbarDisguiseBtn) return;
    topbarDisguiseBtn.textContent = isTabDisguised() ? "Undisguise Tab" : "Disguise Tab";
}

function toggleTabDisguise() {
    if (isTabDisguised()) {
        localStorage.removeItem(TAB_DISGUISE_KEY);
    } else {
        localStorage.setItem(TAB_DISGUISE_KEY, "google");
    }
    applyTabDisguise();
    updateDisguiseTabButton();
}

function getStats() {
    try {
        const parsed = JSON.parse(localStorage.getItem(STATS_KEY) || "{}");
        return {
            gamesPlayed: Number.isFinite(parsed.gamesPlayed) ? parsed.gamesPlayed : 0,
            timePlayedMs: Number.isFinite(parsed.timePlayedMs) ? parsed.timePlayedMs : 0,
            playTimes: parsed.playTimes && typeof parsed.playTimes === "object" ? parsed.playTimes : {},
            longestSession: parsed.longestSession && typeof parsed.longestSession === "object"
                ? parsed.longestSession
                : null
        };
    } catch (error) {
        return {
            gamesPlayed: 0,
            timePlayedMs: 0,
            playTimes: {},
            longestSession: null
        };
    }
}

function setStats(nextStats) {
    localStorage.setItem(STATS_KEY, JSON.stringify({
        gamesPlayed: Math.max(0, Math.floor(nextStats.gamesPlayed || 0)),
        timePlayedMs: Math.max(0, Math.floor(nextStats.timePlayedMs || 0)),
        playTimes: nextStats.playTimes && typeof nextStats.playTimes === "object" ? nextStats.playTimes : {},
        longestSession: nextStats.longestSession && typeof nextStats.longestSession === "object"
            ? nextStats.longestSession
            : null
    }));
}

function getCurrentGameMeta() {
    const currentFile = window.location.pathname.split("/").pop();
    return GAME_PAGES.find((game) => game.file === currentFile) || null;
}

function incrementGamesPlayed() {
    const stats = getStats();
    stats.gamesPlayed += 1;
    setStats(stats);
}

function flushGamePlayTime() {
    if (!gameSessionTracked || gameSessionStartedAt === null) return;
    const elapsed = Date.now() - gameSessionStartedAt;
    if (elapsed <= 0) return;
    currentVisitElapsedMs += elapsed;
    if (!currentVisitCounted && currentVisitElapsedMs >= GAME_PLAY_MIN_MS) {
        incrementGamesPlayed();
        currentVisitCounted = true;
    }
    const stats = getStats();
    const currentGame = getCurrentGameMeta();
    stats.timePlayedMs += elapsed;
    if (currentGame) {
        const existing = stats.playTimes[currentGame.file];
        const timePlayedMs = existing && Number.isFinite(existing.timePlayedMs) ? existing.timePlayedMs : 0;
        stats.playTimes[currentGame.file] = {
            title: currentGame.title,
            timePlayedMs: timePlayedMs + elapsed
        };
        const longestSessionMs =
            stats.longestSession && Number.isFinite(stats.longestSession.timePlayedMs)
                ? stats.longestSession.timePlayedMs
                : 0;
        if (elapsed > longestSessionMs) {
            stats.longestSession = {
                title: currentGame.title,
                timePlayedMs: elapsed
            };
        }
    }
    setStats(stats);
    gameSessionStartedAt = Date.now();
}

function pauseGamePlayTracking() {
    if (!gameSessionTracked || gameSessionStartedAt === null) return;
    flushGamePlayTime();
    gameSessionStartedAt = null;
}

function resumeGamePlayTracking() {
    if (!gameSessionTracked || document.visibilityState === "hidden") return;
    if (gameSessionStartedAt !== null) return;
    gameSessionStartedAt = Date.now();
}

function initializeGameStatsTracking() {
    gameSessionTracked = true;
    currentVisitElapsedMs = 0;
    currentVisitCounted = false;
    gameSessionStartedAt = document.visibilityState === "hidden" ? null : Date.now();

    document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "hidden") {
            pauseGamePlayTracking();
        } else {
            resumeGamePlayTracking();
        }
    });

    window.addEventListener("pagehide", pauseGamePlayTracking);
    window.addEventListener("beforeunload", pauseGamePlayTracking);
}

function openSearchResults() {
    const searchBar = document.getElementById("gamePageSearch");
    const query = searchBar ? searchBar.value.trim() : "";
    const suffix = query ? `?search=${encodeURIComponent(query)}` : "";
    window.location.href = `../index.html${suffix}`;
}

function openRandomGame() {
    const currentFile = window.location.pathname.split("/").pop();
    const choices = GAME_PAGES.filter((game) => game.file !== currentFile);
    if (!choices.length) return;
    const randomGame = choices[Math.floor(Math.random() * choices.length)];
    updateRecentsByHref(`games/${randomGame.file}`);
    window.location.href = randomGame.file;
}

function getRecents() {
    try {
        return JSON.parse(localStorage.getItem(RECENTS_KEY) || "[]");
    } catch (error) {
        return [];
    }
}

function updateRecentsByHref(href) {
    if (!href) return;
    const current = getRecents();
    const next = [href, ...current.filter((item) => item !== href)].slice(0, RECENTS_LIMIT);
    localStorage.setItem(RECENTS_KEY, JSON.stringify(next));
}

function getFavorites() {
    try {
        return JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
    } catch (error) {
        return [];
    }
}

function isFavoriteHref(href) {
    return getFavorites().includes(href);
}

function toggleFavoriteHref(href) {
    if (!href) return false;
    const favorites = getFavorites();
    const next = favorites.includes(href)
        ? favorites.filter((item) => item !== href)
        : [href, ...favorites.filter((item) => item !== href)];
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
    return next.includes(href);
}

function updateFavoriteButtonState(button, isFavorite) {
    button.classList.toggle("is-favorite", isFavorite);
    button.setAttribute("aria-pressed", isFavorite ? "true" : "false");
    if (button.classList.contains("player-meta-favorite")) {
        button.textContent = isFavorite ? "Unfavourite" : "Favourite";
    }
    if (isFavorite) {
        button.classList.remove("favorite-pop");
        void button.offsetWidth;
        button.classList.add("favorite-pop");
    } else {
        button.classList.remove("favorite-pop");
    }
}

function createFavoriteButton(href) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "favorite-toggle";
    button.setAttribute("aria-label", "Toggle favourite");
    button.innerHTML = `
        <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
            <path d="m12 17.27-6.18 3.73 1.64-7.03L2 9.24l7.19-.61L12 2l2.81 6.63 7.19.61-5.46 4.73L18.18 21z"></path>
        </svg>
    `;
    button.dataset.favoriteHref = href;
    updateFavoriteButtonState(button, isFavoriteHref(href));
    button.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        const isFavorite = toggleFavoriteHref(href);
        document.querySelectorAll(`[data-favorite-href="${CSS.escape(href)}"]`).forEach((item) => {
            updateFavoriteButtonState(item, isFavorite);
        });
    });
    return button;
}

function getCurrentGameHref() {
    const currentFile = window.location.pathname.split("/").pop();
    return currentFile ? `games/${currentFile}` : "";
}

function createPlayerMetaFavoriteButton(href) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "player-meta-favorite";
    button.setAttribute("aria-label", "Toggle favourite");
    button.dataset.favoriteHref = href;
    updateFavoriteButtonState(button, isFavoriteHref(href));
    button.addEventListener("click", () => {
        const isFavorite = toggleFavoriteHref(href);
        document.querySelectorAll(`[data-favorite-href="${CSS.escape(href)}"]`).forEach((item) => {
            updateFavoriteButtonState(item, isFavorite);
        });
    });
    return button;
}

function decorateRecommendationFavorites() {
    document.querySelectorAll(".recommendation-card").forEach((card) => {
        if (card.querySelector(".favorite-toggle")) return;
        const href = card.getAttribute("href");
        if (!href) return;
        card.appendChild(createFavoriteButton(`games/${href}`));
    });
}

const PANIC_URL = "https://www.google.com";

function activatePanic() {
    window.location.replace(PANIC_URL);
}

function bindPanicButtons() {
    document.querySelectorAll(".panic-btn").forEach((button) => {
        if (button.dataset.panicBound === "true") return;
        button.dataset.panicBound = "true";

        button.addEventListener("pointerdown", activatePanic);
        button.addEventListener("touchstart", activatePanic, { passive: true });
    });
}

async function toggleFullscreen() {
    const target = document.querySelector(".player-shell");
    if (!target) return;

    try {
        if (document.fullscreenElement) {
            await document.exitFullscreen();
            return;
        }

        if (target.requestFullscreen) {
            await target.requestFullscreen();
        }
    } catch (error) {
        console.error("Fullscreen failed", error);
    }
}

function shuffle(items) {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

function getGameCategory(href) {
    const categories = getGameCategories(href);
    return categories[0] || "Arcade";
}

function getGameCategories(href) {
    const value = GAME_CATEGORIES[href];
    if (Array.isArray(value)) {
        return value;
    }
    if (typeof value === "string" && value) {
        return [value];
    }
    return ["Arcade"];
}

function normalizeTitleTokens(title) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, " ")
        .trim()
        .split(/\s+/)
        .filter(Boolean);
}

function getTitleSimilarityScore(baseTitle, candidateTitle) {
    const baseTokens = normalizeTitleTokens(baseTitle);
    const candidateTokens = normalizeTitleTokens(candidateTitle);
    const sharedTokens = baseTokens.filter((token) => candidateTokens.includes(token));
    const baseNormalized = baseTokens.join(" ");
    const candidateNormalized = candidateTokens.join(" ");

    let score = sharedTokens.length * 10;

    if (baseNormalized && candidateNormalized) {
        if (baseNormalized.includes(candidateNormalized) || candidateNormalized.includes(baseNormalized)) {
            score += 8;
        }

        if (baseTokens[0] && candidateTokens[0] && baseTokens[0] === candidateTokens[0]) {
            score += 5;
        }
    }

    return score;
}

function getPrioritySeriesKey(file) {
    if (!file) return "";
    if (file.startsWith("geometry-dash-")) return "geometry-dash";
    if (file.startsWith("moto-x3m")) return "moto-x3m";
    if (file.startsWith("fnaf")) return "fnaf";
    if (file.startsWith("btd")) return "btd";
    return "";
}

function getRecommendedGames(currentGame, limit = 32) {
    const currentHref = `games/${currentGame.file}`;
    const currentCategories = getGameCategories(currentHref);
    const candidates = GAME_PAGES.filter((game) => game.file !== currentGame.file);
    const prioritySeriesKey = getPrioritySeriesKey(currentGame.file);
    const prioritySeriesMatches = prioritySeriesKey
        ? candidates.filter((game) => getPrioritySeriesKey(game.file) === prioritySeriesKey)
        : [];
    const usedFiles = new Set(prioritySeriesMatches.map((game) => game.file));
    const categoryMatches = shuffle(
        candidates.filter((game) => {
            if (usedFiles.has(game.file)) return false;
            const candidateCategories = getGameCategories(`games/${game.file}`);
            return candidateCategories.some((category) => currentCategories.includes(category));
        })
    );
    categoryMatches.forEach((game) => usedFiles.add(game.file));
    const similarNameMatches = candidates
        .filter((game) => !usedFiles.has(game.file))
        .map((game) => ({
            game,
            score: getTitleSimilarityScore(currentGame.title, game.title)
        }))
        .filter(({ score }) => score > 0)
        .sort((a, b) => {
            if (b.score !== a.score) {
                return b.score - a.score;
            }
            return a.game.title.localeCompare(b.game.title);
        })
        .map(({ game }) => game);

    similarNameMatches.forEach((game) => usedFiles.add(game.file));

    const fallbackGames = shuffle(candidates.filter((game) => !usedFiles.has(game.file)));
    return [...prioritySeriesMatches, ...categoryMatches, ...similarNameMatches, ...fallbackGames].slice(0, limit);
}

function renderRecommendations() {
    const page = document.querySelector(".page");
    if (!page) return;

    const currentFile = window.location.pathname.split("/").pop();
    const currentGame = GAME_PAGES.find((game) => game.file === currentFile) || {
        file: currentFile,
        title: document.querySelector(".title")?.textContent.trim() || document.title
    };
    const picks = getRecommendedGames(currentGame, 40);

    const section = document.createElement("section");
    section.className = "recommendations";
    section.innerHTML = `
        <div class="recommendation-grid">
            ${picks.map((game) => `
                <a class="recommendation-card" href="${game.file}" data-category="${getGameCategories(`games/${game.file}`).join(", ")}">
                    <img src="${game.logo}" alt="${game.title} logo">
                    <span>${game.title}</span>
                </a>
            `).join("")}
        </div>
    `;

    page.appendChild(section);
    decorateRecommendationFavorites();
}

function moveRandomButtonToPlayerMeta() {
    const playerMeta = document.querySelector(".player-meta");
    const panicButton = document.querySelector(".panic-btn");
    if (!playerMeta || !panicButton || playerMeta.querySelector(".player-meta-random")) return;

    const randomButton = document.createElement("button");
    randomButton.type = "button";
    randomButton.className = "player-meta-random";
    randomButton.textContent = "Random";
    randomButton.addEventListener("click", openRandomGame);
    playerMeta.insertBefore(randomButton, panicButton);

    const currentGameHref = getCurrentGameHref();
    if (!currentGameHref || playerMeta.querySelector(".player-meta-favorite")) return;

    const favoriteButton = createPlayerMetaFavoriteButton(currentGameHref);
    playerMeta.insertBefore(favoriteButton, randomButton);
}

function shouldAllowSpaceKey(target) {
    if (!(target instanceof HTMLElement)) return false;
    const tagName = target.tagName;
    return (
        tagName === "INPUT" ||
        tagName === "TEXTAREA" ||
        tagName === "SELECT" ||
        target.isContentEditable
    );
}

function enablePlayerScrollLock() {
    const playerShell = document.querySelector(".player-shell");
    if (!playerShell) return;

    let previousOverflow = "";

    playerShell.addEventListener("mouseenter", () => {
        previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
    });

    playerShell.addEventListener("mouseleave", () => {
        document.body.style.overflow = previousOverflow;
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const searchBar = document.getElementById("gamePageSearch");
    const topbarDisguiseBtn = document.getElementById("topbarDisguiseBtn");

    initializeGameStatsTracking();
    renderGameSidebar();
    applyTabDisguise();
    updateDisguiseTabButton();
    moveRandomButtonToPlayerMeta();
    bindPanicButtons();
    enablePlayerScrollLock();

    if (searchBar) {
        searchBar.addEventListener("input", () => {
            window.clearTimeout(searchTimer);
            searchTimer = window.setTimeout(openSearchResults, 350);
        });

        searchBar.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                window.clearTimeout(searchTimer);
                openSearchResults();
            }
        });
    }

    if (topbarDisguiseBtn) {
        topbarDisguiseBtn.addEventListener("click", toggleTabDisguise);
    }

    document.addEventListener("keydown", (event) => {
        if (event.key !== " " && event.code !== "Space") return;
        if (shouldAllowSpaceKey(event.target)) return;
        event.preventDefault();
    });

    renderRecommendations();
});
