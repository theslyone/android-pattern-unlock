import React from 'react'
import { IndexLink, Link } from 'react-router'
import Ionicon from 'react-ionicons'
import './HomeView.scss'

export const HomeView = () => (
  <div className='home-page'>
    <div className='home-title-head'>
      <span className='home-page-title'>All Applications</span>
      <div className='home-filter'>
        <Ionicon className='home-filter' icon='ion-funnel' fontSize='20px' color='#FFF' />
      </div>
    </div>

    <div className='home-row'>
      <div className='home-col'>
        <div className='home-icon'>
          <Ionicon className='home-btn' icon='ion-person' fontSize='30px' color='#FFF' />
          <div className='home-icon-title'>Contacts</div>
        </div>

        <div className='home-icon'>
          <Ionicon className='home-btn' icon='ion-chatbox' fontSize='30px' color='#FFF' />
          <div className='home-icon-title'>Messages</div>
        </div>

        <div className='home-icon'>
          <Ionicon className='home-btn' icon='ion-briefcase' fontSize='30px' color='#FFF' />
          <div className='home-icon-title'>Portfolio</div>
        </div>
      </div>
      <div className='home-col'>
        <div className='home-icon'>
          <Ionicon className='home-btn' icon='ion-social-facebook' fontSize='30px' color='#FFF' />
          <div className='home-icon-title'>Facebook</div>
        </div>

        <div className='home-icon'>
          <Ionicon className='home-btn' icon='ion-social-twitter' fontSize='30px' color='#FFF' />
          <div className='home-icon-title'>Twitter</div>
        </div>

        <div className='home-icon'>
          <Ionicon className='home-btn' icon='ion-social-dribbble-outline' fontSize='30px' color='#FFF' />
          <div className='home-icon-title'>Dribble</div>
        </div>
      </div>
      <div className='home-col'>
        <div className='home-icon'>
          <Ionicon className='home-btn' icon='ion-android-camera' fontSize='30px' color='#FFF' />
          <div className='home-icon-title'>Camera</div>
        </div>

        <div className='home-icon'>
          <Ionicon className='home-btn' icon='ion-information-circled' fontSize='30px' color='#FFF' />
          <div className='home-icon-title'>Credits</div>
        </div>

        <div className='home-icon'>
          <Ionicon className='home-btn' icon='ion-ionic' fontSize='30px' color='#FFF' />
          <div className='home-icon-title'>Ionic</div>
        </div>
      </div>
    </div>

    <div className='home-bottom-link-bar'>
      <Link to='/home' activeClassName='page-layout__nav-item--active'>
        <Ionicon className='home-bottom-btn' icon='ion-home' fontSize='35px' color='#FFF' />
      </Link>
      <IndexLink to='/' activeClassName='page-layout__nav-item--active'>
        <Ionicon className='home-bottom-btn' icon='ion-ios-locked' fontSize='35px' color='#FFF' />
      </IndexLink>

    </div>
  </div>
)

export default HomeView
