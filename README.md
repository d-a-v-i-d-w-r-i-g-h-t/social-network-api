
# Social Network API

## Description 

For this project, I created an API for a social network web application, where users can share their thoughts, react to their friends' thoughts, and create a friend list by connecting with other users. This required careful structuring and linking of the data models **User**, **Thought**, and **Reaction**.

I needed to make sure that the controllers were thorough in proper link creation and removal during post (create) and delete requests. For example, when a thought is deleted, the corresponding thought id in the user's *thoughts* array must also be deleted. If a user is deleted, all of that user's thoughts must be deleted, and the deleted user's id must also be removed from any other users' *friends* arrays that contain it.

I also had to ensure that user input was consistent, with clear messaging for user errors. This meant checking if a user existed prior to creating or modifying a thought specified for a particular username, and checking if a username was already in use before creating a new user.

To accomplish all of this, I used a **MongoDB** database with the **Mongoose** Object-Document Mapper (ODM). Using Mongoose allowed me to take advantage of some additional features, such as virtuals and getters.

**Virtuals** are unstored properties defined in the schema and computed on the fly during queries. For this project, I created the virtuals ```friendCount``` and ```thoughtCount```, the total numbers of a user's friends and thoughts, respectively.

**Getters** are functions that modify data from the database prior to presentation to the user, while leaving the data in the database unchanged. Here, I used a getter function called ```formatDate``` to format the auto-generated date string for thoughts and reactions into something a bit more user-friendly.

This project provided a great experience in checking edge cases and taking advantage of available features to create a successful back-end application.

A video walkthrough demonstrating API functionality and CRUD operations using [Insomnia](https://insomnia.rest/) is available [here](https://watch.screencastify.com/v/qQQh7IQ5dYfWBdVNudDg).


## Installation

Copy the files and folders from the repo into the desired directory.

From the root folder, install dependencies with the command
```
npm install
```


## Usage 

To seed the database, from the root folder use the command
```
npm run seed
```
To start the server, use the command
```
npm start
```
The result of these commands is shown below.

![Install, seed, and start commands](assets/images/install-seed-start.png)

Once the server is listening, the API functionality can be tested using [Insomnia](https://insomnia.rest/), as shown below.

![Demonstrating functionality using Insomnia](assets/images/insomnia.png)


## Credits

I used [Express](https://www.npmjs.com/package/express/v/4.18.2) to manage routing .

I used [Mongoose](https://www.npmjs.com/package/mongoose/v/8.0.1) for [MongoDB](https://www.mongodb.com/) object modeling.

I used [nodemon](https://www.npmjs.com/package/nodemon/v/3.0.1) for automatic server restart during development testing.


## License

Please refer to the LICENSE in the repo.


---
