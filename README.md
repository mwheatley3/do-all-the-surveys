# do-all-the-surveys

Survey App with admin page to create survey questions and answers

Inspiration for project layout: https://github.com/sequelize/express-example

## Getting Started

```
$ git clone https://github.com/mwheatley3/do-all-the-surveys.git sumo
$ cd sumo
$ npm install
$ npm start
```

Now visit [localhost:4000](http://localhost:4000/)

## Overview

This app is designed for an admin to be able to enter a question with any number of possible responses.  Then when a guest visits the site they will be presented with a random survey question to answer.  When they answer the question they will receive another random question.  This will continue until the guest is bored of answering questions or until all questions have been answered.  There is also a protected admin interface where an admin can spawn more admins and view the responses to his or her posted survey questions. The site is responsive and can be viewed on a mobile device.

### Notes

1. In order for this application to run you must have a MySQL database server running and have entered the credentials and DB information in config/config.json

2. The app is currently being hosted here: https://e-honda-takes-a-survey.herokuapp.com/#/

3. The DB is seeded with 1 admin. username: 123 password: 123

4. This app was built using Angular, Node, Express, MySQL, and Sequelize.
