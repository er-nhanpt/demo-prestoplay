clpp.install(clpp.dash.DashComponent);
let player;
const sourceURL = "https://content.players.castlabs.com/demos/drm-agent/manifest.mpd";

function initPlayer() {
    const videoElement = document.getElementById("videoPlayer");
    player = new clpp.Player(videoElement, {
        license:
            "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJraWQiOjQyNTcsImlsdiI6ZmFsc2V9.Efz162XXbcz--Dlrx6Bz_VaNERg30nig7Crb2FBVs9LHzogwc6WPZkEWoHA1XkgFH4NbGJ6S8NzRxq2KBXXrZNNIQeXAc9-vj7WBOjzCbnQeQ1jJAwTXuAGjelajOUiwEn5slqG2Ju30lS6bIokV9yFZ_aWswcmDwtJqfBcO-wCJRMIfwU1CpN2RNXmiUa6Xd6EZgzHXHGIgAdHIcsx7q1_hAKpFe9rOtM9b3b9E81RHGuzUu5yGSeNHEN2IJHo_R2GnK-wUExmiZozu_wUCxKMJ1sRdW2c38alD5giMZtbMMSx8MvK7sO6C52DbBU8VhMmEO_JQhqpugpFYW_KE-Q",
        viewerId: '5125412-e8809b0-689328e-0a38f476'
    });

    player.on(clpp.events.ERROR, function (e) {
        const error = e.detail;
        console.error("Player Error:", error.message);
    });
    player.load({
        source: {
            url: sourceURL,
            type: clpp.Type.DASH,
        },
        drm: {
            env: "DRMtoday_STAGING",
            customData: {
                userId: "purchase",
                sessionId: "default",
                merchant: "client_dev",
                authToken: "",
                assetId: "agent-327",
                variantId: "",
            }
        }
    });
}

function destroyAndReload() {
    try {
        console.warn("Reloading player...");
        player?.destroy();
    } catch (e) {
        console.error("Failed to destroy player:", e);
    }
    initPlayer();
}

function monitorConnectivity() {
    window.addEventListener("online", () => {
        console.log("Network restored. Reloading player.");
        destroyAndReload();
    });

    window.addEventListener("offline", () => {
        console.warn("Network lost.");
    });

    // Optional: proactive ping every 15 seconds
    // setInterval(async () => {
    //     try {
    //         const res = await fetch(sourceURL, { method: "HEAD", cache: "no-store" });
    //         if (!res.ok) throw new Error("Bad response");
    //     } catch (err) {
    //         console.warn("Network unreachable. Reloading player.");
    //         destroyAndReload();
    //     }
    // }, 15000);
}

window.addEventListener("DOMContentLoaded", () => {
    initPlayer();
    monitorConnectivity();
});
