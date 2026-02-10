import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Main from './components/Main'
import BlogSection from './components/Blog'


function App() {
  return (
    <>
      <div>
        <Header />
        <Main></Main>
        <BlogSection />
        <Footer />
      </div>
    </>
  )
}

export default App


