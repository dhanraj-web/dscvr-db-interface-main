import Page from '../components/Page';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PageLoader, { ContaientLoader } from '../components/PageLoader';
import Pagination from '../components/Pagination';
import { getDateDiff } from '../ComoonFunctions/index';
import { Link } from 'react-router-dom';
import ApiConfig from '../Config/ApiConfig';
const Pool_explorer = () => {
  const [data, setData] = useState([]);

  const [isloading, setIsloading] = useState(true);
  const [filterList, setFilterList] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [dataListToDisplay, setDataListToDisplay] = useState([]);
  const [noOfPages, setnoOfPages] = useState(1);
  const [typeName, setTypeName] = useState('View all');
  const [isUpdating, setIsUpdating] = useState(false);
  const [isEth, setIsEth] = useState(false);
  const [ethPrice, setEthPrice] = useState(0);
  useEffect(() => {
    const web = new WebSocket('wss://ehtereum-developer-api.mobiloitte.com');

    try {
      web.onopen = () => {
        console.log('connect');
        const dataToSend = {
          option: 'AllSwapPairTransaction',
        };
        web.send(JSON.stringify(dataToSend));
        web.onmessage = async (event) => {
          console.log('event', event);
          if (event.data !== '[object Promise]' && event.data !== 'null') {
            let obj = JSON.parse(event.data);

            let localArr = data;
            obj.forEach((element) => {
              localArr.unshift(element);
            });

            localArr.sort(function (a, b) {
              return parseInt(b.timestamp) - parseInt(a.timestamp);
            });
            setData(localArr);
            setDataListToDisplay(localArr.slice(0, 50));
            setnoOfPages(Math.ceil(localArr.length / 50));

            setIsloading(false);
          }
        };
      };
    } catch (err) {
      console.log('err', err);
    }
    return () => {
      web.close();
    };
  }, []);

  useEffect(() => {
    getData();
  }, []);

  // useEffect(() => {
  //   if (window.sessionStorage.getItem('pool_explorer')) {
  //     setIsloading(false);
  //     setData(
  //       window.sessionStorage.getItem('pool_explorer')
  //         ? JSON.parse(window.sessionStorage.getItem('pool_explorer'))
  //         : []
  //     );
  //     setDataListToDisplay(
  //       window.sessionStorage.getItem('pool_explorer')
  //         ? JSON.parse(window.sessionStorage.getItem('pool_explorer')).slice(
  //             0,
  //             50
  //           )
  //         : []
  //     );

  //     setnoOfPages(
  //       parseInt(
  //         Math.ceil(window.sessionStorage.getItem('pool_explorer').length / 50)
  //       )
  //     );
  //   } else {
  //     setIsloading(true);
  //   }
  //   getData();
  // }, []);

  const getData = async () => {
    try {
      const res = await axios.get(ApiConfig.getLiveETHPrice);
      if (res.data.responseCode !== 200) {
        setData([]);
      } else {
        console.log(
          'getData',
          parseFloat(res.data.responseResult.data.bundle.ethPrice)
        );
        setEthPrice(parseFloat(res.data.responseResult.data.bundle.ethPrice));
      }
    } catch (err) {
      console.log('ERROR', err);
    }
  };

  const tokenSearchHandler = (name) => {
    setSearchText(name);
    let dataList = data;
    if (name.length >= 2) {
      setIsFilter(true);
      let res = dataList.filter((list, i) => {
        if (list.burns.length > 0) {
          return (
            list.burns[0][0].pair.token0.symbol
              .toLowerCase()
              .substr(0, name.length) === name.toLowerCase()
          );
        } else {
          return (
            list.mints[0][0].pair.token0.symbol
              .toLowerCase()
              .substr(0, name.length) === name.toLowerCase()
          );
        }
      });

      setDataListToDisplay(res.slice(0, 50));
      setnoOfPages(Math.ceil(res.length / 50));
      setFilterList(res);
    } else {
      setDataListToDisplay(data.slice(0, 50));
      setnoOfPages(Math.ceil(data.length / 50));
      setIsFilter(false);
      // setFilterList([]);
    }
  };

  const typeSearchHandler = (name) => {
    setIsUpdating(true);
    let dataList = data;
    if (name !== 'View all') {
      setIsFilter(true);
      let res = dataList.filter((list, i) => {
        if (name === 'Add') {
          return list.mints.length > 0;
        } else if (name === 'Remove') {
          return list.burns.length > 0;
        } else if (name === 'New') {
          return list.burns.length > 0;
        }
      });
      setDataListToDisplay(res.slice(0, 50));
      setnoOfPages(Math.ceil(res.length / 50));
      setFilterList(res);
    } else {
      setDataListToDisplay(data.slice(0, 50));
      setnoOfPages(Math.ceil(data.length / 50));
      setIsFilter(false);
      // setFilterList([]);
    }
    setTimeout(function () {
      setIsUpdating(false);
    }, 500);
  };

  const pageWiseDate = (lower, higher) => {
    if (isFilter) {
      let items = filterList.slice(lower, higher);
      setDataListToDisplay(items);
    } else {
      let items = data.slice(lower, higher);
      setDataListToDisplay(items);
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
                  ></i>{' '}
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
              </marquee>
            </div>
            <div className="col-md-12 col-lg-2 p-0">
              <img src="images/image.png" alt="" /> <b>GLQ</b>{' '}
              <button> UNC Presale</button>
            </div>
          </div>

          <div className="right-main2">
            <div className="page-heding mb-5">
              <div className="page-heding-left ">
                <span>V0.1.3 UNISWAP POOL TOOLS </span>
                <h1>Pool Explorer </h1>
                <span>
                  Search for new pools, add or remove liquidity in a pair.{' '}
                </span>
              </div>
              <div className="page-heding-right text-right row">
                <div className="col-md-4">
                  {' '}
                  <select
                    className="form-control"
                    value={typeName}
                    onChange={(e) => {
                      setTypeName(e.target.value);
                      typeSearchHandler(e.target.value);
                    }}
                  >
                    <option value={'View all'}>View all</option>
                    <option value={'Remove'}> Remove</option>
                    <option value={'Add'}>Add</option>
                    <option value={'New'}>New</option>
                  </select>
                </div>
                <div className="col-md-8">
                  {' '}
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Filter by token"
                    value={searchText}
                    onChange={(e) => tokenSearchHandler(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <section className=" mt-5 ">
              <table className="table mb-0" style={{ borderRadius: 0 }}>
                <tr className=" text-left">
                  <td colSpan="10 p-4">
                    Pools activity (last 1 hour(s)){' '}
                    {/* <span className="pl-4" style={{ color: '#00c988' }}>
                      View last 2h - View last 4h
                    </span>{' '} */}
                  </td>
                </tr>
              </table>

              <div className="table-responsive pool-table">
                <table className="table mb-0">
                  <thead>
                    <tr>
                      <th>Token</th>
                      <th>Time</th>
                      <th>Actions</th>
                      <th>Type </th>
                      <th className="page-item">
                        Token Price ({' '}
                        <a
                          href="javascript:void(0)"
                          onClick={() => setIsEth(!isEth)}
                        >
                          <span style={{ color: '#00c988' }}>
                            {isEth ? 'ETH' : 'USD'}{' '}
                          </span>
                        </a>
                        )
                      </th>
                      <th>Total Value</th>
                      <th>Token Amount</th>
                      <th>ETH Amount</th>
                      {/* <th>Pool Variation</th> */}
                      <th>Pool Remaining</th>
                      <th>Pair created</th>
                    </tr>
                  </thead>
                  {isUpdating ? (
                    <tbody>
                      <tr id="dd">
                        <td colSpan="11">
                          <ContaientLoader />
                        </td>
                      </tr>
                    </tbody>
                  ) : (
                    <tbody>
                      {dataListToDisplay &&
                        dataListToDisplay.length > 0 &&
                        dataListToDisplay.map((listData, i) => {
                          return (
                            <tr
                              className={(i + 1) % 2 === 0 ? '' : 'secend-tr'}
                              key={i}
                            >
                              <td>
                                <a
                                  href={`https://etherscan.io/address/${
                                    listData.burns.length > 0
                                      ? listData.burns[0][0].pair.id
                                      : listData.mints[0][0].pair.id
                                  }`}
                                  target="_blank"
                                  rel="noreferrer"
                                  style={{ color: '#369d0e' }}
                                >
                                  {listData.burns.length > 0
                                    ? listData.burns[0][0].pair.token0.symbol
                                    : listData.mints[0][0].pair.token0.symbol}
                                </a>
                              </td>
                              <td>
                                {getDateDiff(
                                  new Date(listData.timestamp * 1000),
                                  new Date()
                                )}
                              </td>
                              <td className="">
                                <a
                                  href={`https://etherscan.io/tx/${listData.transactionId}`}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <img src="images/icon-4.png" alt="" />{' '}
                                </a>
                                <Link
                                  to={{
                                    pathname: '/pair-explorer',
                                    search: `?${
                                      listData.burns.length > 0
                                        ? listData.burns[0][0].pair.id
                                        : listData.mints[0][0].pair.id
                                    }`,
                                  }}
                                >
                                  <img src="images/icon.png" alt="" />
                                </Link>
                              </td>
                              <td>
                                <label
                                  className={
                                    listData.burns.length > 0 ? 'remove' : 'add'
                                  }
                                >
                                  {listData.burns.length > 0 ? 'Remove' : 'ADD'}{' '}
                                </label>
                              </td>
                              <td>
                                {isEth ? (
                                  <span>
                                    $
                                    {parseFloat(
                                      listData.burns.length > 0
                                        ? listData.burns[0][0].pair.token0
                                            .derivedETH * ethPrice
                                        : listData.mints[0][0].pair.token0
                                            .derivedETH * ethPrice
                                    ).toFixed(2)}{' '}
                                  </span>
                                ) : (
                                  <span>
                                    {parseFloat(
                                      listData.burns.length > 0
                                        ? listData.burns[0][0].pair.token0
                                            .derivedETH
                                        : listData.mints[0][0].pair.token0
                                            .derivedETH
                                    ).toFixed(6)}{' '}
                                    ETH
                                  </span>
                                )}
                              </td>
                              <td>
                                $
                                {parseFloat(
                                  listData.burns.length > 0
                                    ? listData.burns[0][0].amountUSD
                                    : listData.mints[0][0].amountUSD
                                ).toFixed(2)}
                              </td>
                              <td>
                                {parseFloat(
                                  listData.burns.length > 0
                                    ? listData.burns[0][0].amount0
                                    : listData.mints[0][0].amount0
                                ).toFixed(2)}{' '}
                                {listData.burns.length > 0
                                  ? listData.burns[0][0].pair.token0.symbol
                                  : listData.mints[0][0].pair.token0.symbol}
                              </td>
                              <td>
                                {parseFloat(
                                  listData.burns.length > 0
                                    ? listData.burns[0][0].amount1
                                    : listData.mints[0][0].amount1
                                ).toFixed(2)}{' '}
                                ETH
                              </td>
                              {/* <td>
                              <label className="add">22.2%</label>
                            </td> */}
                              <td>
                                {parseFloat(
                                  listData.burns.length > 0
                                    ? listData.burns[0][0].pair.reserve1
                                    : listData.mints[0][0].pair.reserve1
                                ).toFixed(2)}{' '}
                                ETH{' '}
                              </td>
                              <td>
                                {listData.burns.length > 0
                                  ? getDateDiff(
                                      new Date(
                                        listData.burns[0][0].pair
                                          .createdAtTimestamp * 1000
                                      ),
                                      new Date()
                                    )
                                  : getDateDiff(
                                      new Date(
                                        listData.mints[0][0].pair
                                          .createdAtTimestamp * 1000
                                      ),
                                      new Date()
                                    )}
                              </td>
                            </tr>
                          );
                        })}

                      {/* {filterList &&
                        isFilter &&
                        filterList.length > 0 &&
                        filterList.map((listData, i) => {
                          return (
                            <tr
                              className={(i + 1) % 2 === 0 ? '' : 'secend-tr'}
                              key={i}
                            >
                              <td>
                                <a
                                  href={`https://etherscan.io/address/${
                                    listData.burns.length > 0
                                      ? listData.burns[0][0].pair.id
                                      : listData.mints[0][0].pair.id
                                  }`}
                                  target="_blank"
                                  rel="noreferrer"
                                  style={{ color: '#369d0e' }}
                                >
                                  {listData.burns.length > 0
                                    ? listData.burns[0][0].pair.token0.symbol
                                    : listData.mints[0][0].pair.token0.symbol}
                                </a>
                              </td>
                              <td>
                                {getDateDiff(
                                  new Date(listData.timestamp * 1000),
                                  new Date()
                                )}
                              </td>
                              <td className="">
                                <a
                                  href={`https://etherscan.io/tx/${listData.transactionId}`}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <img src="images/icon-4.png" alt="" />{' '}
                                </a>
                                <Link
                                  to={{
                                    pathname: '/pair-explorer',
                                    search: `?${
                                      listData.burns.length > 0
                                        ? listData.burns[0][0].pair.id
                                        : listData.mints[0][0].pair.id
                                    }`,
                                  }}
                                >
                                  <img src="images/icon.png" alt="" />
                                </Link>
                              </td>
                              <td>
                                <label
                                  className={
                                    listData.burns.length > 0 ? 'remove' : 'add'
                                  }
                                >
                                  {listData.burns.length > 0 ? 'Remove' : 'ADD'}{' '}
                                </label>
                              </td>
                              <td>
                                {isEth ? (
                                  <span>
                                    $
                                    {parseFloat(
                                      listData.burns.length > 0
                                        ? listData.burns[0][0].pair.token0
                                            .derivedETH * 2554
                                        : listData.mints[0][0].pair.token0
                                            .derivedETH * 2554
                                    ).toFixed(2)}{' '}
                                  </span>
                                ) : (
                                  <span>
                                    {parseFloat(
                                      listData.burns.length > 0
                                        ? listData.burns[0][0].pair.token0
                                            .derivedETH
                                        : listData.mints[0][0].pair.token0
                                            .derivedETH
                                    ).toFixed(6)}{' '}
                                    ETH
                                  </span>
                                )}
                              </td>
                              <td>
                                $
                                {parseFloat(
                                  listData.burns.length > 0
                                    ? listData.burns[0][0].amountUSD
                                    : listData.mints[0][0].amountUSD
                                ).toFixed(2)}
                              </td>
                              <td>
                                {parseFloat(
                                  listData.burns.length > 0
                                    ? listData.burns[0][0].amount0
                                    : listData.mints[0][0].amount0
                                ).toFixed(2)}{' '}
                                {listData.burns.length > 0
                                  ? listData.burns[0][0].pair.token0.symbol
                                  : listData.mints[0][0].pair.token0.symbol}
                              </td>
                              <td>
                                {parseFloat(
                                  listData.burns.length > 0
                                    ? listData.burns[0][0].amount1
                                    : listData.mints[0][0].amount1
                                ).toFixed(2)}{' '}
                                ETH
                              </td>
                              <td>
                                {parseFloat(
                                  listData.burns.length > 0
                                    ? listData.burns[0][0].pair.reserve1
                                    : listData.mints[0][0].pair.reserve1
                                ).toFixed(2)}{' '}
                                ETH{' '}
                              </td>
                              <td>
                                {listData.burns.length > 0
                                  ? getDateDiff(
                                      new Date(
                                        listData.burns[0][0].pair
                                          .createdAtTimestamp * 1000
                                      ),
                                      new Date()
                                    )
                                  : getDateDiff(
                                      new Date(
                                        listData.mints[0][0].pair
                                          .createdAtTimestamp * 1000
                                      ),
                                      new Date()
                                    )}
                              </td>
                            </tr>
                          );
                        })} */}
                    </tbody>
                  )}
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

export default Pool_explorer;
