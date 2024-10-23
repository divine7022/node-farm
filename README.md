# Node.js HTTP Server with File Handling, Slugify, and Routing

This project is a simple Node.js HTTP server that reads, serves, and processes files using the built-in `fs` module, implements routing with the `url` module, and uses `slugify` to create URL-friendly slugs. It also handles multiple pages like the overview, product, and API pages.

## Features

- **File Handling**: Reads and serves HTML templates using the `fs` module.
- **Slugify**: Generates slugs for product names.
- **Routing**: Handles multiple routes such as the overview page, product page, and API.
- **JSON Data**: Serves product data from a JSON file.
- **Error Handling**: Returns a 404 error for unknown routes.

## Project Structure

```bash
├── dev-data/
│   └── data.json          # Contains product data in JSON format
├── modules/
│   └── replaceTemplate.js # Function to replace placeholders in HTML templates
├── templates/
│   ├── template-card.html # HTML template for product cards
│   ├── template-overview.html # HTML template for overview page
│   └── template-product.html  # HTML template for product details
├── .gitignore             # Ignore node_modules, etc.
├── server.js              # Main Node.js server file
└── README.md              # Project documentation
```
##Installation
1. Clone this repository:
```bash
git clone <repository-url>
cd <project-directory>
```
2. Install dependencies:
```bash
npm install slugify
```
## To start
```bash
nodemon index.js
```
The server will listen on `http://127.0.0.1:8000`.

## Routes
- `/` or `/overview`: Displays the overview page with product cards.
- `/product?id=<productId>`: Displays details for a specific product based on the id query parameter.
- `/api`: Returns the product data in JSON format.
- Any other route: Returns a 404 page not found error.

## Code Overview
- File Handling: Reads the HTML templates synchronously at the start to prevent reloading on every request.
  Example:
  ```js
  const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
  );
- **Slugify**: Converts product names into URL-friendly slugs.
  Example:
  ```js
  const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
- **Routing**: Implements basic routing to serve different pages.
  Example:
  ```js
  const { query, pathname } = url.parse(req.url, true);
  if (pathname === '/' || pathname === '/overview') {
  // Serve overview page
  }

## Contributing
Feel free to open issues or submit pull requests to improve the project.


