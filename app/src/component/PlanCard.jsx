import React from 'react'

const PlanCard = (props) => {
  const planList = props.data.map((content, idx) => (
    <div>
      <img src={content.planImgInfo} />
    </div>
  ))
  return (
    <div>
      <div className='plan-list'>{planList}</div>
    </div>

  )
}

export default PlanCard