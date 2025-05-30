clpp.install(clpp.dash.DashComponent);

const player = new clpp.Player(
  "videoPlayer",
  {
    license:
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJraWQiOjQyNTcsImlsdiI6ZmFsc2V9.Efz162XXbcz--Dlrx6Bz_VaNERg30nig7Crb2FBVs9LHzogwc6WPZkEWoHA1XkgFH4NbGJ6S8NzRxq2KBXXrZNNIQeXAc9-vj7WBOjzCbnQeQ1jJAwTXuAGjelajOUiwEn5slqG2Ju30lS6bIokV9yFZ_aWswcmDwtJqfBcO-wCJRMIfwU1CpN2RNXmiUa6Xd6EZgzHXHGIgAdHIcsx7q1_hAKpFe9rOtM9b3b9E81RHGuzUu5yGSeNHEN2IJHo_R2GnK-wUExmiZozu_wUCxKMJ1sRdW2c38alD5giMZtbMMSx8MvK7sO6C52DbBU8VhMmEO_JQhqpugpFYW_KE-Q",
    drm: {
      env: "DRMtoday_STAGING",
      customData: {
        userId: "purchase",
        sessionId: "default",
        merchant: "client_dev",
        authToken: "",
        assetId: "agent-327",
        variantId: "",
        playReadyVideoRobustness: [2000, 150],
      },
      delayLicenseRequestUntilPlayed: true,
    },
    autoplay: true,
  },
  {
    // crossorigin: 'use-credentials',
  }
);

player.getNetworkEngine().addRequestModifier((request) => {
  // request.allowCrossSiteCredentials = true;
});

player.load({
  source: {
    url: "https://content.players.castlabs.com/demos/drm-agent/manifest.mpd",
    type: clpp.Type.DASH,
  },
});
