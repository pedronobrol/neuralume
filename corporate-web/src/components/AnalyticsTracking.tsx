import * as React from "react";
import useTracking from "../hooks/useTracking";

export type AnalyticsTrackingProps = {};

const AnalyticsTracking: React.FC<AnalyticsTrackingProps> = () => {
    useTracking();
    return <></>;
};

export default AnalyticsTracking;
