import React from 'react'
import { Link } from 'react-router-dom'

function MenuLink({ icon, title, link }) {
  return (
    <li>
        <span>{icon}</span>
        <Link to={`/dashboard${link}`}>{title}</Link>
    </li>
  )
}

export default MenuLink