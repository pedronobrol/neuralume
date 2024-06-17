/** @jsxRuntime classic */
/** @jsx jsx */
import * as React from "react";
import { css, jsx } from "@emotion/react";
import Footer from "./Footer";
import Header, { HeaderProps } from "./Header";

export interface StandardViewProps {
    pageTitle: string;
    headerProps?: HeaderProps;
}

class StandardView extends React.Component<StandardViewProps> {
    componentDidMount = () => {
        const { pageTitle } = this.props;
        document.title = `${pageTitle} - Neuralume`;
    };

    render() {
        const { children, headerProps } = this.props;

        return (
            <div
                css={css`

                `}
            >
                <Header {...(headerProps || {})} />
                {children}
                <Footer />
            </div>
        );
    }
}

export default StandardView;
