import React from "react";

const CurrencyOptions = ({ currencyOptions, prop, updateHandler }) => {
  const Options = currencyOptions.map((data, index) => {
    return (
      <option key={index} value={data}>
        {data}
      </option>
    );
  });
  return (
    <>
      <div className="selectOptions mt-3">
        <select
          className="form-select border-0 rounded-0"
          onChange={updateHandler}
        >
          {Options}
        </select>
      </div>
    </>
  );
};

export default CurrencyOptions;

// {
//   prop==='from currency'?
//   <div className='selectOptions mt-3'>
//     <select className='form-select border-0 rounded-0' onChange={updateHandler}>
//       {Options}
//     </select>
// </div>:
// prop==='to currency'?
// <div className='selectOptions mt-3'>
//     <select className='form-select border-0 rounded-0' onChange={updateHandler}>
//       {Options}
//     </select>
// </div>:null
// }

/* useEffect(() => {
    axios
      .get(
        `https://free.currconv.com/api/v7/convert?q=${signvalue}_${signvalue1}&compact=ultra&apiKey=7255b06c118ad064521a`
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); */
