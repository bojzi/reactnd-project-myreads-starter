# MyReads: A Book Lending App Project

This is the project for the Udacity React Nanodegree program.

To use the project, please:

* install all project dependencies with `npm install`
* start the development server with `npm start`

## Project requirements
* Project installs and runs easily - ✅
* The application includes a README with instructions to install and run the project - ✅
* The main page shows three categories (bookshelves) - ✅
    * even better - the project allows for unlimited bookshelves, the categorization isn't hardcoded (apart from the dropdown menu), so adding a new category is a breeze
* The main page allows users to move books - ✅
* The information persists between refreshes - ✅
* The page has a search field - ✅
* The search results allow the user to categorize books (add them to the collection) - ✅
    * even better - books which are already in the collection (on the shelves) won't show up in search results; it makes sense, from a UX perspective, to not show results with which the user can't do anything
* Selection made on the search page show on the main page - ✅
* The main page links to the search page - ✅
* The search page has a back link - ✅
* The project handles state appropriately - ✅
* JSX is formatted properly - ✅

## Backend Server

The backend server with books is provided by Udacity. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods needed to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query, maxResults)
```

* query: `<String>`
* maxResults: `<Integer>` Due to the nature of the backend server, search results are capped at 20, even if this is set higher.
* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.
