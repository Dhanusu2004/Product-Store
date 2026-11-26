# product Store

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

## Live Link
https://product-store-8et2.onrender.com

## Project Description

Kadai Store is a responsive product browsing and shopping-cart web application. It retrieves product information from the DummyJSON Products API and presents it in a filterable, searchable product catalog. Users can view product details, sort and filter products, add items to a cart, update quantities, remove items, and have the cart retained in browser local storage.

The project is built with React, TypeScript, Redux Toolkit, React Router, Vite, and Tailwind CSS.

## Features

- Fetches products from the DummyJSON Products API
- Search products with a minimum search length of two characters
- Browse products by dynamically generated categories
- Filter products by minimum and maximum price
- Sort products by price or customer rating
- View a detailed product page with multiple images
- Add available products to the shopping cart
- Prevent adding out-of-stock products
- Increase or decrease cart quantities
- Remove products from the cart
- Persist cart items in browser `localStorage`
- Responsive product and cart layouts
- Loading, error, empty-cart, no-results, and 404 states

## Technologies Used

| Area | Technology |
|---|---|
| Frontend | React 19, TypeScript |
| Routing | React Router DOM 7 |
| State Management | Redux Toolkit 2, React Redux |
| Styling | Tailwind CSS 4, CSS |
| Build Tool | Vite 8 |
| Product Data | DummyJSON Products REST API |
| Persistence | Browser `localStorage` |
| Linting | Oxlint |

## Project Folder Structure

```text
Product-Store/
├── dist/
│   ├── assets/
│   ├── favicon.svg
│   ├── icons.svg
│   └── index.html
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── components/
│   │   ├── CategoryFilter.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── PriceFilter.tsx
│   │   ├── ProductCard.tsx
│   │   └── ProductList.tsx
│   ├── features/
│   │   ├── cart/
│   │   │   └── cartSlice.ts
│   │   └── products/
│   │       └── productsSlice.ts
│   ├── pages/
│   │   ├── Cart.tsx
│   │   ├── Home.tsx
│   │   ├── NotFound.tsx
│   │   └── ProductDetail.tsx
│   ├── store/
│   │   ├── hooks.ts
│   │   └── store.ts
│   ├── api.ts
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── types.ts
│   └── vite-env.d.ts
├── .gitignore
├── .oxlintrc.json
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.json
└── vite.config.ts
```

## Installation & Setup

### Prerequisites

- Node.js `20.19.0` or `22.12.0` and later
- npm
- Internet access for the DummyJSON product API

### Steps

1. Clone the repository:

```bash
git clone https://github.com/Dhanusu2004/Product-Store.git
cd Product-Store
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open the URL displayed by Vite, typically:

```text
http://localhost:5173
```

## Environment Variables

The project works without environment variables and defaults to the DummyJSON Products API. To override the API base URL, define `VITE_API_URL` in a `.env` file at the project root:

```dotenv
VITE_API_URL=https://dummyjson.com/products
```

The value should be the products endpoint (for example, `https://dummyjson.com/products`). Vite exposes only variables prefixed with `VITE_` to client code. Restart the development server after changing `.env`.

## How to Run the Project

| Action | Command |
|---|---|
| Start development server | `npm run dev` |
| Create production build | `npm run build` |
| Preview production build | `npm run preview` |
| Run Oxlint | `npm run lint` |

## Application Routes

| Path | Page | Purpose |
|---|---|---|
| `/` | Home | Displays, searches, filters, and sorts products |
| `/product/:id` | Product Detail | Displays one product and image gallery |
| `/cart` | Cart | Displays and manages cart items |
| Any unmatched path | Not Found | Displays the 404 page |

## API Endpoints

The application uses these external REST endpoints from [DummyJSON](https://dummyjson.com/). No custom backend or server-side API is included in this repository.

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `https://dummyjson.com/products?limit=10` | Fetch the default product list |
| `GET` | `https://dummyjson.com/products/search?q=<query>` | Search products by title, description, or related fields |
| `GET` | `https://dummyjson.com/products/<id>` | Fetch one product by numeric ID |

Example response fields used by the application include `id`, `title`, `description`, `category`, `price`, `discountPercentage`, `rating`, `thumbnail`, `images`, `stock`, `brand`, and `availabilityStatus`.

## Screenshots

### Home Page

<img width="1905" height="909" alt="Screenshot 2026-11-23 190646" src="https://github.com/user-attachments/assets/74df199e-5b5b-4e45-8c14-40091eb63bef" />


### Product Details

<img width="1902" height="875" alt="Screenshot 2026-11-23 190722" src="https://github.com/user-attachments/assets/82ab19d4-2665-436b-98ff-9f3e70e42cdb" />


### Shopping Cart

<img width="1897" height="898" alt="Screenshot 2026-11-23 190822" src="https://github.com/user-attachments/assets/0c40b416-50a1-43fd-a0a8-071462f3062c" />


## Future Improvements

- Add authentication and user accounts
- Connect a custom backend and database
- Implement server-side pagination
- Add a checkout and order placement flow
- Add payment gateway integration
- Add product wishlist functionality
- Improve accessibility and keyboard navigation
- Add unit and end-to-end tests
- Add configurable API settings through environment variables
- Introduce product review submission

## Author

**Dhanusu**  
GitHub: [@Dhanusu2004](https://github.com/Dhanusu2004)

## License

No license file is currently included in this repository. The source code is therefore not explicitly licensed for reuse or redistribution. Add an appropriate `LICENSE` file, such as an MIT, Apache-2.0, or other project-selected license, before distributing or publishing the project.
