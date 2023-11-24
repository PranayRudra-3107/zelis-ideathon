import React from "react";
import { BrowserRouter as  Link , Outlet} from 'react-router-dom';
const Temp = () => {
    return (
        <>
          <nav>
            <ul>              
              <li>
                <Link to="/list">Blogs</Link>
              </li>
              <li>
                <Link to="/submit">Contact</Link>
              </li>
            </ul>
          </nav>
     
          <Outlet />
        </>
      )
}

export default Temp;