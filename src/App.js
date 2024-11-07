import './App.css';
import bounceLogo from './assets/icon.svg'
import NavBar from './components/NavBar.js'
import Footer from './components/Footer.js';

function App() {
  return (
    <div className="App">
    <NavBar />
      <div className='logo-wrapper'>
        <header className="App-header">
        
          <div className='animated-shii'>
            <div className='shoe-wrapper'>
              <img src={bounceLogo} className='shoe' alt='Bounce Logo'></img>
            </div>
            <p className='name montserrat-subrayada-regular' >
              bounce
            </p>
            <p className='slogan raleway' >
              Elevate your game
            </p>
            
          </div>
          
        </header>
      </div>
      <Footer />
    </div>
  );
}

export default App;
