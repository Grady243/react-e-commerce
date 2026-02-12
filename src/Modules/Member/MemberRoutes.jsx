import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import Profile from './Profile'
import Orders from './Orders'
import OrderDetails from './OrderDetails'
import AccountSettings from './AccountSettings'
import AddressBook from './AddressBook'
import Reviews from './Reviews'
import MemberSidebar from './MemberSidebar'

// Composant de routage pour l'espace membre avec sidebar
// Utiliser ce composant dans le router principal : <Route path="/member/*" element={<MemberRoutes/>} />
export default function MemberRoutes() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-4">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Sidebar + Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <MemberSidebar />

          {/* Main Content */}
          <main className="md:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
              <Routes>
                <Route path="/" element={<Dashboard/>} />
                <Route path="profile" element={<Profile/>} />
                <Route path="account" element={<AccountSettings/>} />
                <Route path="orders" element={<Orders/>} />
                <Route path="orders/:id" element={<OrderDetails/>} />
                <Route path="addresses" element={<AddressBook/>} />
                <Route path="reviews" element={<Reviews/>} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
