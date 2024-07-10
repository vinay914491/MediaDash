import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import twitterResponse from '../performance_predictions.json'
import instagramResponse from '../segmentation_results.json'
import spotifyResponse from '../churn_predictions.json';
import Navb from './navbar';
import Foot from './footer';
import './Dashboard.css';
import Segmentation from './segmentation';
import Performance from './performance';
import Churn from './churn';

console.log(twitterResponse)
console.log(instagramResponse)
console.log(spotifyResponse)

const Dashboard = () => 
    {
       
 

  return (

    <div classname="dash">
        <Navb/>
        <div className="App">
      <h1>Media Analytics Dashboard</h1>
      <br></br><br></br><br></br><br></br><br></br><br></br>
      <Segmentation />
      <Performance />
      <Churn />
    </div>
    <div classname="footer"><Foot/></div>
    </div>
    
  );

};

export default Dashboard;
