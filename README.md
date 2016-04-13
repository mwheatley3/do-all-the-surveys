# do-all-the-surveys

Survey App with admin page to create survey questions and answers

inspiration for project layout: https://github.com/sequelize/express-example

## Getting Started

```
$ git clone https://github.com/mwheatley3/do-all-the-surveys.git sumo
$ cd sumo
$ npm install
$ npm start
```

Now visit [localhost:4000](http://localhost:4000/)

## Overview

This app uses Highcharts in order to provide a visual component to the volunteering data that is being collected by Give Pulse.  As of 4/11/2016 the application has 2 graphs.  The first graph shows the type of organizations that have volunteers and the number of hours that each organization’s members have volunteered.  The second graph displays the discrepancy between the types of skills that are needed at volunteering events and the skills that the volunteers posses.

### Notes

1. In order for this application to run you must have a mysql database running with the givepulse_test DB populated

2. The app is currently being hosted here: https://give-pulse.herokuapp.com/#/

3. This app was built using Angular, HighCharts, Node, Express, and MySQL
