
import './App.css';
import React, { useState } from 'react';
import { Box } from './component/Boxes';
import { useEffect } from 'react';
import { LoadingView } from './component/Loading';
import { motion, AnimatePresence } from "framer-motion"
import StarRatings from 'react-star-ratings'
import { Nav } from './component/Navigation';
function App() {
  const [foodData, setFoodData] = useState({ isLoaded: false, item: null });
  const [selectedId, setSelectedId] = useState({data: false});
  const [loadMore, setLoadMore] = useState(false);
  const [error, setError] = useState(false);
  const [cartItems, setCartItems] = useState({data: ''});
  const url = "https://asm-dev-api.herokuapp.com/api/v1/food";
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
      (result) => { setFoodData({isLoaded: true, item: result })},
      (error) => { console.log("error:",error); setError(true);}
    )

  }, []);

  // const sumCartAmount = () => {
  //   let str = " hello";
  //   str = str.substring(1);

     //ADD ALL ITEMS PRICE 
//      const getCartTotalPrice = getOnlyAvailableCostValue.reduce((currentTotal,item)=>{
//       return (item.cost_in_credits + currentTotal)
// },0);
  // }
  const handleCallback = (childData) =>{
    const isEmpyString = cartItems.data === '';
    if (isEmpyString === true){
      setCartItems({data: [...cartItems.data, childData]});
    }
    else{
      const cartArrayValues = cartItems.data.map( cartData => {return cartData.data.id === childData.data.id });
      const isIncluded = cartArrayValues.includes(true);
      if (isIncluded === false){
        setCartItems({data: [...cartItems.data, childData]});
      }
    }
}
const totalCartNo = cartItems.data.length || 0;
return (
    <div className="App">
      {foodData.isLoaded === false 
      && error === false ?
        <LoadingView />
        
        : 
        error === true ? 
        <div className="error">
          <p>Something went wrong, check your internet connection.</p>
        </div>
        :
        <>
        {/* navigation */}
        <Nav totalCartNo={totalCartNo} />
        {/* end of navigation */}
          <motion.div 
            variants={container} initial="hidden" animate="show"
            className="food-box-list food-container">
            {/* <AnimateSharedLayout type="switch"> */}
            {foodData.item.data.meals.map( (data, id) => {
              return (
                // only show the first 6 items
                id <= 5 &&
                <motion.div
                key={data.id}
                  // onClick={() => setSelectedId({data: data})}
                  className="box-container"
                  variants={listItem}
                  whileHover={{ scale: .9 }}
                >
                  <Box 
                  // passing data from child to parent
                  parentCallback = {handleCallback}
                  img={data.strMealThumb}
                  description={data.description}
                  rating={data.ratings}
                  foodName={data.title}
                  price={data.price}
                  smallInfo={data.strMeal}
                  id={data.id}
                  />
                </motion.div>)
            })}

            <AnimatePresence>
              {/* modal */}
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
              {/* end of modal */}
            </AnimatePresence>
            {/* </AnimateSharedLayout> */}
            
          </motion.div>
          {/* load more */}
          {loadMore === false &&
            <div className="load-more">
              <button onClick={() => setLoadMore(true)}>Load More</button>
            </div>
          }
          {/* end of load more */}

          {loadMore === true &&
            <motion.div 
              variants={container}
               initial="hidden" 
               animate="show"
              className="food-box-list">
              {foodData.item.data.meals.map( (data, id) => {
                return (
                   // only show the last 6 items
                  id > 5 &&
                    <motion.div
                    key={data.id}
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
