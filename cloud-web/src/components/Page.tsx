import * as React from "react";
import PageTitle from "./PageTitle";
import Main from "./Main";

export type PageProps = {
  pageTitle: string;
};

const Page: React.FC<PageProps> = ({ pageTitle, children }) => {
  return (
    <Main>
      <PageTitle>{pageTitle}</PageTitle>
      {children}
    </Main>
  );
};

export default Page;
