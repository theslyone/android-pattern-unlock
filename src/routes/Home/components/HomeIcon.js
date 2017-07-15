import React from 'react'
import PropTypes from 'prop-types'
import Ionicon from 'react-ionicons'
import { Link } from 'react-router'

const HomeIcon = ({ icon, title, link }) => (
  <div className='home-icon'>
    <Link to={link || { pathname: '/home' }}
      activeClassName='page-layout__nav-item--active'>
      <Ionicon className='home-btn' icon={icon} fontSize='30px' color='#FFF' />
    </Link>
    <div className='home-icon-title'>{title}</div>
  </div>
)

HomeIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  link: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    query: PropTypes.object
  })
}

export default HomeIcon
