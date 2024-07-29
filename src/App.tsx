import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Movies from './pages/Movies';
import TvSeries from './pages/TvSeries';
import Search from './pages/Search';
import Details from './pages/Details';
import Appbar from './components/Appbar';

function App() {
  return (
    <>
      <Appbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/tv-series' element={<TvSeries />} />
        <Route path='/search' element={<Search />} />
        <Route path='/details/:movieid/:mediatype' element={<Details />} />
      </Routes>
    </>
  );
}

export default App;
