# JiffyTyper

Hello! This is the source code for the [website](https://jiffytyper.herokuapp.com/) I made as a small project to practice `HTML`, `Bootstrap`, `javascript`, `node`, and `MongoDB`.

The app starts off with a welcome page, *welcome.ejs*. There are two buttons in that page, each will take you to a new page.
1.  The `submit.ejs` page will let the user submit their own text. The user can type out the info through the html form that will submit a `POST` request to the `Mongo` Databse.
    *  After entering the info without any error (There is character validation in the textboxes), the page will redirect to `submitted.ejs` that will confirm that the text has been sent.



2. The `Play.ejs` page is where you get to play the game. The page will load with a random document in the `Mongo` Database.
    *  When the user starts typing in the Large textarea, the timer will begin, starting from 0. After correctly typing everything in the chosen random text, the textarea will lock and open up a modal, depending on the score.
    *   When the user finishes the text faster than the fastest attempt, the modal informing the user to enter his name will pop up. Entering the name will update the `HighScoreName` in the `Mongo` Document.
    *   When the user doesn't finish faster than the fastest attempt, A different modal will pop up. Informing the user about their score, the current high score, and the name of the person who did the fastest.

