import React, { useState } from 'react';
import bounceLogo from '../assets/icon.svg'
import SignIn from './SignIn';
import UserProfile from './UserProfile';
import { Link, useNavigate } from 'react-router-dom'; // Assuming you are using react-router for navigation
import { FaShoppingCart, FaHeart, FaUser, FaSearch, FaBars } from 'react-icons/fa'; // You can replace these with your icons
import { useSelector, useDispatch } from 'react-redux';
// import { login,logout } from '../features/authSlice';
import { setSearchQuery } from '../features/searchSlice';

const Navbar = () => {

  
  const { isAuthenticated, user } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const [inputValue, setInputValue] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()
  const searchQuery = useSelector(state => state.search.query)

  const handleSearch = () => {
    if (inputValue.trim()){
      dispatch(setSearchQuery(inputValue))
      navigate(`/shop?search?q=${inputValue}`)
    }
  }

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    // <nav className="navbar">
    //   <div className="navbar-left">
    //     {/* Logo and Shop Link */}
    //     <Link to="/" className="logo">
    //       <img src={bounceLogo} alt="Logo" />
    //     </Link>
    //     <Link to="/shop" className="shop-link">Shop</Link>
    //   </div>

    <nav className="flex justify-between items-center bg-white px-4 lg:px-12 py-4 shadow-md">
        <div className="flex items-center">
            {/* Logo and Shop Link */}
            <Link to="/" className="mr-4 lg:mr-8">
            <img src={bounceLogo} alt="Logo" className="h-8 lg:h-10" />
            </Link>
            <Link to="/shop" className="text-black montserrat font-bold text-sm lg:text-lg">SHOP</Link>
        </div>

      <div className='flex-1 mx-4 lg:mx-12 max-w-md'>
        <div className="relative">
            {/* Search Bar */}
            <input
            type="text"
            placeholder="Search..."
            // value={searchQuery}
            onChange={(e) => {
              const value = e.target.value
              setInputValue(value)
              setSearchQuery(value)
              if (value === ""){
                dispatch(setSearchQuery(null))
              }
            }}
            className="w-full p-2 border border-gray-300 montserrat rounded-full text-center"
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <FaSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer' onClick={handleSearch}/>
            {inputValue && (
              <button onClick={() => {
                setInputValue('')
                setSearchQuery(null)
                dispatch(setSearchQuery(null))
                navigate('/shop')
              }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black hover:bg-transparent bg-transparent focus:outline-none transition-colors duration-300"
              >
                X
              </button>
            )

            }
        </div>
      </div>

      {/* Main Navbar Icons */}
      <div className="hidden lg:flex gap-4 text-xl icons">
        <Link to='/saved'>
            <FaHeart className="text-black cursor-pointer" title="Saved Items" />
        </Link>
        <Link to='/cart'>
            <FaShoppingCart className="text-black cursor-pointer" title="Cart" />
        </Link>
        {
          isAuthenticated ? 
          (
            <UserProfile />
          ) : (
            <SignIn/>
          )
          
          
        }
        {/* <button className="text-black cursor-pointer" title="Sign In" >Sign In</button> */}
        
      </div>

      {/* Menu Icon for Small Screens */}
      <div className='lg:hidden cursor-pointer text-black text-2x1' onClick={toggleMenu}>
        <FaBars className='text-2xl'/>
      </div>

      {/* Mobile Dropdown Menu   */}
      {isMenuOpen &&(
        <div className='absolute top-16 right-4 bg-white shadow-lg rounded-md p-4 flex flex-col lg:hidden'>
          <Link to='/saved' className='text-black cursor-pointer py-2' onClick={toggleMenu}>
            <FaHeart className="text-black cursor-pointer" title="Saved Items" />
          </Link>
          <Link to='/cart' className='text-black cursor-pointer py-2' onClick={toggleMenu}>
            <FaShoppingCart className="text-black cursor-pointer" title="Cart" />
          </Link>
          {isAuthenticated ? <UserProfile/> :<SignIn />}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
