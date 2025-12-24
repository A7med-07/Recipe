import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";


export default function Moo() {

  const navigate = useNavigate();


  const [categories, setCategories] = useState([])
  const [meals, setMeals] = useState([])
  const [activeCategory, setActiveCategory] = useState('All');


  // get categories
  async function getCategories() {
    const { data } = await axios.get(
      'https://www.themealdb.com/api/json/v1/1/list.php?c=list'
    )
    setCategories(data.meals)
    console.log(data.meals);

  }

  // get all meals
  async function getAllMeals() {
    const { data } = await axios.get(
      'https://www.themealdb.com/api/json/v1/1/search.php?s='
    )
    setMeals(data.meals)
    console.log(data.meals);
  }

  // get meals by category
  async function getMealsByCategory(category) {
    const { data } = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    )
    setMeals(data.meals)
    console.log(data.meals);
  }

  useEffect(() => {
    getCategories()
    getAllMeals()
  }, [])

  return (
    <>
      <div className='p-4 overflow-hidden sm:ml-64 min-h-screen'>
        <div className='container py-8 px-4'>

          <h1 className='text-4xl font-bold bg-linear-to-r from-[#F29725] to-[#c90519] to-50% bg-clip-text text-transparent font-pacifico'>
            Learn, Cook, Eat Your Food
          </h1>

          <div className="sm:hidden mt-8">
            <label htmlFor="tabs" className="sr-only">Select your category</label>
            <select
              id="tabs"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
              onChange={(e) => getMealsByCategory(e.target.value)}
            >
              <option value="All">All</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat.strCategory}>
                  {cat.strCategory}
                </option>
              ))}
            </select>
          </div>
          <ul className='sm:flex hidden mt-8 flex-wrap gap-4 font-medium text-center text-gray-500 border-b border-gray-200'>

            <li className='me-2'>
              <a
                onClick={(e) => { e.preventDefault(); getAllMeals(); setActiveCategory('All'); }}
                href="#/"
                className={`inline-block catLink px-4 py-2 border transition-all hover:shadow-xl shadow duration-300 rounded-full hover:text-gray-600 hover:bg-gray-50 ${activeCategory === 'All' ? 'active' : ''}`}
              >
                All
              </a>
            </li>

            {categories.map((cat, index) => (
              <li className='me-2' key={index}>
                <a
                  onClick={(e) => { e.preventDefault(); getMealsByCategory(cat.strCategory); setActiveCategory(cat.strCategory); }}
                  href="#/"
                  className={`inline-block catLink px-4 py-2 border transition-all hover:shadow-xl shadow duration-300 rounded-full hover:text-gray-600 hover:bg-gray-50 ${activeCategory === cat.strCategory ? 'active' : ''}`}
                >
                  {cat.strCategory}
                </a>
              </li>
            ))}

          </ul>


          <div className='meals mt-24 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-20'>
            {meals?.map(meal => (
              <div
                key={meal.idMeal}
                className="meal text-center hover:shadow-xl group hover:scale-105 duration-300 transition-all bg-white p-12 pb-4 rounded-[35px]"
              >

                <img
                  src={meal.strMealThumb}
                  className='w-full group-hover:rotate-[360deg] duration-700 transition-all rounded-full drop-shadow-xl -translate-y-20 shadow-2xl'
                  alt={meal.strMeal}
                />

                <h3 className="font-semibold -mt-12 font-Pacifico tracking-wider text-xl">
                  {meal.strMeal.split(" ").slice(0, 2).join(" ")}
                </h3>

                <h5 className="flex justify-center items-center gap-2 text-emerald-600"> <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zM4 12c0-.899.156-1.762.431-2.569L6 11l2 2v2l2 2 1 1v1.931C7.061 19.436 4 16.072 4 12zm14.33 4.873C17.677 16.347 16.687 16 16 16v-1a2 2 0 0 0-2-2h-4v-3a2 2 0 0 0 2-2V7h1a2 2 0 0 0 2-2v-.411C17.928 5.778 20 8.65 20 12a7.947 7.947 0 0 1-1.67 4.873z"></path>
                </svg>{meal.strArea}</h5>

                <button
                  onClick={() => navigate(`/details/${meal.idMeal}`)}
                  className="text-white mt-4 bg-emerald-900 hover:bg-emerald-600 font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 px-8 py-2 rounded-full"
                >
                  View Recipe
                </button>


              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  )
}
