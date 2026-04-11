import React from 'react';
import Hero from '../components/Hero';
import FeaturePanel from '../components/FeaturePanel';
import CategoryFilters from '../components/CategoryFilters';
import FarmList from '../components/FarmList';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleCategorySelect = (category) => {
    navigate(`/catalog?category=${encodeURIComponent(category)}`);
  };

  const handleFarmSelect = (farm) => {
    navigate(`/catalog?farm=${encodeURIComponent(farm)}`);
  };

  return (
    <div className="flex flex-col items-center">
      <Hero />
      <FeaturePanel />
      
      <CategoryFilters 
        activeCategory={null} 
        onSelect={handleCategorySelect} 
      />

      <FarmList 
        activeFarm={null}
        onSelectFarm={handleFarmSelect}
      />
    </div>
  );
};

export default Home;
