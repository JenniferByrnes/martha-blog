# martha-blog
A blog and photo site for Martha

Martha's blog is a multi-page React Application that provides a place for a single user to display photos for her AirBnb and to record blog posts to share with friends.  It created using the FERN stack with Firebase Firestore, Auth, and Storage using React, Express, Node, TailwindsCSS.  I did work through the Brad Travery React class.  His project was a house-listing-app that used React and Firebase - I did learn from that and adapted that code as I worked on this project.

![License](https://img.shields.io/badge/License-MIT-lightblue.svg)

## Built with:

FERN stack

![Firebase](https://img.shields.io/badge/-Firebase-orange?style=for-the-badge&logo=firebase)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)



## Description:

A specialized app for one person's use.  Hopefully many wonderful blog posts and lovely photos will be stored with this app.  It began as a MERN stack blog and static photo app.  I combined the two and as I added images to the blog posts, needed to store them in Firebase storage.  Once I was using Firebase storeage, I needed Firebase authentication and it made sense to move the collection all over to Firebase to keep them together.  Only primary user can add/edit/delete posts, so please look at the screen shots to see that functionality.  The primary user has not decided upon some of the cosmetic features of the site, so those are open for change.  The functionality/menus/links for the blog and photos are all present and working.

A fully functional version is available [here](https://martha-blog.vercel.app/)

## Contents

- [Installation](#installation)
- [Usage](#usage)
- [Visuals](#visuals)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation

1. Clone the repo
   ```sh
   git clone git@github.com:JenniferByrnes/martha-blog.git
   ```
1. Create Firebase Storage, Auth, and Firestore
   ```sh
   In Firestore, collections are "blog" and "users"
   In Storage, the file is 'blogImages/'
   Authentication can be created with the SignUp window inside the app
   ```
2. Install all NPM packages
   ```sh
   npm install
   ```
3. Initiate application in the root of the application
   ```sh
   npm run start
   ```

## Usage

This is a combination blog/photo space for my friend, Martha.  The photos showcase her AirBnB and the blog is for her to share thoughts on her journey.  Other users can view them.

## Visuals

<img src="./client/src/assets/readme/home.png">
<img src="./client/src/assets/readme/photo-home.png">
<img src="./client/src/assets/readme/blog-home.png">
<img src="./client/src/assets/readme/blog-admin.png">
<img src="./client/src/assets/readme/blog-new.png">
<img src="./client/src/assets/readme/log-in.png">
<img src="./client/src/assets/readme/sign-up.png">
<img src="./client/src/assets/readme/contact-form.png">
<img src="./client/src/assets/readme/phone-size.png">

## License

This application is licensed under the MIT license.

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are welcome. If you have a suggestion that would make this better, please fork the repo and create a pull request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/NewFeature`)
3. Commit your Changes (`git commit -m 'Add some NewFeature'`)
4. Push to the Branch (`git push origin feature/New`)
5. Open a Pull Request

## Tests

No tests.

## Questions?

Check out the creators's Github links here:

[Github Jennifer Byrnes](https://github.com/JenniferByrnes)\