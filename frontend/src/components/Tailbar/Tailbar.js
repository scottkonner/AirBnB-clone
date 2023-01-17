import React from 'react';
import { Link } from 'react-router-dom';
import './Tailbar.css';

function Tailbar(){




  return (
    <ul className='Footer'>
      <li className='Foot-Items'>
      <Link className='Link-Text-Tailbar' to={{ pathname: "https://www.linkedin.com/in/scott-konner-0b38774a/" }} target="_blank">My LinkedIn</Link>
      </li>
      <li className='Foot-Items'>
      <Link className='Link-Text-Tailbar' to={{ pathname: "https://github.com/scottkonner" }} target="_blank">My GitHub</Link>
      </li>
    </ul>
  );
}

export default Tailbar;
