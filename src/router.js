import React from 'react';
import App from "./app.js"
import About from './about.js'
import Contact from './contact.js'

const Router = (props) => {
  if (window.location.pathname === '/') {
    return <App />
  } else if (window.location.pathname === '/about') {
    return <About />
  } else if (window.location.pathname === '/contact') {
    return <Contact />
  } else {
    return <h1>404: Page not found</h1>
  }
}

export default Router;