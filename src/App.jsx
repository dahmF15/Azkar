import './App.css'
import React, { useEffect, useState } from 'react';
import Azkar from './Comps/azkar.json'


function App() {
  const [azkar, setAzkar] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMorning, setIsMorning] = useState(true)

  useEffect(() => {
    const fetchAzkar = async () => {
      const response = await fetch(Azkar); // Path to your JSON file
      const data = await response.json();
      setAzkar(data);
    };

    fetchAzkar();
  }, []);


  
  

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const totalCount = isMorning && Azkar["أذكار الصباح"] ? Azkar["أذكار الصباح"].length : Azkar["أذكار المساء"].length;
      return (prevIndex + 1) % totalCount; // Loop back to the start
    });
  };


  const toggleAzkar = () => {
    setIsMorning((prev) => !prev);
    setCurrentIndex(0); // Reset index when switching
  };
  return (
    <>
    


    <div className='bg-slate-200 rounded-3xl p-12'>
      <h1 className='text-5xl text-black'>{isMorning ? "أذكار الصباح" : "أذكار المساء"}</h1>
      {isMorning ? (
        Azkar["أذكار الصباح"] && (
          <div>
            <p className='text-2xl text-black mt-12 mb-12'>{Azkar["أذكار الصباح"][currentIndex].content}</p>
            <button onClick={handleNext}>التالي</button> {/* "Next" button */}
          </div>
        )
      ) : (
        Azkar["أذكار المساء"] && (
          <div>
            <p className='text-2xl text-black mt-12 mb-12'>{Azkar["أذكار المساء"][currentIndex].content}</p>
            <button onClick={handleNext} className='pl-20 pr-20 rounded-[50px]'>التالي</button> {/* "Next" button */}
          </div>
        )
      )}
      <button onClick={toggleAzkar} className='p-3 pl-7 pr-7 rounded-full mt-4'>
        {isMorning ? "انتقال إلى أذكار المساء" : "انتقال إلى أذكار الصباح"}
      </button> {/* Toggle button */}
    </div>
      
    </>
  )
}

export default App
