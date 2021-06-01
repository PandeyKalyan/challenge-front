import React from 'react';
import Header from './../sections/Header';

import AllChallenges from './dashboard/AllChallenges'

export default function Dashboard() {
    return (
        <div className="page">
            <Header />
            <AllChallenges />
        </div>
    )
}