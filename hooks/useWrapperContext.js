import React, { useState,createContext, useContext ,useEffect} from 'react';

//creating a context with useContext react hook
const Context = createContext();

export default function ContextWrapper({ children }) {
  //creating the context states
  const [mapLocation, setMapLocation] = useState("Base");
  const [order, setOrder] = useState();
  //questionNum remebers which question number a user was on even if there is a lang switch
  const [questionNum, setQuestionNum] = useState(0);
  //this is what is stored in the context
  let value = {
      state: {
          questionNum: questionNum,
          order: order,
          mapLocation: mapLocation,
      },
      setQuestionNum: (newNum) => setQuestionNum(newNum),
      setOrder: (newOrder) => setOrder(newOrder),
      setMapLocation: (newMapLocation) => setMapLocation(newMapLocation),
      setOrder: (newOrder) => setOrder(newOrder),
  }

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
}
  
//function to call context
export function useWrapperContext() {
    return useContext(Context);
}