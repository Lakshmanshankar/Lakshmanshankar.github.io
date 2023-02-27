import Main from './components/Main'
import React from 'react'
import About from './components/About'
function page() {
  return (
    <div>
      <div className="decon" id='navbar'>
        <Main />
        
      </div>





      <div className="decon" id='bottom'>
        <About />
      </div>
    </div>
  )
}

export default page