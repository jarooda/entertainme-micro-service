import React from 'react'
import InfiniteCarousel from "react-leaf-carousel";
import { Loading } from './index'
import { useHistory } from 'react-router-dom'

function Slide ({title, description, data, loading, error, service}) {
  const history = useHistory()

  return (
    <div className="h-96 transform -rotate-3 rounded-3xl bg-blue-400 mb-12 shadow-lg">
      <div className="h-60 w-4/12 absolute left-5 mt-10 transform rotate-3 flex flex-col justify-center items-center bg-black text-white rounded-l-full shadow-lg hover:-translate-x-3">
        <h1 className="text-4xl font-semibold">{title}</h1>
        <p className=" w-7/12 text-center">{description}</p>
      </div>
      <div className="transform w-4/6 rotate-3 bg-white shadow-lg rounded-3xl right-10 absolute h-96 p-5">
        {
          error ? <div className="flex h-full justify-center items-center">
            <p className="font-semibold">Oops, its looks like you're encounter an Error...</p>
          </div> :
          loading ? <div className="flex h-full justify-center items-center">
            <Loading/>
          </div> :
          <div className="pt-5">
            <InfiniteCarousel
              breakpoints={[
                {
                  breakpoint: 500,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                  }
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                  }
                }
              ]}
              dots={false}
              showSides={true}
              sidesOpacity={0.5}
              sideSize={0.1}
              slidesToScroll={4}
              slidesToShow={4}
              scrollOnDevice={true}
              autoCycle={data.length > 4 ? true : false}
            >
              {
                data.map((e) => (
                  <div
                    key={e._id}
                    className="transform scale-90 hover:scale-100 cursor-pointer"
                    onClick={service === 'movies' ? () => history.push(`/movies/${e._id}`) : () => history.push(`/series/${e._id}`)}
                  >
                    <p className="font-semibold text-center text-sm">{e.title}</p>
                    <img alt={e.title} src={e.poster_path} className="shadow rounded-md"/>
                  </div>
                ))
              }
            </InfiniteCarousel>
          </div>
        }
      </div>
    </div>
  )
}

export default Slide