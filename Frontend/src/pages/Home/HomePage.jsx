import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import Search from '../../components/Search/Search';
import Tags from '../../components/Tags/Tags';
import Thumbnails from '../../components/Thumbnails/Thumbnails';
import { getAll, getAllByTag, getAllTags, search } from '../../services/foodService';
import NotFound from '../../components/NotFound/NotFound';
import { toast } from 'react-toastify';
import Footer from '../../components/Footer/Footer';
import UpcomingEvent from '../../components/UpcomingEvent/UpcomingEvent';
import FoodMenu from '../../components/FoodMenu/FoodMenu';
import FoodItem from '../../components/Thumbnails/Thumbnails';
import Carousel from '../../components/Carousel/Carousel';
import Header from '../../components/Header/Header';
import Asidebar from '../../components/Asidebar/Asidebar';
import About from '../About/About';
import SpecialDish from '../SpecialDish/SpecialDish';
import Offers from '../OffersPage/OffersPage';

const initialState = { foods: [], tags: [], isLoading: true, error: null };

const reducer = (state, action) => {
  switch (action.type) {
    case 'FOODS_LOADED':
      return { ...state, foods: action.payload, isLoading: false };
    case 'TAGS_LOADED':
      return { ...state, tags: action.payload };
    case 'LOADING':
      return { ...state, isLoading: true };
    case 'ERROR':
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export default function HomePage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { foods, tags, isLoading, error } = state;
  const { searchTerm, tag } = useParams();

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tagsData = await getAllTags();
        dispatch({ type: 'TAGS_LOADED', payload: tagsData });
      } catch (error) {
        toast.error('Failed to load tags');
        dispatch({ type: 'ERROR', payload: 'Failed to load tags' });
      }
    };

    const fetchFoods = async () => {
      dispatch({ type: 'LOADING' });
      try {
        const foodsData = tag
          ? await getAllByTag(tag)
          : searchTerm
          ? await search(searchTerm)
          : await getAll();
        dispatch({ type: 'FOODS_LOADED', payload: foodsData });
      } catch (error) {
        toast.error('Failed to load foods');
        dispatch({ type: 'ERROR', payload: 'Failed to load foods' });
      }
    };

    fetchTags();
    fetchFoods();
  }, [searchTerm, tag]);

  if (isLoading) {
    
    return <p>Loading...</p>;
  }

  return (
    <>
      {/* <Search /> */}
      {/* {foods.length === 0 && <NotFound linkText="Reset Search" />} */}
      {error && <p className="error">{error}</p>}
      <div class="primary-screen">
        <Header />
        <Asidebar/>
        <Carousel/>
      </div>
      <About/>
      <Offers/>
      <SpecialDish/>
      <FoodMenu  foods={foods} tags={tags} />
      <UpcomingEvent/>
      <Footer/>
    </>
  );
}
