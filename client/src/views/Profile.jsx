import React from 'react'
import SideBar from '../components/SideBar'
import ProfileForm from '../components/ProfileForm'

export default function Profile() {
  return (
    <div className="flex">
        <SideBar />
        <div className="m-3 text-xl text-gray-900 font-semibold flex-1">
            <ProfileForm />
        </div>
    </div>
  )
}
