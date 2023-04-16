import { DateRange } from 'react-date-range';
import React, { useState } from "react";
import 'react-date-range/dist/styles.css';        // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './../styles/ScheduleCreation.css';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import com from '../common/common';
import { useNavigate } from 'react-router-dom';
import { API_LOCAL_URL } from './../common/constants'; 

const ScheduleCreation = (props) => {
  const navigate = useNavigate();
  //캘린더
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection'
    }
  ]);

  //콤보박스
  const [station, setAge] = React.useState('');
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  //뷰포트 설정
  com.viewportset();  

  //일정등록
  let fn_crSchedule =  async () =>{
    let title = document.getElementById("name").value; //제목
    let destination = station;                         //여행지
    var btMs = state[0].endDate.getTime() - state[0].startDate.getTime() ;
    var btDay = btMs / (1000*60*60*24) +1;             //일자 차이
    
    var startdate = com.dateformat(state[0].startDate); //시작일자
    var endDate = com.dateformat(state[0].endDate);     //종료일자
    
    var formdata = {
      "title"       : title,
      "destination" : destination,
      "btDay"       : btDay,
      "startdate"   : startdate,
      "endDate"     : endDate, 
    };
    
    
    var result = await com.axiosReq( API_LOCAL_URL + '/healthCheck','GET',formdata);
    console.log(JSON.stringify(result));


    
    navigate('/scheduling', { state: { data: btDay ,title: title} });
  };

  


  return (
    <div className='container'>
      
      <div className='box'>
        <h4 className='title99'>😁여행에 제목은 무엇인가요?</h4>
        {/* <input className='inputbox' type="text" id="name" name="name" required minlength="4" maxlength="8" ></input> */}
        <TextField className='inputbox' id="name" label="" variant="standard" />
      </div>
         
      <div className='box'>
        <h4 className='title99'>어디로🏖️ 여행을 떠나나요?</h4>

        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={station}
          onChange={handleChange}
          label=""
          className='combox'
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </div>
      <div className='box'>
        <h4 className='title99'>여행은 얼마나 떠나요?📅</h4>
        <DateRange
          editableDateInputs={true}
          onChange={item => setState([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={state}
          style={{ width: '100%' }}
        />
      </div>

      
      <Button className='button' variant="contained" endIcon={<SendIcon />} onClick={fn_crSchedule}>
        여행 떠나기
      </Button>
    </div>
  )
}

export default ScheduleCreation