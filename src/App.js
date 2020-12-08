import './App.css';
import Profile from './Profile/Profile'
import NavBar from './NavBar/NavBar'
import Footer from './Footer/Footer'
import CreateReview from './CreateReview/CreateReview'
import CreateFandom from './CreateFandom/CreateFandom'
import ReviewMain from './ReviewMain/ReviewMain'
import SignUp from './SignUp/SignUp'
import Landing from './Landing/Landing'

function App() {
  return (
    <>
    <NavBar />
    <Profile/>
    <CreateReview />
    <CreateFandom />
    <ReviewMain />
    <SignUp />
    <Landing />
    <Footer />
    </>
  );
}

export default App;
