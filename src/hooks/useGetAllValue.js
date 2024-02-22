import React, { useEffect, useState } from "react";
import { getAllValue } from "../service/authenticator";

function useGetAllValue() {
    const [allValue, setAllValues] = useState(null);
    useEffect( () => {
      let funct=  async ()=>{
        let result = await getAllValue();
            console.log(result);
        }
            //  setAllValues()
     funct();
    }, []);

    return allValue;
};

export default useGetAllValue;