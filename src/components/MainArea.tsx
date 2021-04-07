/** @jsxRuntime classic */
/** @jsx jsx */
import React from "react";
import { Switch, Route } from "react-router-dom";
import { jsx } from "theme-ui";

import { Overview } from "./Overview";
import { Project } from "./Project";
import { NotFoundPage } from "./NotFoundPage";

export const MainArea: React.FC = () => {
  return (
    <main sx={{ minHeight: "100vh", zIndex: 0 }}>
      <Switch>
        <Route exact path='/'>
          <Overview />
        </Route>
        <Route path='/:id'>
          <Project />
        </Route>
        <Route component={NotFoundPage} />
      </Switch>
    </main>
  );
};
