import React from 'react';
import Dashboard from '../components/dashboard';
import Sidebar from '../components/sidebar';
import Trendsbar from '../components/trendsbar';

const Main = ({user}) => {
    return (
        <div className="row">
            <div className='main__wrapper'>
                <Sidebar user={user}/>
                <Dashboard user={user}/>
                <Trendsbar />
            </div>
        </div>
    );
}

export default Main;
