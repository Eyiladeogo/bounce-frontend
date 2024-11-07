import {React, ReactDOM } from "react";

const date = new Date().getFullYear();

function Footer(){
    return <footer>
    <a href="https://eyiladeogo.vercel.app/" target="blank">
        Adedayo Eyiladeogo &copy; {date}
    </a>
  </footer>
}

export default Footer