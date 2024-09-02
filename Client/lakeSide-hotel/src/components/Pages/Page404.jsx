import React from 'react';
import { Link } from 'react-router-dom';
import './Page404.css'; // Assuming you want to style this component

const Page404 = () => {
  return (
    <div className="page-404">
      <h1>404</h1>
      <p>Well, this is awkward... Youre lost, arent you?</p>
      <p>It seems like the page youre looking for took a vacation. Maybe try another one?</p>
      <Link to="/" className="home-link">Let’s get you back home</Link>
    </div>
  );
};

export default Page404;
