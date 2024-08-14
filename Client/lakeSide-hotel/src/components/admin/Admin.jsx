import React from 'react';
import { Link } from 'react-router-dom';
const Admin = () => {
  return (
    <section className="container mt-5">
        
        <h2>Welcom To Admin Panle</h2>
    <hr>
    </hr>
    <Link to ={"/add-room"}>
    Mange Rooms 
    </Link>
    
    </section>

  )
}

export default Admin