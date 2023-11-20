"use client";

import { Hero } from '@/components';
import Image from 'next/image';
import {SearchBar, CustomFilter} from '@/components';
import { fetchCars } from '@/utils';
import {CarCard} from '@/components';
import { fuels, manufacturers, yearsOfProduction } from '@/constants';
import ShowMore from '@/components/ShowMore';
import { useEffect, useState } from 'react';



export default  function Home() {
  
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(false);

//search state
  const [manufacturer, setManufacturer] = useState('')
  const [model, setModel] = useState('')

// filter state
  const [fuel, setFuel] = useState('')
  const [year, setYear] = useState(2022)

// pagination state
  const [limit, setLimit] = useState(10);

  const getCars = async () => {
    setLoading(true);
    try {
      const result = await fetchCars({
        manufacturer: manufacturer || '',
        year: year || 2023,
        fuel: fuel || '',
        limit: limit || 10,
        model: model || '',
      });
      setAllCars(result);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getCars()
  },[manufacturer,model, fuel, year, limit]) 

  const isDataEmpty = !Array.isArray(allCars) 
                      || allCars.length < 1 
                      || !allCars;

  return (
    <main className="overflow-hidden">
      <Hero/>
      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>
          Car Catalogue
          </h1>
          <p>Explore the cars you might like</p>
        </div>

        <div className='home__filters'>
          <SearchBar 
          setManufacturer={setManufacturer} 
          setModel={setModel} 
          />

          <div className='home__filter-container'>
            <CustomFilter 
            title='fuel' 
            options={fuels} 
            setFilter={setFuel}
            />
            <CustomFilter 
            title='year' 
            options={yearsOfProduction}
            setFilter={setYear} 
            />
          </div>
        </div>

        {allCars.length > 0 ? (
          <section>
            <div className='home__cars-wrapper'>
              {allCars?.map((car) => (
                <CarCard car={car}
                />
              ))}
            </div>
            
            {loading && (
              <div className='mt-16 w-full flex-center'>
                <Image
                src="/loader.svg"
                alt="loader"
                height={50}
                width={50}
                className='object-contain'
                />
              </div>
            )}

            <ShowMore
            pageNumber={limit  / 10 }
            isNext={limit > allCars.length }
            setLimit={setLimit}
            />

          </section>
        ):
        (
         <div className='home__error-container'>
            <h2 className='text-black text-xl font-bold'>Oops, No Results</h2>
            <p>{allCars?.message}</p>
          </div>
        )}

      </div>
    </main>
  )
}