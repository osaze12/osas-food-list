import React from 'react'
import Truncate from 'react-truncate'
import StarRatings from 'react-star-ratings'
import './Boxes.css'

export const Box = ({img, smallInfo, foodName, price, description, rating}) => {
    return (
            <div className="box-inner">
                <img src={img} alt="food"/>
                <div className="box-group">
                 
                    <div className="box__food-top-info">
                        <div className="box__food-title">
                            <h2>{foodName}</h2>
                            <small>{smallInfo}</small>
                        </div>
                        <div className="box__food-price">
                            <h2>{price}</h2>
                        </div>
                    </div>
                    <div className="box__food-center-description">
                        <p>
                            <Truncate lines={3} ellipsis={<span>...</span>}>
                                {description}
                            </Truncate>
                        </p>
                        
                    </div>
                    <div className="box__food-bottom-action-area">
                        <div className="box__food-rating">
                            <StarRatings
                            rating={rating}
                            starRatedColor="#fa9e0d"
                            // changeRating={this.changeRating}
                            starDimension="15px"
                            starSpacing="1px"
                            numberOfStars={5}
                            name='rating'
                            />
                        </div>
                        <div className="box__food-add">
                            <i class="gg-math-plus"></i>
                        </div>
                        
                    </div>
                </div>
            </div>
    )
}