import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { CreateCollection, ViewCollection } from "./collection";
import TagSearch from "./tagSearch";
import EditItem from "./item/edit";
import ViewItem from "./item/view";
import Profile from "./profile";
import HomePage from "./home";

const useRoutes = () => (
  <Switch>
    <Route path="/" exact component={HomePage} />
    <Route path="/user/:userId" exact>
      <Profile />
    </Route>
    <Route path="/collection/:collectionId" exact>
      <ViewCollection />
    </Route>
    <Route path="/edit/collection/:collectionId" exact>
      <CreateCollection />
    </Route>
    <Route path="/edit/item/:itemId" exact>
      <EditItem />
    </Route>
    <Route path="/item/:itemId" exact>
      <ViewItem />
    </Route>
    <Route path="/tag/:tagId" exact>
      <TagSearch />
    </Route>
    <Redirect to="/" />
  </Switch>
);

export default useRoutes;
