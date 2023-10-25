import React, { useState, useEffect } from 'react'
import Navbar from '../Component/Navbar'
import Card from '../Component/Card';
function Dashboard() {
  const [search, setsearch] = useState('')
  const [foodItems, setfoodItems] = useState([])
  const [foodCat, setfoodCat] = useState([])

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/admin/foodData", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    response = await response.json();

    setfoodItems(response[0])
    setfoodCat(response[1])

  }

  useEffect(() => {
    loadData()
  }, [])
  return (
    <div>
      <Navbar />
      <section className='bg-white' style={{ height: '70vh' }}>
        <div className="container">
          <div class="row mt-3 px-3">
            <div className="d-flex justify-content-center">
              <input className="form-control me-2" type="search" placeholder="Search"
                value={search} onChange={(e) => { setsearch(e.target.value) }} aria-label="Search" />
            </div>
            <div className="container">
              {
                foodCat !== [] ?
                  foodCat.map((data) => {
                    return (
                      <div className='row mb-3'>
                        <div key={data._id} className='m-3 fs-3'>
                          {data.CategoryName}
                        </div>
                        <hr />
                        {foodItems !== [] ?
                          foodItems.filter((items) => items.CategoryName === data.CategoryName && (items.name.toLowerCase().includes(search.toLocaleLowerCase())))
                            .map(filterItems => {
                              return (
                                <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                                  <Card foodItems={filterItems}
                                    options={filterItems.options[0]}>
                                  </Card>
                                </div>
                               
                              )
                            }) : <div>No Such Data</div>
                        }
                      </div>
                    )
                  }) : <div>""""""</div>
              }
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard