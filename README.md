# Authentication and Testing Sprint Challenge

**Read these instructions carefully. Understand exactly what is expected _before_ starting this Sprint Challenge.**

This challenge allows you to practice the concepts and techniques learned over the past sprint and apply them in a concrete project. This sprint explored **Authentication and Testing**. During this sprint, you studied **authentication, JSON web tokens, unit testing, and backend testing**. In your challenge this week, you will demonstrate your mastery of these skills by creating **a dad jokes app**.

This is an individual assessment. All work must be your own. All projects will be submitted to Codegrade for automated review. You will also be given feedback by code reviewers on Monday following the challenge submission. For more information on the review process [click here.](https://www.notion.so/bloomtech/How-to-View-Feedback-in-CodeGrade-c5147cee220c4044a25de28bcb6bb54a)

You are not allowed to collaborate during the sprint challenge.

## Project Setup

- [x] Run `npm install` to install your dependencies.
- [x] Build your database executing `npm run migrate`.
- [x] Run tests locally executing `npm test`.

## Project Instructions

Dad jokes are all the rage these days! In this challenge, you will build a real wise-guy application.

Users must be able to call the `[POST] /api/auth/register` endpoint to create a new account, and the `[POST] /api/auth/login` endpoint to get a token.

We also need to make sure nobody without the token can call `[GET] /api/jokes` and gain access to our dad jokes.

We will hash the user's password using `bcryptjs`, and use JSON Web Tokens and the `jsonwebtoken` library.

### MVP

Your finished project must include all of the following requirements (further instructions are found inside each file):

- [x] An authentication workflow with functionality for account creation and login, implemented inside `api/auth/auth-router.js`.
- [x] Middleware used to restrict access to resources from non-authenticated requests, implemented inside `api/middleware/restricted.js`.
- [x] A minimum of 2 tests per API endpoint, written inside `api/server.test.js`.

**IMPORTANT Notes:**

- Do not exceed 2^8 rounds of hashing with `bcryptjs`.
- If you use environment variables make sure to provide fallbacks in the code (e.g. `process.env.SECRET || "shh"`).
- You are welcome to create additional files but **do not move or rename existing files** or folders.
- Do not alter your `package.json` file except to install extra libraries. Do not update existing packages.
- The database already has the `users` table, but if you run into issues, the migration is available.
- In your solution, it is essential that you follow best practices and produce clean and professional results.
- Schedule time to review, refine, and assess your work and perform basic professional polishing.

## Submission format

- [x] Submit via Codegrade by pushing commits to your `main` branch on Github.
- [x] Check Codegrade before the deadline to compare its results against your local tests.
- [x] Check Codegrade on the days following the Sprint Challenge for reviewer feedback.
- [x] New commits will be evaluated by Codegrade if pushed _before_ the sprint challenge deadline.

## Interview Questions

Be prepared to demonstrate your understanding of this week's concepts by answering questions on the following topics.

1. Differences between using _sessions_ or _JSON Web Tokens_ for authentication.

Sessions are tracked on the server whereas JSON web tokens are not. Sessions can be destroyed on logout whereas tokens have to expire before they no longer authenticate a user. Sessions work well between same origin webpages. Tokens are best for everything else.

2. What does `bcryptjs` do to help us store passwords in a secure manner?

bcrypt makes it difficult for hackers to succeed with rainbow tables. A rainbow table is created when an attacker gets a list of commonly used passwords and then starts with dictionary stuff (table can end up being millions of rows long) and then the attacker, using a popular hashing formula like MD5, pre-computes hashes for all of these things. Then inevitably some database gets stolen and this database has a users table full of hashes. The attacker checks the hashes against the rainbow table and if found it would be BAD! So that is how hashes can be attacked with rainbow tables. - bcrypt defeats against this by making sure that the creation of these rainbow tables is extremely slow, for example 2^8 rounds of hashing is an enormous #. That makes the creation of these rainbow tables really slow. If it takes a full second to build a single hash and the attacker has a rainbow table with a million records it will take a million seconds to build it. So bcrypt tries to make impractical the creation of these rainbow tables through configurable slowness. If something makes the creation faster in the future then no problem all we would have to do is UP THE ROUNDS of hashing. The power of math allows us to defeat within reason future hardware. - bcrypt also takes care that even 2 users with the same passwords result in different hashes. Because bcrypt combines the password with some random thing called "salt" before computing the hash. This also hurts attackers a great deal because if each hash is created with a different "salt" then rainbow tables are impossible. They would have to create 1 rainbow table PER individual salt so that's a million times a million!! All this information, the salt and the rounds of hashing, is stored inside the bcrypt hash itself. So the attacker can see the salt but still that destroys their ability to efficiently use rainbow tables because they would need an insane amount of rainbow tables.

3. How are unit tests different from integration and end-to-end testing?

Unit testing should focus on testing small units (typically a Class or a complex algorithm).
Units should be tested in isolation and independent of other units. This is typically achieved by mocking the dependencies.
Unit tests should be fast. Usually shouldn’t take more than a few seconds to provide feedback.

Integration testing verifies whether or not the individual modules or services that make up your application work well together.

End-to-end testing verifies that your software works correctly from the beginning to the end of a particular user flow. It replicates expected user behavior and various usage scenarios to ensure that your software works as whole. End-to-end testing uses a production equivalent environment and data to simulate real-world situations and may also involve the integrations your software has with external applications.

4. How does _Test Driven Development_ change the way we write applications and tests?

Test Driven Development is software development approach in which test cases are developed to specify and validate what the code will do. In simple terms, test cases for each functionality are created and tested first and if the test fails then the new code is written in order to pass the test making code simple and bug-free. Test-Driven Development starts with designing and developing tests for every small functionality of an application. TDD framework calls us to write new code only if an automated test has failed. This avoids duplication of code.
