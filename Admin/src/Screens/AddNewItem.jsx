import React, { useState, useEffect } from 'react';
import Navbar from '../Component/Navbar';
import { useNavigate } from 'react-router-dom';

function AddNewItem() {
  const [categoryName, setCategoryName] = useState('');
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [itemName, setItemName] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [halfPrice, setHalfPrice] = useState('');
  const [fullPrice, setFullPrice] = useState('');
  const [description, setDescription] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [catName, setCatName] = useState([]);

  const [postImage, setPostImage] = useState({ img: "" })

  let navigate = useNavigate();

  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:5000/admin/foodData", {
        method: "get",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await response.json();
      const foodCategories = data[1];

      setFoodCat(foodCategories);
      setCategoryName(foodCategories[0] || ''); // Set the default category name
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const newItem = {
        CategoryName: categoryName,
        name: itemName,
        img: postImage,
        options: [
          {
            half: halfPrice,
            full: fullPrice
          }
        ],
        description: description
      };

      await fetch('http://localhost:5000/admin/additem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItem)
      });

      setCategoryName('');
      setItemName('');
      setImageURL('');
      setHalfPrice('');
      setFullPrice('');
      setDescription('');

      alert('Item added successfully!');

      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Failed to add item.');
    }
  };


  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await converToBase64(file);
    setPostImage(base64);
  }

  const handleCat = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:5000/admin/addcategory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ CategoryName: catName })
      });
      if (res.status === 200) {
        alert("New Catrgory is added successfully")
      }
      else {
        alert("error")
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <div  >
        <Navbar />
        <section className='bg-white' style={{ height: '70vh' }}>
          <div className="container">
        
          <div className="row px-3">
            <form action="" onSubmit={handleCat}>
              <h5 className='fw-bold' style={{}}>Add New Category</h5>
              <div className="form-group">
                <label htmlFor="itemName">Item Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="itemName"
                  value={catName}
                  onChange={(e) => setCatName(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary mt-2">
                Add Item
              </button>
            </form>

            <form onSubmit={handleFormSubmit}>
            <h5 className='fw-bold mt-5' style={{}}>Add New Item</h5>
              <div className="form-group">
                <label htmlFor="categoryName">Category Name:</label>
                <select
                  className="form-control"
                  id="categoryName"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  required
                >
                   <option>Select Category</option>
                  {foodCat.map((category, index) => (
                    <>
                    <option key={index} value={category.CategoryName}>
                   
                      {category.CategoryName}
                    </option>
                    </>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="itemName">Item Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="itemName"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  required
                />

              </div>
              <div class="col-md-6">
                <label for="linkInput">Select Photo</label>
                <input type="file" label="image" name="img" class="form-control" accept='.jpeg, .png, .jpg' onChange={(e) => handleFileUpload(e)} />
              </div>
              <div className="form-group">
                <label htmlFor="halfPrice">Half Price:</label>
                <input
                  type="text"
                  className="form-control"
                  id="halfPrice"
                  value={halfPrice}
                  onChange={(e) => setHalfPrice(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="fullPrice">Full Price:</label>
                <input
                  type="text"
                  className="form-control"
                  id="fullPrice"
                  value={fullPrice}
                  onChange={(e) => setFullPrice(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                  className="form-control"
                  id="description"
                  rows="2"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary mt-2">
                Add Item
              </button>
            </form>
          </div>
        </div>
       
        </section>
      </div>
    </>
  );
}

export default AddNewItem;

function converToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result)
    };
    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}
