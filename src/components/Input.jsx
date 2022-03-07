import React, { useState, useEffect } from 'react';
import { getProducts, getRegions } from '../axios/axios';
import { searchKeyword } from '../utils/searchKeyword';
const Input = () => {
  const [apiProductData, setApiProductData] = useState([]);
  const [apiRegionsData, setApiRegionsData] = useState([]);

  useEffect(async () => {
    const products = await getProducts();
    const regions = await getRegions();
    setApiProductData(products);
    setApiRegionsData(regions);
  }, []);

  function checkUrlForm(strUrl) {
    /* eslint-disable */
    let regex = new RegExp(
      /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
    );
    return regex.test(strUrl);
  }

  const keyup = ({ code, target }) => {
    if (code === 'Enter') {
      //Todo : 2page와 3page간 enter 입력시 page이동 유무 차이
      const text = target.value;

      // urlText or contentText
      if (checkUrlForm(text)) {
        console.log('url 실행');
      } else {
        const filterArr = apiProductData.filter(({ name, category_names }) => {
          let isExist = false;
          if (name.includes(text)) {
            isExist = true;
          } else if (searchKeyword[text]) {
            category_names.map(category => {
              searchKeyword[text].map(val => {
                if (category.includes(val)) isExist = true;
              });
            });
          }
          return isExist;
        });
        console.log(filterArr);
      }
    }
  };

  useEffect(() => {
    console.log(apiProductData);
  }, [apiProductData]);

  useEffect(() => {
    console.log(apiRegionsData);
  }, [apiRegionsData]);

  return (
    <>
      <input type="text" onKeyUp={keyup} />
    </>
  );
};

export default Input;
