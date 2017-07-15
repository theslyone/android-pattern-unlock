import React from 'react'
import { IndexLink, Link } from 'react-router'
import Ionicon from 'react-ionicons'
import HomeIcon from './HomeIcon'
import './HomeView.scss'

export const HomeView = () => (
  <div className='home-page'>
    <div className='home-title-head'>
      <span className='home-page-title'>Welcome</span>
      <div className='home-filter'>
        <Ionicon className='home-filter' icon='ion-funnel' fontSize='20px' color='#FFF' />
      </div>
    </div>

    <div className='home-row'>
      <div className='home-col'>
        <HomeIcon title='Contacts' icon='ion-person' />
        <HomeIcon title='Messages' icon='ion-chatbox' />
        <HomeIcon title='Portfolio' icon='ion-briefcase' />
      </div>
      <div className='home-col'>
        <HomeIcon title='Facebook' icon='ion-social-facebook' />
        <HomeIcon title='Twitter' icon='ion-social-twitter' />
        <HomeIcon title='Dribble' icon='ion-social-dribbble-outline' />
      </div>
      <div className='home-col'>
        <HomeIcon title='Camera' icon='ion-android-camera' />
        <HomeIcon title='Credits' icon='ion-information-circled' />
        <HomeIcon title='Change Password' icon='ion-android-unlock'
          link={{ pathname: '/', query: { mode: 'changePassword' } }} />
      </div>
    </div>

    <div className='home-bottom-link-bar'>
      <Link to='/home' activeClassName='page-layout__nav-item--active'>
        <Ionicon className='home-bottom-btn' icon='ion-home' fontSize='30px' color='#FFF' />
      </Link>
      <IndexLink to='/' activeClassName='page-layout__nav-item--active'>
        <Ionicon className='home-bottom-btn' icon='ion-ios-locked' fontSize='30px' color='#FFF' />
      </IndexLink>
    </div>
  </div>
)

export default HomeView
