
import './App.css';
import React, { useState } from 'react';
import { Box } from './component/Boxes';
import { useEffect } from 'react';
import { LoadingView } from './component/Loading';
import { motion, AnimatePresence } from "framer-motion"
import StarRatings from 'react-star-ratings'
function App() {
  const [foodData, setFoodData] = useState({ isLoaded: false, item: null });
  const [selectedId, setSelectedId] = useState({data: false});
  const [loadMore, setLoadMore] = useState(false);
  
  const [error, setError] = useState(false);
  const url = "https://asm-dev-api.herokuapp.com/api/v1/food";
  console.log(selectedId)
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5
        
      }
    }
  };
  
  const listItem = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
  };
  useEffect( () => {
    fetch(url)
    .then(res => res.json() )
    .then(
      result => { setFoodData({isLoaded: true, item: result },
      error => { 
        console.log("error:",error);
        setError(true);
      });
     })

  }, []);
  return (
    <div className="App">
      {error === true && <div className="error"><p>Error</p> </div>}

      {foodData.isLoaded === false ?
        <LoadingView />
        :
        <>
          <motion.div 
            variants={container} initial="hidden" animate="show"
            className="food-box-list">
            {/* <AnimateSharedLayout type="switch"> */}
            {foodData.item.data.meals.map( (data, id) => {
              
              return (
                // only show the first 6 items
                id <= 5 &&
                <motion.div
                  onClick={() => setSelectedId({data: data})}
                  className="box-container"
                  variants={listItem}
                  whileHover={{ scale: .9 }}
                >
                  <Box 
                  img={data.strMealThumb}
                  description={data.description}
                  rating={data.ratings}
                  foodName={data.title}
                  price={data.price}
                  smallInfo={data.strMeal}
                  />
                </motion.div>)
            })}

            <AnimatePresence>
              {selectedId.data  && (
                <motion.div 
                  className="g" layoutId={selectedId}>
                            <motion.div
                              initial={{ opacity: 0, 
                                y: 60, scale: 0.5 }}
                              animate={{
                                opacity: 1,
                                y: 0,
                                scale: 1,
                                // making use of framer-motion spring animation
                                // with stiffness = 300
                                transition: { type: "spring", 
                                              stiffness: 300 }
                              }}
                              exit={{ opacity: 0, scale: 0.5, 
                                      transition: { duration: 0.2 }}}
                              className="g-inner modal"
                            >
                              <div className="close">
                                <i  onClick={() => setSelectedId(false)} class="gg-close"></i>
                              </div>
                              <img src={selectedId.data.strMealThumb} alt="meal"/>
                              <div className="title">
                                <h2>{selectedId.data.title}</h2>
                                <small>{selectedId.data.strMeal}</small>
                              </div>
                              
                              <p className="description">{selectedId.data.description}</p>
                              <StarRatings
                                rating={selectedId.data.ratings}
                                starRatedColor="#fa9e0d"
                                // changeRating={this.changeRating}
                                starDimension="15px"
                                starSpacing="1px"
                                numberOfStars={5}
                                name='rating'
                              />
                              
                            </motion.div>
                  
                </motion.div>
              )}
            </AnimatePresence>
            {/* </AnimateSharedLayout> */}
            
          </motion.div>
          {loadMore === false &&
            <div className="load-more">
              <button onClick={() => setLoadMore(true)}>Load More</button>
            </div>
          }
          {loadMore === true &&
            <motion.div 
              variants={container} initial="hidden" animate="show"
              className="food-box-list">
              {foodData.item.data.meals.map( (data, id) => {
                return (
                   // only show the last 6 items
                  id > 5 &&
                    <motion.div
                      onClick={() => setSelectedId({data: data})}
                      className="box-container"
                      variants={listItem}
                      whileHover={{ scale: .9 }}
                    >
                    <Box 
                      img={data.strMealThumb}
                      description={data.description}
                      rating={data.ratings}
                      foodName={data.title}
                      price={data.price}
                      smallInfo={data.strMeal}
                    />
                  </motion.div>
                )
              })}
            </motion.div>
          }
        </>
      }
    </div>
  );
}

export default App;
