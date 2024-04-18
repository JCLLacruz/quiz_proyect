# Quiz App (Single Page Application)
This project is a Single Page Application (SPA) for conducting quizzes. The application operates as a single web page, meaning that all content is dynamically loaded without needing to reload the page. The project has been designed with a mobile-first approach, although it is fully responsive for any device.

## Functionality
The application utilizes JavaScript to interact with the DOM and manage the application flow. Upon loading the page, an HTTP request is made to fetch the quiz questions from an API using Axios. Once the questions are retrieved, the user can begin answering them by selecting one of the provided options.

User answers are validated to ensure that at least one option is selected. After answering all questions, the user's score is calculated and displayed along with a bar chart showing the score history and a ranking of users with the highest scores.

The application uses Chart.js to generate the bar chart displaying the score history. Additionally, it utilizes localStorage to store user data and display the ranking even after the page is reloaded.

## Styling
The styling has been done using a Bootswatch theme (https://bootswatch.com/), which are themes based on Bootstrap. To apply it, the necessary classes have been added to the HTML. It has a button that changes the appearance of the application between light and dark.

## Key Features
- Quiz Start: Users can start the quiz by entering their name and clicking the start button.
- Answer Questions: Users can answer a series of questions by selecting one of the provided options.
- Score: After answering all questions, the user's score is displayed.
- Chart: A bar chart displaying the score history of all users who have participated is shown.
- User Ranking: A ranking of the top three users with the highest scores is displayed.

## Installation and Usage Guide
1. Clone this repository to your local machine.
2. Open the index.html file in your web browser.
3. Enter your name and click the "Start" button to begin the quiz.
4. Answer the questions by selecting one of the provided options.
5. After answering all questions, your score and the user ranking will be displayed.

## Technologies Used
- HTML/CSS/JavaScript: For the structure, design, and logic of the application.
- Axios: For making HTTP requests and fetching quiz questions from an API.
- Chart.js: For generating the score history bar chart.
- localStorage: For storing user data and displaying the ranking even after page reloads.

## Screeshoots
![start-game](https://github.com/JCLLacruz/quiz_proyect/assets/155624350/c56e21a5-1468-4cc5-b2bd-6c92d687e8a4)
![question](https://github.com/JCLLacruz/quiz_proyect/assets/155624350/c6a772fc-f128-471e-81eb-52820af7818f)
![stats](https://github.com/JCLLacruz/quiz_proyect/assets/155624350/531309dd-8544-43d0-8737-5802f1832628)
![contact](https://github.com/JCLLacruz/quiz_proyect/assets/155624350/1f990e05-4d3a-4e38-b3f5-87f12c7c14f9)
