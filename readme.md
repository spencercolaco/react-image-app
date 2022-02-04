# React Image App

React Image App is a simple solution for uploading images via a React frontend to an Express backend using Multer for file storage.

## Built With

* [Node.js](https://nodejs.org)
* [React.js](https://reactjs.org/)
* [Express.js](https://expressjs.com/)
* [Multer](http://expressjs.com/en/resources/middleware/multer.html)
* [Fuse.js](https://fusejs.io/)

## Installation

1. Clone repo `git clone https://github.com/spencercolaco/react-image-app`
2. Run `npm install` in both the client and server folder
3. Navigate in terminal to the server folder and run `node app.js` to spin up the backend
4. Navigate in terminal to the client folder and run `npm start` to spin up the frontend
5. You can now view the project at `http://localhost:3000`
6. If you would like to use a program like Postman to view the API you can hit the endpoint `http://localhost:3000/image`

## Usage
You should see 4 images displayed in a grid with a "search" input and a "choose file" input above. 

[Fuse.js](https://fusejs.io/) is used for "fuzzy-search" functionality, so the DOM should update the images with the most relevant image appearing first based on your query. Fuse is setup to look at the image's filename, so your query should be a relevant word in the actual name of the image file. 

To upload an image, please press the "choose file" button to browse your local files and select an image. Please note only image file extensions are allowed (.png, .jpg, and .jpeg). Once you have selected a file, please press the "upload" button and you should see the DOM updated with your new image!

## Known issues

- There is currently a bug when searching for an image. Sometimes the images do not re-populate after a search query and the page needs to be refreshed to bring them back. Currently working on a fix for this.

## Road Map
I am continuing to work on a more robust UI and better understand how to watch for state changes with a fuzzy-search algorithm like Fuse. Wiring together this kind of functionality can be tricky and needs to be looked into further.

The front end could be componetized to separate our concerns a bit and enjoy a cleaner App.js file.

I would also like to explore a potentially less hacky way to style an `<input type="file" />` element. The native HTML input is used here for brevity.

## License
[MIT](https://choosealicense.com/licenses/mit/)