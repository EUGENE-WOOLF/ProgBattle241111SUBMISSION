| Method | URL Path                     | Description                                                                                                                      |
| ------ | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `GET`  | `/progbattle/login`          | Serves the login HTML page.                                                                                                      |
| `POST` | `/progbattle/login`          | Receives login form data, creates a new player in MongoDB (`Player` collection), then redirects to dashboard.                    |
| `GET`  | `/progbattle/dashboard`      | Serves the dashboard HTML page.                                                                                                  |
| `GET`  | `/progbattle/round1`         | Serves the Round 1 page where the user can submit a bot.                                                                         |
| `POST` | `/progbattle/round1`         | Accepts uploaded bot file, runs game logic (`rungame()`), extracts winner and scores from CSV, then renders `codecompleted.ejs`. |
| `GET`  | `/progbattle/round2`         | Serves Round 2 HTML page. Also fetches teams data from DB but doesn’t use it in the response.                                    |
| `GET`  | `/progbattle/leaderBoard/`   | Serves the leaderboard HTML page.                                                                                                |
| `GET`  | `/progbattle/submitCode/`    | Serves the code submission HTML page.                                                                                            |
| `GET`  | `/progbattle/teams`          | Builds team list from first 64 players (16 teams of 4), saves it to MongoDB (`Team` collection), and serves the team HTML page.  |
| `GET`  | `/progbattle/teams/teaminfo` | Sends JSON of all teams from MongoDB (`Team` collection) to frontend.                                                            |


how to run the app 
1. Clone the repo
2. go to backend directory 
3. npm i
3. nodemon index.js / node index.js
4. Go to http://localhost:3000/progbattle/login/ the data is stored in a web database monogdb
5. You can access it from check.js outside the backend director. The endpoints are provided

The function pages 
1. login and storing user data
2. competiting against bots
3. making team
4. storing teams 
5. teams display 
6. If possible I would like to complete the team match in the remaning minutes

Design choices
1. No react as lack of time and lack of proficieny
2. To prevent a lot of clture all the html have html css and js and ther is no in the public directory
3. Contact me if you have difficulty
