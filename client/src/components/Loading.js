import React from 'react'

function Loading() {
  return (
    <div className='loading__container'>
        <h3 className='loading__container__heading'>Uploading...</h3>
        <div className='loading__container__progress'>
            <div className='loading__container__progress__bar'>
            </div>
        </div>
    </div>
  )
}

export default Loading