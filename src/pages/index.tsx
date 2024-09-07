import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Button } from "@chakra-ui/react";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <main>
      Main
      <Button>button</Button>
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
