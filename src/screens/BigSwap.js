import Page from '../components/Page';
import React, { useState, useEffect } from 'react';

import PageLoader from '../components/PageLoader';
import moment from 'moment';
import Pagination from '../components/Pagination';
import { Link } from 'react-router-dom';

const Big_swap = () => {
  const [data, setData] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const [dataListToDisplay, setDataListToDisplay] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filterList, setFilterList] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const [noOfPages, setnoOfPages] = useState(1);
  const [searchAmount, setSearchAmount] = useState('');

  useEffect(() => {
    const web = new WebSocket('wss://ehtereum-developer-api.mobiloitte.com');

    try {
      web.onopen = () => {
        console.log('connect');
        const dataToSend = {
          option: 'AllBiggestSwapPair',
        };
        web.send(JSON.stringify(dataToSend));
        web.onmessage = async (event) => {
          console.log('event', event);
          if (event.data !== '[object Promise]' && event.data !== 'null') {
            let obj = JSON.parse(event.data);
            console.log('objobjobjobjobjobj', obj);

            let localArr = data;
            obj.forEach((element) => {
              localArr.unshift(element);
            });
            setData(localArr);
            setDataListToDisplay(obj.slice(0, 50));
            setnoOfPages(Math.ceil(localArr.length / 50));

            setIsloading(false);
          }
        };
      };
      return () => {
        web.close();
      };
    } catch (err) {
      console.log('err', err);
    }
  }, []);

  // useEffect(() => {
  //   if (localStorage.getItem('big_swap')) {
  //     setData(
  //       localStorage.getItem('big_swap')
  //         ? JSON.parse(localStorage.getItem('big_swap'))
  //         : []
  //     );
  //     setDataListToDisplay(
  //       localStorage.getItem('big_swap')
  //         ? JSON.parse(localStorage.getItem('big_swap')).slice(0, 50)
  //         : []
  //     );
  //     setnoOfPages(Math.ceil(localStorage.getItem('big_swap').length / 50));
  //     setIsloading(false);
  //   } else {
  //     setIsloading(true);
  //   }
  //   getData();
  // }, []);

  // const getData = async () => {
  //   try {
  //     const res = await axios.get(ApiConfig.getBiggestSwapDetails, {});

  //     if (res.data.responseCode !== 200) {
  //       setData([]);
  //     } else {
  //       setDataListToDisplay(res.data.responseResult.slice(0, 50));

  //       setData(res.data.responseResult);

  //       setnoOfPages(Math.ceil(res.data.responseResult.length / 50));

  //       localStorage.removeItem('big_swap');

  //       localStorage.setItem(
  //         'big_swap',
  //         JSON.stringify(res.data.responseResult.slice(0, 500))
  //       );
  //     }
  //     setIsloading(false);
  //   } catch (err) {
  //     console.log('ERROR', err);
  //     setIsloading(false);
  //   }
  // };

  const pageWiseDate = (lower, higher) => {
    if (isFilter) {
      let items = filterList.slice(lower, higher);
      setDataListToDisplay(items);
    } else {
      let items = data.slice(lower, higher);
      setDataListToDisplay(items);
    }
  };

  const tokenSearchHandler = (name) => {
    setSearchText(name);
    let dataList = data;
    if (name.length >= 2) {
      setIsFilter(true);
      let res = dataList.filter((list, i) => {
        return (
          list.pair.token0.symbol.toLowerCase().substr(0, name.length) ===
          name.toLowerCase()
        );
      });
      setDataListToDisplay(res.slice(0, 50));
      setnoOfPages(Math.ceil(res.length / 50));
      setFilterList(res);
    } else {
      setDataListToDisplay(data.slice(0, 50));
      setnoOfPages(Math.ceil(data.length / 50));
      setIsFilter(false);
    }
  };

  const amountSearchHandler = (amount) => {
    setSearchAmount(amount);

    if (amount.length > 1) {
      let name = parseFloat(amount);
      let dataList = data;
      setIsFilter(true);
      let res = dataList.filter((list, i) => {
        return parseFloat(list.amountUSD) > name;
      });
      setDataListToDisplay(res.slice(0, 50));
      setnoOfPages(Math.ceil(res.length / 50));
      setFilterList(res);
    } else {
      setDataListToDisplay(data.slice(0, 50));
      setnoOfPages(Math.ceil(data.length / 50));
      setIsFilter(false);
    }
  };

  return (
    <Page title="DSCVR">
      {isloading ? (
        <PageLoader />
      ) : (
        <>
          <div className="row top-div">
            <div className="col-md-12 col-lg-3 pr-0">
              {' '}
              <label>ETH : $1794.24</label>{' '}
              <label>
                <i className="fa fa-tachometer" aria-hidden="true"></i> 128 GWEI
              </label>
              <label>
                HOT PAIRS <i className="fa fa-fire" aria-hidden="true"></i>{' '}
              </label>
            </div>
            <div className="col-md-12 col-lg-7">
              <marquee>
                {' '}
                <label>
                  #1{' '}
                  <i
                    className="fa fa-angle-double-up"
                    aria-hidden="true"
                    style={{ color: 'green' }}
                  ></i>
                  ODDZ{' '}
                </label>{' '}
                <label>
                  #2{' '}
                  <i
                    className="fa fa-angle-double-up"
                    aria-hidden="true"
                    style={{ color: 'red' }}
                  ></i>{' '}
                  ODDZ{' '}
                </label>
                <label>
                  #1{' '}
                  <i
                    className="fa fa-angle-double-up"
                    aria-hidden="true"
                    style={{ color: 'green' }}
                  ></i>{' '}
                  ODDZ
                </label>{' '}
                <label>
                  #2{' '}
                  <i
                    className="fa fa-angle-double-up"
                    aria-hidden="true"
                    style={{ color: 'red' }}
                  ></i>
                  ODDZ{' '}
                </label>
                <label>
                  #1{' '}
                  <i
                    className="fa fa-angle-double-up"
                    aria-hidden="true"
                    style={{ color: 'green' }}
                  ></i>{' '}
                  ODDZ
                </label>{' '}
                <label>
                  #2{' '}
                  <i
                    className="fa fa-angle-double-up"
                    aria-hidden="true"
                    style={{ color: 'red' }}
                  ></i>
                  ODDZ{' '}
                </label>
                <label>
                  #1{' '}
                  <i
                    className="fa fa-angle-double-up"
                    aria-hidden="true"
                    style={{ color: 'green' }}
                  ></i>{' '}
                  ODDZ
                </label>{' '}
                <label>
                  #2{' '}
                  <i
                    className="fa fa-angle-double-up"
                    aria-hidden="true"
                    style={{ color: 'red' }}
                  ></i>
                  ODDZ{' '}
                </label>
              </marquee>
            </div>
            <div className="col-md-12 col-lg-2 p-0">
              <img src="images/image.png" alt="" /> <b>GLQ</b>{' '}
              <button> UNC Presale</button>
            </div>
          </div>
          <div class="right-main2">
            <div className="page-heding mb-5">
              <div className="page-heding-left ">
                <span>V0.1.3 UNISWAP POOL TOOLS </span>
                <h1>Big Swap Explorer </h1>
                <span>
                  Search for new pools, add or remove liquidity in a pair.{' '}
                </span>
              </div>
              <div className="page-heding-right page-heding-right2 text-right row">
                <div className="col-md-4 col-lg-4 pr-0">
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Filter by token"
                    value={searchText}
                    onChange={(e) => tokenSearchHandler(e.target.value)}
                  />
                </div>
                <div className="col-md-5 col-lg-6 pr-0">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="1000"
                    value={searchAmount}
                    onChange={(e) => amountSearchHandler(e.target.value)}
                  />
                </div>
                <div className="col-md-3 col-lg-2  text-left ">
                  <button className="btn btn-filter">Filter</button>
                </div>
              </div>
            </div>
            <section className=" mt-5 ">
              <table className="table mb-0" style={{ borderRadius: 0 }}>
                <tr className=" text-left">
                  <td colSpan="10 p-4">
                    Latest big swaps
                    {/* (displaying higher than 10,000USD){' '} */}
                  </td>
                </tr>
              </table>

              <div className="table-responsive pool-table">
                <table className="table mb-0">
                  <tbody>
                    <tr>
                      <th>Token</th>
                      <th>Time</th>
                      <th>Type </th>
                      <th>Quantity </th>
                      <th>Total ETH</th>
                      <th>Total USD</th>
                      {/* <th>Change</th> */}
                      <th>Others </th>
                    </tr>
                    {dataListToDisplay &&
                      dataListToDisplay.length >= 0 &&
                      dataListToDisplay.map((listData, i) => {
                        return (
                          <tr
                            className={(i + 1) % 2 === 0 ? '' : 'secend-tr'}
                            key={i}
                          >
                            <td>
                              <Link
                                style={{ textDecoration: 'none' }}
                                to={{
                                  pathname: '/pair-explorer',
                                  search: `?${listData.pair.id}`,
                                }}
                              >
                                <span style={{ color: '#369d0e' }}>
                                  {' '}
                                  {listData.pair.token0.symbol}
                                </span>
                              </Link>
                            </td>
                            <td>
                              {moment(listData.createdAt).format(
                                'YYYY-MM-D  mm:hh:ss'
                              )}{' '}
                            </td>
                            <td
                              className={
                                listData.amount0In !== 0 &&
                                listData.amount1Out !== 0
                                  ? 'green-text'
                                  : listData.amount0Out !== 0 &&
                                    listData.amount1In !== 0
                                  ? 'red-text'
                                  : ''
                              }
                            >
                              {listData.amount0In !== 0 &&
                              listData.amount1Out !== 0
                                ? 'Sell'
                                : listData.amount0Out !== 0 &&
                                  listData.amount1In !== 0
                                ? 'Buy'
                                : ''}
                            </td>
                            <td>
                              {parseFloat(
                                listData.amount0In !== 0 &&
                                  listData.amount1Out !== 0
                                  ? listData.amount0In
                                  : listData.amount0Out !== 0 &&
                                    listData.amount1In !== 0
                                  ? listData.amount0Out
                                  : 0
                              ).toFixed(2)}{' '}
                            </td>
                            <td>
                              {parseFloat(
                                listData.amount0In !== 0 &&
                                  listData.amount1Out !== 0
                                  ? listData.amount1Out
                                  : listData.amount0Out !== 0 &&
                                    listData.amount1In !== 0
                                  ? listData.amount1In
                                  : 0
                              ).toFixed(2)}
                            </td>
                            <td>
                              ${parseFloat(listData.amountUSD).toFixed(2)}
                            </td>
                            {/* <td>
                            <label className="add">0.77%</label>
                          </td> */}
                            <td className="">
                              <a
                                href={`https://etherscan.io/tx/${listData.transaction.id}`}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <img src="images/icon-4.png" alt="" />{' '}
                              </a>
                              {/* <img src="images/icon.png" alt="" /> */}
                            </td>
                          </tr>
                        );
                      })}

                    {/* {filterList &&
                      isFilter &&
                      filterList.length >= 0 &&
                      filterList.map((listData, i) => {
                        return (
                          <tr
                            className={(i + 1) % 2 === 0 ? '' : 'secend-tr'}
                            key={i}
                          >
                            <td>
                              <Link
                                to={{
                                  pathname: '/pair-explorer',
                                  search: `?${listData.pair.id}`,
                                }}
                              >
                                <span style={{ color: '#369d0e' }}>
                                  {' '}
                                  {listData.pair.token0.symbol}
                                </span>
                              </Link>
                            </td>
                            <td>
                              {moment(listData.createdAt).format(
                                'YYYY-MM-D  mm:hh:ss'
                              )}{' '}
                            </td>
                            <td
                              className={
                                listData.amount0In !== 0 &&
                                listData.amount1Out !== 0
                                  ? 'green-text'
                                  : listData.amount0Out !== 0 &&
                                    listData.amount1In !== 0
                                  ? 'red-text'
                                  : ''
                              }
                            >
                              {listData.amount0In !== 0 &&
                              listData.amount1Out !== 0
                                ? 'Sell'
                                : listData.amount0Out !== 0 &&
                                  listData.amount1In !== 0
                                ? 'Buy'
                                : ''}
                            </td>
                            <td>
                              {parseFloat(
                                listData.amount0In !== 0 &&
                                  listData.amount1Out !== 0
                                  ? listData.amount0In
                                  : listData.amount0Out !== 0 &&
                                    listData.amount1In !== 0
                                  ? listData.amount0Out
                                  : 0
                              ).toFixed(2)}{' '}
                            </td>
                            <td>
                              {parseFloat(
                                listData.amount0In !== 0 &&
                                  listData.amount1Out !== 0
                                  ? listData.amount1Out
                                  : listData.amount0Out !== 0 &&
                                    listData.amount1In !== 0
                                  ? listData.amount1In
                                  : 0
                              ).toFixed(2)}
                            </td>
                            <td>
                              ${parseFloat(listData.amountUSD).toFixed(2)}
                            </td>

                            <td className="">
                              <a
                                href={`https://etherscan.io/tx/${listData.transaction.id}`}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <img src="images/icon-4.png" alt="" />{' '}
                              </a>
                            </td>
                          </tr>
                        );
                      })} */}
                  </tbody>
                </table>
              </div>
              <table className="table mb-0" style={{ borderRadius: 0 }}>
                <tr className=" text-right">
                  <td colSpan="10 p-4">
                    <nav aria-label="Page navigation example">
                      <Pagination
                        noOfPages={noOfPages}
                        pageWiseDate={(lower, upper) =>
                          pageWiseDate(lower, upper)
                        }
                      />
                    </nav>
                  </td>
                </tr>
              </table>
            </section>
          </div>
        </>
      )}
    </Page>
  );
};

export default Big_swap;
