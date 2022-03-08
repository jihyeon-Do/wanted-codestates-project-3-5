import React, { useState, useEffect, useRef } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Skeleton from './Skeleton';
import PageNation from './PageNation';
import DetailView from './DetailView';
import theme from '../../styles/theme';
import { useSelector } from 'react-redux';

const Results = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [totalPage, setTotalPage] = useState('');

  const { productsData, regionsData } = useSelector(state => ({
    productsData: state.data.productsData,
    regionsData: state.data.regionsData,
  }));

  console.log('productsData', productsData);
  console.log('regionsData', regionsData);

  const getTotalPage = (productsData, regionsData) => {
    if (productsData?.length) {
      setTotalPage(Math.ceil(productsData.length / 15));
    }
    if (regionsData?.length) {
      setTotalPage(Math.ceil(regionsData.length / 15));
    }
  };

  const getDataFromApi = async (productsData, regionsData) => {
    if (productsData.length) {
      await setData(productsData);
    } else if (regionsData.length) {
      await setData(regionsData);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
      getTotalPage();
      getDataFromApi(productsData, regionsData);
    }, 2000);
  }, []);

  const setFlag = () => {
    setIsLoaded(false);
    setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
  };

  return (
    <ThemeProvider theme={theme}>
      <PageWrap>
        {regionsData.length && <DetailView />}
        <ItemContainer>
          {isLoaded ? (
            data
              .slice(0 + 15 * (currentPage - 1) + 1, 15 * currentPage + 1)
              .map((el, index) => {
                return (
                  <Item key={index}>
                    <ItemImg>
                      <a href={el.image_url} target='_blank'>
                        <span></span>
                        <img src={el.image_url} />
                      </a>
                    </ItemImg>
                    <DescBox>
                      <ItemName>{el.name}</ItemName>
                      <ItemPrice>{el.price}₩</ItemPrice>
                    </DescBox>
                  </Item>
                );
              })
          ) : (
            <Skeleton />
          )}
        </ItemContainer>
      </PageWrap>
      <PageNation
        totalPage={Number(totalPage)}
        page={page}
        setPage={setPage}
        setCurrentPage={setCurrentPage}
        setFlag={setFlag}
      />
    </ThemeProvider>
  );
};

console.log(theme.device.tablet);

const PageWrap = styled.div`
  display: flex;
  max-width: 1080px;
  min-width: 420px;
  margin: 0 auto;
`;

const ItemContainer = styled.div`
  max-width: 1080px;
  min-width: 420px;
  margin-right: auto;
  margin-left: auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 20px;
`;

const Item = styled.div`
  width: 200px;
  height: 400px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  background-color: #fff;
  overflow: hidden;
  border-radius: 6px;
`;

const ItemImg = styled.div`
  width: 100%;
  height: 310px;
  background-color: #eee;
  margin: 0;
  padding: 0;
  overflow: hidden;
  position: relative;

  img {
    width: 200px;
    max-width: 100%;
    height: 310px;
    object-fit: cover;
    transition: all 0.3s;
  }

  &:hover span {
    display: block;
    width: 100%;
    height: 100%;
    background-color: rgba(20, 20, 20, 0.3);
    transition: all 0.3s;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const DescBox = styled.div`
  width: 100%;
  height: 88px;
  position: relative;
`;

const ItemName = styled.div`
  color: #333;
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 14px;
`;

const ItemPrice = styled.div`
  color: var(--main-color);
  font-weight: bold;
  text-align: right;
  position: absolute;
  right: 20px;
  bottom: 20px;
`;

export default Results;
