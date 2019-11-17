# Websho

Websho is a movie streaming app which customizes its selection to the users viewing history.
Choose from a catalog of 1000+ movies from more than 10 genres. You can also browse movies more easily by using the search functionality. 

NOTE: You can also stream trailers of movies.

This repository is for the frontend React app, visit [here](https://github.com/JahazielGuzman/websho) for the backend code 

[Click here for the hosted app.](websho.jahazielguzman.com) The project was deployed using surge.

This project was created in Rails, React and Postgres.

Some of the techniques used to create this app:
+ Created 4 Active Record models with PostgreSQL to store users, reviews, viewership patterns and a catalog of 1000+ movies.
+ Seeded database with movie metadata obtained from TheMovieDB API.
+ Created custom movie recommendation lists in Rails which were tailored to each users viewing history.
+ Generated search results based on movie search queries.
+ Used the react-youtube npm package to stream youtube trailers fetched from TheMovieDB.

To run this project first make sure you are running the rails. Then run 

# `npm install`
# `npm start`

