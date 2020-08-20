import React from 'react'
import Grid from "@material-ui/core/Grid";
import {Route} from "react-router-dom";
import PageWidget from "../PageWidget/Index"


const Index = () => {
  const components = [[PageWidget,'/admin']]

  return (
    <Grid xs={12} item >
          {components.map((item, index) => (<Route path={components[index][1]} component={components[index][0]} />))}
           </Grid>
  );
};

export default Index;
