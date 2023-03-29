import { DateRange } from 'react-date-range';
import { Component } from 'react';
import Select from 'react-select'
import React, { useEffect, useState } from "react";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './../styles/ScheduleCreation.css';


const com = require('../common/common');

const ScheduleCreation = (props) => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection'
    }
  ]);

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ];
  

  com.viewportset();  
  return (
    <div className='container'>
      <div className='box'>
        <h4 className='title'>여행에 제목은 무엇인가요?</h4>
        <input className='inputbox' type="text" id="name" name="name" required minlength="4" maxlength="8" ></input>
      </div>
         
      <div className='box'>
        <h4 className='title'>여행에 제목은 무엇인가요?</h4>
        <form >
        <Select className='combox' options={options} />

        </form>
      </div>
      <div className='box'>
        <h4 className='title'>여행은 얼마나 떠나요?</h4>
        <DateRange
          editableDateInputs={true}
          onChange={item => setState([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={state}
          style={{ width: '100%' }}
        />
      </div>
      <button className='button'>
          여행 떠나기
      </button>
    </div>
  )
}

export default ScheduleCreation