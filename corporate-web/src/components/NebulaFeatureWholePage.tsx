/** @jsxRuntime classic */
/** @jsx jsx */
import * as React from "react";
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";
import Container from "./Container";
import FeatureSummaryTable from "./NebulaFeatureSummaryTable";

export type FeatureWholePageProps = {
    infoFeature: string;
};

const FeatureParent = styled.div`
    /* height: 100vh; */
    width: 100vw;
    margin: 100px 0;
`;

const NarrowContainer = styled(Container)`
    margin: 0 auto;
    font-size: 16pt;
    padding-top: 150px;
`;
const Table = styled.div``;

const FeatureWholePage: React.FC<FeatureWholePageProps> = ({
    infoFeature,
    children,
}) => {
    return (
        <FeatureParent>
            <NarrowContainer>
                <FeatureSummaryTable
                    featureList={[infoFeature]}
                    bold
                    noMargin
                />
                <div>{children}</div>
            </NarrowContainer>
        </FeatureParent>
    );
};

export default FeatureWholePage;
