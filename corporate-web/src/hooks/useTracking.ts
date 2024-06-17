import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useTracking = () => {
    const location = useLocation();
    // const [initialized, setInitialized] = useState(false);

    // useEffect(() => {
    //     // ReactGA.initialize("G-ZKM6ZY9NVZ", { debug: true });
    //     // if (!window.location.href.includes("localhost")) {
    //     //     ReactGA.initialize("G-ZKM6ZY9NVZ");
    //     // }
    //     setInitialized(true);
    // }, []);

    useEffect(() => {
        // if (initialized) {
        const gtag = (window as any).gtag;
        if (gtag) {
            gtag("config", "G-ZKM6ZY9NVZ", {
                page_title: document.title,
                page_location: window.location.href,
                page_path: location.pathname,
            });
        }
        // }
    }, [location]);
};

export default useTracking;
