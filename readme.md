# React Image App
React Image App provides a simple solution for uploading images via a React frontend to an Express backend using Multer for file storage.

## Built with
* [Node.js](https://nodejs.org/)
* [React.js](https://reactjs.org/)
* [Express.js](https://expressjs.com/)
** [Multer](http://expressjs.com/en/resources/middleware/multer.html)
* [Fuse.js](https://fusejs.io/)

## Installation
1. Clone repo using command `git clone https://github.com/spencercolaco/react-image-app`
2. Run `npm install` in both client and server folders
3. Navigate in terminal to the server folder and run `node app.js` to spin up the backend
4. Navigate in terminal to the client folder and run `npm start` to spin up the frontend
5. View the project at `http://localhost:3000`

## Usage
Upon opening the app you should see four images displayed in a grid with a “search” input and a “choose file” input.

To upload an image, press the “choose file” button to browse your local files and select an image. After selecting a file, press the "upload" button and the DOM should update with this new image.

Note: only image file extensions are allowed (`.png`, `.jpg`, and `.jpeg`).

### API
To view the API in a program like [Postman](https://www.postman.com/) hit the endpoint `http://localhost:3000/image`.

### Search
[Fuse.js](https://fusejs.io/) allows for “fuzzy-search” functionality which will update the DOM with relevant images based on a query. Fuse looks at the image’s filename, so queries should include a word in the name of an image file.

## Roadmap
Continue to work on a more robust UI and to better understand how to watch for state changes with a fuzzy-search algorithm like Fuse.

The front end could be componentized to separate concerns a bit and enjoy a cleaner `App.js` file.

I would also like to explore a more elegant means to style an `<input type="file" />` element. The native HTML input is used here for brevity.

## License
[MIT](https://choosealicense.com/licenses/mit/)
