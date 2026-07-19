/**
 * A helper to ensure the theme payload is always structured perfectly for the frontend.
 * If no festival is active, it returns the default Shreeji Seva Bhav theme.
 */
const getThemePayload = (activeFestival) => {
    if (!activeFestival) {
        return {
            isFestivalActive: false,
            theme: {
                primaryColor: "#E28743", // Default SSB Orange
                heroBannerUrl: "/images/default-hero.jpg",
                enableFallingFlowers: false,
                greetingPrefix: "Divine"
            }
        };
    }

    return {
        isFestivalActive: true,
        festivalName: activeFestival.title,
        theme: activeFestival.festivalTheme
    };
};

module.exports = {
    getThemePayload
};
