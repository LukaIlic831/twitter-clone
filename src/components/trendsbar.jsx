import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Trendsbar = () => {
    return (
        <div className='trendsbar__wrapper'>
            <div className="search__twitter">
                <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" className='search' />
                <input type="text" className='search__input' disabled placeholder='Search Twitter' />
            </div>
            <div className="trends__block">
                <div className="trends__title">
                    <h3>Trends for you</h3>
                </div>
                <div className="trends__wrapper">
                    <div className="trend">
                        <div className="trend__para">
                            <span className='trend__category'>Technology · Trending</span>
                            <p className='trend__name'>#TikTok</p>
                            <span className='trend__tweets'>99.1K Tweets</span>
                        </div>
                        <div className="trend__dots">
                            <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
                        </div>
                    </div>
                    <div className="trend">
                        <div className="trend__para">
                            <span className='trend__category'>Politics · Trending</span>
                            <p className='trend__name'>#Serbia</p>
                            <span className='trend__tweets'>1.54M Tweets</span>
                        </div>
                        <div className="trend__dots">
                            <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
                        </div>
                    </div>
                    <div className="trend">
                        <div className="trend__para">
                            <span className='trend__category'>Spots · Trending</span>
                            <p className='trend__name'>#Goat</p>
                            <span className='trend__tweets'>111K Tweets</span>
                        </div>
                        <div className="trend__dots">
                            <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
                        </div>
                    </div>
                    <div className="trend">
                        <div className="trend__para">
                            <span className='trend__category'>Business · Trending</span>
                            <p className='trend__name'>#Cryptocurrency</p>
                            <span className='trend__tweets'>40K Tweets</span>
                        </div>
                        <div className="trend__dots">
                            <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
                        </div>
                    </div>
                    <div className="trend">
                        <div className="trend__para">
                            <span className='trend__category'>Technology · Trending</span>
                            <p className='trend__name'>#Youtube</p>
                            <span className='trend__tweets'>1M Tweets</span>
                        </div>
                        <div className="trend__dots">
                            <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
                        </div>
                    </div>
                    <div className="trend">
                        <div className="trend__para">
                            <span className='trend__category'>Politics · Trending</span>
                            <p className='trend__name'>#Donald Trump</p>
                            <span className='trend__tweets'>820 Tweets</span>
                        </div>
                        <div className="trend__dots">
                            <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
                        </div>
                    </div>
                    <div className="trend">
                        <div className="trend__para">
                            <span className='trend__category'>Sports · Trending</span>
                            <p className='trend__name'>#Real Madrid</p>
                            <span className='trend__tweets'>38K Tweets</span>
                        </div>
                        <div className="trend__dots">
                            <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Trendsbar;
