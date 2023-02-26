import Main from './components/Main'
import React from 'react'

function page() {
  return (
    <div>
      <div className="decon" id='navbar'>
        <Main />
        <div className="dummy w-4/12 h-5/6 bg-white ">
          <a href="#navbar" className=' font-poppins  text-9xl'>Hello</a>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet quae ad debitis!</p>
        </div>
      </div>


      <div className="decon">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto quam tenetur voluptates, eaque totam debitis labore sint temporibus recusandae placeat qui suscipit doloremque dolorum laboriosam ducimus praesentium quae corrupti ullam ipsum aperiam perferendis! Enim, incidunt laborum dolorum ex est rerum.
      </div>

      <div className="decon">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto quam tenetur voluptates, eaque totam debitis labore sint temporibus recusandae placeat qui suscipit doloremque dolorum laboriosam ducimus praesentium quae corrupti ullam ipsum aperiam perferendis! Enim, incidunt laborum dolorum ex est rerum.
      </div>


      <div className="decon" id='bottom'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto quam tenetur voluptates, eaque totam debitis labore sint temporibus recusandae placeat qui suscipit doloremque dolorum laboriosam ducimus praesentium quae corrupti ullam ipsum aperiam perferendis! Enim, incidunt laborum dolorum ex est rerum.

        <a href="#navbar">Hello</a>
      </div>
    </div>
  )
}

export default page