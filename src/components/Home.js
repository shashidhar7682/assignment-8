import React from 'react';
import Carousel from 'react-bootstrap/Carousel';


function Home() {
  return (
    <>
    <Carousel variant="success">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src=""
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src=""
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src=""
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
    <img src="" alt="" className='w-100' />
    <div className="row row-cols-2 row-cols-lg-4">
      <div className="col bg-dark"><img src="" alt="" /></div>
      <div className="col bg-dark"><img src="" alt="" /></div>
      <div className="col bg-dark"><img src="" alt="" /></div>
      <div className="col bg-dark"><img src="" alt="" /></div>
    </div>
    <img src="" alt="" className='w-100' />
    <div className="row row-cols-2 row-cols-lg-4">
      <div className="col bg-dark"><img src="" alt="" /></div>
      <div className="col bg-dark"><img src="" alt="" /></div>
      <div className="col bg-dark"><img src="" alt="" /></div>
      <div className="col bg-dark"><img src="" alt="" /></div>
    </div>
    </>
  )
}

export default Home;