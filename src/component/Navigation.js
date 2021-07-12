import './Navigation.css'
import React from 'react';
import { motion} from "framer-motion"

export const Nav = ({totalCartNo}) => {
    return (
        <div className="nav">
            <div className="nav__content">
                <motion.div 
                    initial={
                        {
                        opacity: 0, 
                        y: -60,
                        scale: 0.5 
                        }
                    }
                    animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        // making use of framer-motion spring animation
                        // with stiffness = 300
                        transition: {delay: 3, type: "spring", 
                                      stiffness: 300 }
                      }}
                    exit={{ opacity: 0, scale: 0.5, 
                              transition: { duration: 0.2 }}}
                    className="nav__group">
                    <div className="nav__shop-cart-icon">
                        <i className="gg-shopping-cart"></i>
                        <div className="nav__item-number">
                            <p>
                                { totalCartNo }
                            </p>
                        </div>
                    </div>
                    
                </motion.div>
            </div>
        </div>
    )
}