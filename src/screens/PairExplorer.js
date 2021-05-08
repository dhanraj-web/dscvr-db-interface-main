import Page from '../components/Page';
import { useEffect, useState } from 'react';
import moment from 'moment';
import Pagination from '../components/Pagination';
import Search from '../components/Search';
import { useLocation } from 'react-router';
import PageLoader from '../components/PageLoader';
import axios from 'axios';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { gql } from '@apollo/client';
import Header from '../components/Header';
import GraphComponent from '../components/GraphComponent';
import ApiConfig from '../Config/ApiConfig';

const Pair_explorer = () => {
  const location = useLocation();
  const [dataListToDisplay, setDataListToDisplay] = useState([]);
  const [noOfPages, setnoOfPages] = useState(1);
  const [isloading, setIsloading] = useState(true);
  const [socketData, setSocketData] = useState([]);
  const [advanceDetails, setAdvanceDetails] = useState();
  const [ethPrice, setEthPrice] = useState(0);
  const [marketCapDetails, setMarketCapDetails] = useState();
  const getDataFromQL = (pairID) => {
    setIsloading(true);
    console.log('pairID', pairID);
    const client = new ApolloClient({
      uri: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',
      cache: new InMemoryCache(),
    });

    client
      .query({
        query: gql`
          {
            swaps(
              first: 100
              where: { pair: "${pairID}" }
              orderBy: timestamp
              orderDirection: desc
            ) {
              transaction {
                id
                timestamp
              }
              id
              pair {
                id
                token0 {
                  id
                  symbol
                  derivedETH
                  totalLiquidity
                }
                token1 {
                  id
                  symbol
                  derivedETH
                  totalLiquidity
                }
                reserve0
                reserve1
                reserveUSD
                token0Price
                token1Price
                txCount
                createdAtTimestamp
              }
              amount0In
              amount0Out
              amount1In
              amount1Out
              amountUSD
              sender
              to
            }
          }
        `,
      })
      .then((result) => {
        console.log(result);
        let obj = result.data.swaps;
        let localArr = socketData;
        obj.forEach((element) => {
          localArr.unshift(element);
        });
        setSocketData(localArr);
        console.log('obj', obj);
        setnoOfPages(Math.ceil(obj.length / 50));

        setDataListToDisplay(obj.slice(0, 50));

        setIsloading(false);
        getMarketCap();
      });
  };

  useEffect(() => {
    // getData();
    window.$('#moreInfo').modal('hide');
    const web = new WebSocket('wss://ehtereum-developer-api.mobiloitte.com');
    if (location.search !== '') {
      getDataFromQL(location.search.substring(1, location.search.length));
      // getSocketData(location.search.substring(1, location.search.length), web);
      // getAllBasicAndAdvance(
      //   location.search.substring(1, location.search.length),
      //   web
      // );
    } else {
      getDataFromQL('0x0d2fa41cd79ac8a18917d71a2fc8076b0d2c7ada');
      // getSocketData('0x0d2fa41cd79ac8a18917d71a2fc8076b0d2c7ada', web);
      // getAllBasicAndAdvance('0x0d2fa41cd79ac8a18917d71a2fc8076b0d2c7ada', web);
    }
    return () => {
      web.close();
    };
  }, [location]);

  // useEffect(() => {
  //   // getData();
  //   const web = new WebSocket('wss://ehtereum-developer-api.mobiloitte.com');
  //   if (location.search !== '') {
  //     // getSocketData(location.search.substring(1, location.search.length), web);
  //     getAllBasicAndAdvance(
  //       location.search.substring(1, location.search.length),
  //       web
  //     );
  //   } else {
  //     // getSocketData('0x0d2fa41cd79ac8a18917d71a2fc8076b0d2c7ada', web);
  //     getAllBasicAndAdvance('0x0d2fa41cd79ac8a18917d71a2fc8076b0d2c7ada', web);
  //   }
  //   return () => {
  //     web.close();
  //   };
  // }, [location]);

  const getSocketData = (pairId, web) => {
    if (pairId !== '') {
      try {
        setIsloading(true);

        web.onopen = () => {
          console.log('connect');
          const dataToSend = {
            option: 'AllSwapPairById',
            pairId: pairId,
          };
          web.send(JSON.stringify(dataToSend));
          web.onmessage = (event) => {
            if (event.data != '[object Promise]' && event.data != 'null') {
              let objMian = JSON.parse(event.data);
              let obj = objMian.swapPairDetails;
              let localArr = socketData;
              obj.forEach((element) => {
                localArr.unshift(element);
              });
              setSocketData(localArr);
              console.log('obj', obj);
              setnoOfPages(Math.ceil(obj.length / 50));

              setDataListToDisplay(obj.slice(0, 50));

              setIsloading(false);
            }
          };
        };
      } catch (err) {
        console.log('err', err);
      }
    }
  };

  const viewInfoModal = () => {
    window.$('#moreInfo').modal('show');
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    // setIsloading(true);
    try {
      const res = await axios.get(ApiConfig.getLiveETHPrice);
      if (res.data.responseCode !== 200) {
        setEthPrice(0);
      } else {
        setEthPrice(parseFloat(res.data.responseResult.data.bundle.ethPrice));
        // setIsloading(false);
      }
    } catch (err) {
      console.log('ERROR', err);
    }
  };

  const getMarketCap = async () => {
    try {
      const res = await axios.get(
        `${ApiConfig.getMarketCapSymbol}/${
          socketData.length > 0 && socketData[0].pair.token0.symbol
        }`
      );
      if (res.data.responseCode !== 200) {
        setEthPrice(0);
      } else {
        setMarketCapDetails(
          res.data.responseResult.data[socketData[0].pair.token0.symbol]
        );
      }
    } catch (err) {
      console.log('ERROR', err);
    }
  };

  const getAllBasicAndAdvance = (pairId, web) => {
    if (pairId !== '') {
      try {
        setIsloading(true);

        web.onopen = () => {
          console.log('connect');
          const dataToSend = {
            option: 'AllBasicAndAdvanceById',
            pairId: pairId,
          };
          web.send(JSON.stringify(dataToSend));
          web.onmessage = (event) => {
            if (event.data != '[object Promise]' && event.data != 'null') {
              setAdvanceDetails([]);
              let obj = JSON.parse(event.data);
              // setIsloading(false);
              setAdvanceDetails(obj);
            }
          };
        };
      } catch (err) {
        console.log('err', err);
      }
    }
  };

  const pageWiseDate = (lower, higher) => {
    var items = socketData.slice(lower, higher);
    setDataListToDisplay(items);
  };

  return (
    <Page title="DSCVR">
      {isloading ? (
        <PageLoader />
      ) : (
        <>
          <Header />
          <div class="right-main2">
            <div className="page-heding mb-5">
              <div className="page-heding-left ">
                <span>V0.1.3 UNISWAP POOL TOOLS </span>
                <h6 className="whet mt-3">
                  <img src="images/image.png" alt="" />{' '}
                  {socketData.length > 0 &&
                    `${socketData[0].pair.token0.symbol}/${socketData[0].pair.token1.symbol}`}
                </h6>
              </div>
              <div className="page-heding-right text-right row">
                <div className="col-md-4">{/* <Search />{' '} */}</div>
                <div className="col-md-8">
                  {/* <input
                type="search"
                className="form-control"
                placeholder="Filter by token"
                value={searchText}
                onClick={(e) => tokenSearchHandler(e.target.value)}
              /> */}
                  <Search />{' '}
                </div>
              </div>
            </div>
            <section className=" mt-5 ">
              <div className="pair-map mb-5" style={{ height: 500 }}>
                {socketData.length > 0 && (
                  <GraphComponent
                    pair={`${socketData[0].pair.token0.symbol}-${socketData[0].pair.token1.symbol}`}
                  />
                )}
              </div>
              <div className="row mb-5">
                <div className="col-md-12 col-lg-4 mb-3">
                  <div className="box p-0">
                    <div className="boc-in">
                      <div>
                        <button className="btn btn-share">
                          <i className="fa fa-share-alt" aria-hidden="true"></i>
                        </button>
                        <button className="btn btn-share">
                          <i className="fa fa-star-o" aria-hidden="true"></i>
                        </button>
                        <button className="btn btn-trade">Trade</button>
                      </div>
                      <div>
                        <h5>
                          <i className="fa fa-arrow-up" aria-hidden="true"></i>{' '}
                          <span>
                            $
                            {socketData.length > 0 &&
                              parseFloat(
                                socketData[0].pair.token0.derivedETH * ethPrice
                              ).toFixed(5)}{' '}
                          </span>
                        </h5>
                        <p>
                          <span
                            style={
                              marketCapDetails &&
                              parseFloat(
                                marketCapDetails.quote.USD.percent_change_24h
                              ).toFixed(2) > 0
                                ? { color: 'green' }
                                : { color: 'red' }
                            }
                          >
                            (24h:{' '}
                            {marketCapDetails &&
                              parseFloat(
                                marketCapDetails.quote.USD.percent_change_24h
                              ).toFixed(2)}
                            )
                          </span>{' '}
                          {parseFloat(
                            socketData.length > 0 &&
                              socketData[0].pair.token0.derivedETH
                          ).toFixed(2)}{' '}
                          ETH
                        </p>
                      </div>
                    </div>
                    <table className="table mb-0">
                      <tbody>
                        <tr className="">
                          <td>
                            <b>Total liquidity:</b>
                          </td>
                          <td>
                            $
                            {socketData.length > 0 &&
                              parseFloat(socketData[0].pair.reserveUSD).toFixed(
                                2
                              )}{' '}
                          </td>
                        </tr>
                        <tr className="secend-tr">
                          <td>
                            <b>Daily volume:</b>
                          </td>
                          <td>
                            $
                            {marketCapDetails &&
                              parseFloat(
                                marketCapDetails.quote.USD.volume_24h
                              ).toFixed(2)}{' '}
                          </td>
                        </tr>
                        <tr className="">
                          <td>
                            <b>
                              Pooled{' '}
                              {socketData.length > 0 &&
                                `${socketData[0].pair.token0.symbol}`}
                              :
                            </b>
                          </td>
                          <td>
                            {socketData.length > 0 &&
                              parseFloat(socketData[0].pair.reserve0).toFixed(
                                2
                              )}{' '}
                          </td>
                        </tr>
                        <tr className="secend-tr">
                          <td>
                            <b>
                              Pooled{' '}
                              {socketData.length > 0 &&
                                `${socketData[0].pair.token1.symbol}`}
                              :
                            </b>
                          </td>
                          <td>
                            {socketData.length > 0 &&
                              parseFloat(socketData[0].pair.reserve1).toFixed(
                                2
                              )}{' '}
                          </td>
                        </tr>
                        <tr className="">
                          <td>
                            <b>Total tx:</b>
                          </td>
                          <td>
                            {socketData.length > 0 &&
                              socketData[0].pair.txCount}{' '}
                          </td>
                        </tr>
                        {/* <tr className="secend-tr">
                          <td>
                            <b>Holders:</b>
                          </td>
                          <td>4747</td>
                        </tr> */}
                        {marketCapDetails && (
                          <tr className="secend-tr">
                            <td colSpan="2">
                              {' '}
                              <a
                                href="javascript:void(0)"
                                onClick={viewInfoModal}
                              >
                                <i
                                  className="fa fa-info"
                                  aria-hidden="true"
                                ></i>{' '}
                                View more info
                              </a>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="col-md-12 col-lg-4 mb-3">
                  <div className="box">
                    <h6 className="mb-3">
                      {socketData.length > 0 &&
                        `${socketData[0].pair.token0.symbol}`}{' '}
                      Score
                    </h6>
                    <img src="images/graf-2.png" alt="" />
                  </div>
                </div>
                <div className="col-md-12 col-lg-4 mb-3">
                  <div className="box">
                    <h6 className="mb-3">Community trust (570 votes)</h6>
                    <img src="images/graf-3.png" alt="" />
                    <div className="like">
                      <div>
                        <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>{' '}
                        91.99%
                      </div>
                      <div>
                        <i
                          className="fa fa-thumbs-o-down"
                          aria-hidden="true"
                        ></i>{' '}
                        91.99%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <table className="table mb-0" style={{ borderRadius: 0 }}>
                  <thead>
                    <tr className=" text-right">
                      <td colSpan="8 p-4">
                        <ul
                          className="nav nav-pills "
                          id="pills-tab"
                          role="tablist"
                        >
                          <li className="nav-item">
                            <a
                              className="nav-link active"
                              id="pills-swap-tab"
                              data-toggle="pill"
                              href="#pills-swap"
                              role="tab"
                              aria-controls="pills-swap"
                              aria-selected="true"
                            >
                              Trade History
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              id="pills-pool-tab"
                              data-toggle="pill"
                              // href="#pills-pool"
                              href="javascript:void(0)"
                              role="tab"
                              aria-controls="pills-pool"
                              aria-selected="false"
                            >
                              My Positions
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              id="pills-uni-tab"
                              data-toggle="pill"
                              href="javascript:void(0)"
                              // href="#pills-uni"
                              role="tab"
                              aria-controls="pills-uni"
                              aria-selected="false"
                            >
                              Price Alerts
                            </a>
                          </li>
                          {/* <li className="nav-item">
                            <a className="nav-link">
                              DEXT (last 501 trades){' '}
                              <img src="images/filter-2.png" alt="" />
                            </a>
                          </li> */}
                        </ul>
                      </td>
                    </tr>
                  </thead>
                </table>
                <div className="tab-content" id="pills-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="pills-swap"
                    role="tabpanel"
                    aria-labelledby="pills-swap-tab"
                  >
                    <div className="table-responsive pool-table">
                      <table className="table mb-0">
                        <tbody>
                          <tr>
                            {/* <th>Token</th> */}
                            <th>Date</th>
                            <th>Type</th>
                            <th>Price USD</th>
                            <th>Price ETH </th>
                            <th>
                              Amount{' '}
                              {socketData.length > 0 &&
                                `${socketData[0].pair.token0.symbol}`}{' '}
                            </th>
                            <th>Total ETH</th>
                            <th>Maker</th>
                            <th>Others</th>
                          </tr>
                          {dataListToDisplay &&
                            dataListToDisplay.length > 0 &&
                            dataListToDisplay.map((listData, i) => {
                              return (
                                <tr
                                  className={
                                    (i + 1) % 2 === 0 ? '' : 'secend-tr'
                                  }
                                  key={i}
                                >
                                  {/* <td className="green-text">
                                    {listData.pair.token0.symbol}
                                  </td> */}
                                  <td>
                                    {moment(
                                      new Date(
                                        listData.transaction.timestamp * 1000
                                      )
                                    ).format('YYYY-MM-D  mm:hh:ss')}
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

                                  <td className="">
                                    {' '}
                                    <span>
                                      $
                                      {parseFloat(
                                        listData.pair.token0.derivedETH *
                                          ethPrice
                                      ).toFixed(2)}{' '}
                                    </span>
                                  </td>
                                  <td>
                                    {parseFloat(
                                      listData.pair.token0.derivedETH
                                    ).toFixed(2)}
                                  </td>
                                  <td>
                                    {parseFloat(listData.amount0In).toFixed(2)}{' '}
                                  </td>
                                  <td>
                                    {parseFloat(listData.amount1Out).toFixed(2)}{' '}
                                  </td>
                                  <td>
                                    <a
                                      href={`https://etherscan.io/address/${listData.to}`}
                                      target="_blank"
                                      rel="noreferrer"
                                      style={{
                                        textDecoration: 'none',
                                        color: '#369d0e',
                                      }}
                                    >
                                      <span>{`${listData.to.slice(
                                        0,
                                        6
                                      )}...${listData.to.slice(
                                        listData.to.length - 4
                                      )}`}</span>
                                    </a>
                                  </td>
                                  <td>
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
                            })}
                        </tbody>
                      </table>
                    </div>
                    <table
                      className="table mb-0"
                      style={{
                        borderRadius: 0,
                      }}
                    >
                      <thead>
                        <tr className=" text-right">
                          <td colSpan="10 p-4">
                            <nav aria-label="Page navigation example">
                              <Pagination
                                noOfPages={noOfPages}
                                pageWiseDate={(lower, upper) =>
                                  pageWiseDate(lower, upper)
                                }
                              />{' '}
                            </nav>
                          </td>
                        </tr>
                      </thead>
                    </table>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="pills-pool"
                    role="tabpanel"
                    aria-labelledby="pills-pool-tab"
                  >
                    <div className="table-responsive pool-table">
                      <table className="table mb-0">
                        <tbody>
                          <tr>
                            <th>Date</th>
                            <th>Type</th>
                            <th>Price USD</th>
                            <th>Price ETH </th>
                            <th>Amount DEXT </th>
                            <th>Total ETH</th>
                            <th>Maker</th>
                            <th>Others</th>
                          </tr>
                          <tr className="">
                            <td>2021-03-19 11:04:46</td>
                            <td>2 m 55 s </td>
                            <td className="">$0.70565922</td>
                            <td>0.0003956</td>
                            <td>5,600.00 </td>
                            <td>2.215347 </td>
                            <td className="green-text">...6c13c072068DF45</td>
                            <td>
                              <img
                                src="images/icon-6.png"
                                className="mr-2"
                                alt=""
                              />
                              <a href="#">View</a>
                            </td>
                          </tr>
                          <tr className="secend-tr">
                            <td>2021-03-19 11:04:46</td>
                            <td>2 m 55 s </td>
                            <td className="">$0.70565922</td>
                            <td>0.0003956</td>
                            <td>5,600.00 </td>
                            <td>2.215347 </td>
                            <td className="green-text">...6c13c072068DF45</td>
                            <td>
                              <img
                                src="images/icon-6.png"
                                className="mr-2"
                                alt=""
                              />
                              <a href="#">View</a>
                            </td>
                          </tr>
                          <tr className="">
                            <td>2021-03-19 11:04:46</td>
                            <td>2 m 55 s </td>
                            <td className="">$0.70565922</td>
                            <td>0.0003956</td>
                            <td>5,600.00 </td>
                            <td>2.215347 </td>
                            <td className="green-text">...6c13c072068DF45</td>
                            <td>
                              <img
                                src="images/icon-6.png"
                                className="mr-2"
                                alt=""
                              />
                              <a href="#">View</a>
                            </td>
                          </tr>
                          <tr className="secend-tr">
                            <td>2021-03-19 11:04:46</td>
                            <td>2 m 55 s </td>
                            <td className="">$0.70565922</td>
                            <td>0.0003956</td>
                            <td>5,600.00 </td>
                            <td>2.215347 </td>
                            <td className="green-text">...6c13c072068DF45</td>
                            <td>
                              <img
                                src="images/icon-6.png"
                                className="mr-2"
                                alt=""
                              />
                              <a href="#">View</a>
                            </td>
                          </tr>
                          <tr className="">
                            <td>2021-03-19 11:04:46</td>
                            <td>2 m 55 s </td>
                            <td className="">$0.70565922</td>
                            <td>0.0003956</td>
                            <td>5,600.00 </td>
                            <td>2.215347 </td>
                            <td className="green-text">...6c13c072068DF45</td>
                            <td>
                              <img
                                src="images/icon-6.png"
                                className="mr-2"
                                alt=""
                              />
                              <a href="#">View</a>
                            </td>
                          </tr>
                          <tr className="secend-tr">
                            <td>2021-03-19 11:04:46</td>
                            <td>2 m 55 s </td>
                            <td className="">$0.70565922</td>
                            <td>0.0003956</td>
                            <td>5,600.00 </td>
                            <td>2.215347 </td>
                            <td className="green-text">...6c13c072068DF45</td>
                            <td>
                              <img
                                src="images/icon-6.png"
                                className="mr-2"
                                alt=""
                              />
                              <a href="#">View</a>
                            </td>
                          </tr>
                          <tr className="">
                            <td>2021-03-19 11:04:46</td>
                            <td>2 m 55 s </td>
                            <td className="">$0.70565922</td>
                            <td>0.0003956</td>
                            <td>5,600.00 </td>
                            <td>2.215347 </td>
                            <td className="green-text">...6c13c072068DF45</td>
                            <td>
                              <img
                                src="images/icon-6.png"
                                className="mr-2"
                                alt=""
                              />
                              <a href="#">View</a>
                            </td>
                          </tr>
                          <tr className="secend-tr">
                            <td>2021-03-19 11:04:46</td>
                            <td>2 m 55 s </td>
                            <td className="">$0.70565922</td>
                            <td>0.0003956</td>
                            <td>5,600.00 </td>
                            <td>2.215347 </td>
                            <td className="green-text">...6c13c072068DF45</td>
                            <td>
                              <img
                                src="images/icon-6.png"
                                className="mr-2"
                                alt=""
                              />
                              <a href="#">View</a>
                            </td>
                          </tr>
                          <tr className="">
                            <td>2021-03-19 11:04:46</td>
                            <td>2 m 55 s </td>
                            <td className="">$0.70565922</td>
                            <td>0.0003956</td>
                            <td>5,600.00 </td>
                            <td>2.215347 </td>
                            <td className="green-text">...6c13c072068DF45</td>
                            <td>
                              <img
                                src="images/icon-6.png"
                                className="mr-2"
                                alt=""
                              />
                              <a href="#">View</a>
                            </td>
                          </tr>
                          <tr className="secend-tr">
                            <td>2021-03-19 11:04:46</td>
                            <td>2 m 55 s </td>
                            <td className="">$0.70565922</td>
                            <td>0.0003956</td>
                            <td>5,600.00 </td>
                            <td>2.215347 </td>
                            <td className="green-text">...6c13c072068DF45</td>
                            <td>
                              <img
                                src="images/icon-6.png"
                                className="mr-2"
                                alt=""
                              />
                              <a href="#">View</a>
                            </td>
                          </tr>
                          <tr className="">
                            <td>2021-03-19 11:04:46</td>
                            <td>2 m 55 s </td>
                            <td className="">$0.70565922</td>
                            <td>0.0003956</td>
                            <td>5,600.00 </td>
                            <td>2.215347 </td>
                            <td className="green-text">...6c13c072068DF45</td>
                            <td>
                              <img
                                src="images/icon-6.png"
                                className="mr-2"
                                alt=""
                              />
                              <a href="#">View</a>
                            </td>
                          </tr>
                          <tr className="secend-tr">
                            <td>2021-03-19 11:04:46</td>
                            <td>2 m 55 s </td>
                            <td className="">$0.70565922</td>
                            <td>0.0003956</td>
                            <td>5,600.00 </td>
                            <td>2.215347 </td>
                            <td className="green-text">...6c13c072068DF45</td>
                            <td>
                              <img
                                src="images/icon-6.png"
                                className="mr-2"
                                alt=""
                              />
                              <a href="#">View</a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <table
                      className="table mb-0"
                      style={{
                        borderRadius: 0,
                      }}
                    >
                      <thead>
                        <tr className=" text-right">
                          <td colSpan="10 p-4">
                            <nav aria-label="Page navigation example">
                              <ul className="pagination     justify-content-end">
                                <li className="page-item">
                                  <a
                                    className="page-link"
                                    href="#"
                                    aria-label="Previous"
                                  >
                                    <span aria-hidden="true">&laquo;</span>
                                    <span className="sr-only">Previous</span>
                                  </a>
                                </li>
                                <li className="page-item">
                                  <a className="page-link" href="#">
                                    1
                                  </a>
                                </li>
                                <li className="page-item">
                                  <a className="page-link" href="#">
                                    2
                                  </a>
                                </li>
                                <li className="page-item">
                                  <a className="page-link" href="#">
                                    3
                                  </a>
                                </li>
                                <li className="page-item">
                                  <a
                                    className="page-link"
                                    href="#"
                                    aria-label="Next"
                                  >
                                    <span aria-hidden="true">&raquo;</span>
                                    <span className="sr-only">Next</span>
                                  </a>
                                </li>
                              </ul>
                            </nav>
                          </td>
                        </tr>
                      </thead>
                    </table>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="pills-uni"
                    role="tabpanel"
                    aria-labelledby="pills-uni-tab"
                  >
                    <div className="table-responsive pool-table">
                      <table className="table mb-0">
                        <tbody>
                          <tr>
                            <th>Date</th>
                            <th>Type</th>
                            <th>Price USD</th>
                            <th>Price ETH </th>
                            <th>Amount DEXT </th>
                            <th>Total ETH</th>
                            <th>Maker</th>
                            <th>Others</th>
                          </tr>
                          <tr className="">
                            <td>2021-03-19 11:04:46</td>
                            <td>2 m 55 s </td>
                            <td className="">$0.70565922</td>
                            <td>0.0003956</td>
                            <td>5,600.00 </td>
                            <td>2.215347 </td>
                            <td className="green-text">...6c13c072068DF45</td>
                            <td>
                              <img
                                src="images/icon-6.png"
                                className="mr-2"
                                alt=""
                              />
                              <a href="#">View</a>
                            </td>
                          </tr>
                          <tr className="secend-tr">
                            <td>2021-03-19 11:04:46</td>
                            <td>2 m 55 s </td>
                            <td className="">$0.70565922</td>
                            <td>0.0003956</td>
                            <td>5,600.00 </td>
                            <td>2.215347 </td>
                            <td className="green-text">...6c13c072068DF45</td>
                            <td>
                              <img
                                src="images/icon-6.png"
                                className="mr-2"
                                alt=""
                              />
                              <a href="#">View</a>
                            </td>
                          </tr>
                          <tr className="">
                            <td>2021-03-19 11:04:46</td>
                            <td>2 m 55 s </td>
                            <td className="">$0.70565922</td>
                            <td>0.0003956</td>
                            <td>5,600.00 </td>
                            <td>2.215347 </td>
                            <td className="green-text">...6c13c072068DF45</td>
                            <td>
                              <img
                                src="images/icon-6.png"
                                className="mr-2"
                                alt=""
                              />
                              <a href="#">View</a>
                            </td>
                          </tr>
                          <tr className="secend-tr">
                            <td>2021-03-19 11:04:46</td>
                            <td>2 m 55 s </td>
                            <td className="">$0.70565922</td>
                            <td>0.0003956</td>
                            <td>5,600.00 </td>
                            <td>2.215347 </td>
                            <td className="green-text">...6c13c072068DF45</td>
                            <td>
                              <img
                                src="images/icon-6.png"
                                className="mr-2"
                                alt=""
                              />
                              <a href="#">View</a>
                            </td>
                          </tr>
                          <tr className="">
                            <td>2021-03-19 11:04:46</td>
                            <td>2 m 55 s </td>
                            <td className="">$0.70565922</td>
                            <td>0.0003956</td>
                            <td>5,600.00 </td>
                            <td>2.215347 </td>
                            <td className="green-text">...6c13c072068DF45</td>
                            <td>
                              <img
                                src="images/icon-6.png"
                                className="mr-2"
                                alt=""
                              />
                              <a href="#">View</a>
                            </td>
                          </tr>
                          <tr className="secend-tr">
                            <td>2021-03-19 11:04:46</td>
                            <td>2 m 55 s </td>
                            <td className="">$0.70565922</td>
                            <td>0.0003956</td>
                            <td>5,600.00 </td>
                            <td>2.215347 </td>
                            <td className="green-text">...6c13c072068DF45</td>
                            <td>
                              <img
                                src="images/icon-6.png"
                                className="mr-2"
                                alt=""
                              />
                              <a href="#">View</a>
                            </td>
                          </tr>
                          <tr className="">
                            <td>2021-03-19 11:04:46</td>
                            <td>2 m 55 s </td>
                            <td className="">$0.70565922</td>
                            <td>0.0003956</td>
                            <td>5,600.00 </td>
                            <td>2.215347 </td>
                            <td className="green-text">...6c13c072068DF45</td>
                            <td>
                              <img
                                src="images/icon-6.png"
                                className="mr-2"
                                alt=""
                              />
                              <a href="#">View</a>
                            </td>
                          </tr>
                          <tr className="secend-tr">
                            <td>2021-03-19 11:04:46</td>
                            <td>2 m 55 s </td>
                            <td className="">$0.70565922</td>
                            <td>0.0003956</td>
                            <td>5,600.00 </td>
                            <td>2.215347 </td>
                            <td className="green-text">...6c13c072068DF45</td>
                            <td>
                              <img
                                src="images/icon-6.png"
                                className="mr-2"
                                alt=""
                              />
                              <a href="#">View</a>
                            </td>
                          </tr>
                          <tr className="">
                            <td>2021-03-19 11:04:46</td>
                            <td>2 m 55 s </td>
                            <td className="">$0.70565922</td>
                            <td>0.0003956</td>
                            <td>5,600.00 </td>
                            <td>2.215347 </td>
                            <td className="green-text">...6c13c072068DF45</td>
                            <td>
                              <img
                                src="images/icon-6.png"
                                className="mr-2"
                                alt=""
                              />
                              <a href="#">View</a>
                            </td>
                          </tr>
                          <tr className="secend-tr">
                            <td>2021-03-19 11:04:46</td>
                            <td>2 m 55 s </td>
                            <td className="">$0.70565922</td>
                            <td>0.0003956</td>
                            <td>5,600.00 </td>
                            <td>2.215347 </td>
                            <td className="green-text">...6c13c072068DF45</td>
                            <td>
                              <img
                                src="images/icon-6.png"
                                className="mr-2"
                                alt=""
                              />
                              <a href="#">View</a>
                            </td>
                          </tr>
                          <tr className="">
                            <td>2021-03-19 11:04:46</td>
                            <td>2 m 55 s </td>
                            <td className="">$0.70565922</td>
                            <td>0.0003956</td>
                            <td>5,600.00 </td>
                            <td>2.215347 </td>
                            <td className="green-text">...6c13c072068DF45</td>
                            <td>
                              <img
                                src="images/icon-6.png"
                                className="mr-2"
                                alt=""
                              />
                              <a href="#">View</a>
                            </td>
                          </tr>
                          <tr className="secend-tr">
                            <td>2021-03-19 11:04:46</td>
                            <td>2 m 55 s </td>
                            <td className="">$0.70565922</td>
                            <td>0.0003956</td>
                            <td>5,600.00 </td>
                            <td>2.215347 </td>
                            <td className="green-text">...6c13c072068DF45</td>
                            <td>
                              <img
                                src="images/icon-6.png"
                                className="mr-2"
                                alt=""
                              />
                              <a href="#">View</a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <table
                      className="table mb-0"
                      style={{
                        borderRadius: 0,
                      }}
                    >
                      <thead>
                        <tr className=" text-right">
                          <td colSpan="10 p-4">
                            <nav aria-label="Page navigation example">
                              <ul className="pagination     justify-content-end">
                                <li className="page-item">
                                  <a
                                    className="page-link"
                                    href="#"
                                    aria-label="Previous"
                                  >
                                    <span aria-hidden="true">&laquo;</span>
                                    <span className="sr-only">Previous</span>
                                  </a>
                                </li>
                                <li className="page-item">
                                  <a className="page-link" href="#">
                                    1
                                  </a>
                                </li>
                                <li className="page-item">
                                  <a className="page-link" href="#">
                                    2
                                  </a>
                                </li>
                                <li className="page-item">
                                  <a className="page-link" href="#">
                                    3
                                  </a>
                                </li>
                                <li className="page-item">
                                  <a
                                    className="page-link"
                                    href="#"
                                    aria-label="Next"
                                  >
                                    <span aria-hidden="true">&raquo;</span>
                                    <span className="sr-only">Next</span>
                                  </a>
                                </li>
                              </ul>
                            </nav>
                          </td>
                        </tr>
                      </thead>
                    </table>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <>
            <div
              className="modal fade"
              id={'moreInfo'}
              tabIndex="-1"
              role="dialog"
              aria-labelledby="exampleModalCenterTitle"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered "
                role="document"
              >
                <div className="modal-content">
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignContent: 'center',
                      width: '100%',
                      padding: 50,
                      backgroundColor: '#10171f',
                      minWidth: 600,
                    }}
                  >
                    <div style={{ display: 'flex', width: '100%' }}>
                      <div style={{ flex: '0.5', width: '100%' }}>
                        <p>Market Cap:</p>
                      </div>
                      <div
                        style={{
                          flex: '0.5',
                          width: '100%',
                          textAlign: 'right',
                        }}
                      >
                        <p>
                          $
                          {marketCapDetails &&
                            parseFloat(
                              marketCapDetails.quote.USD.market_cap
                            ).toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', width: '100%' }}>
                      <div style={{ flex: '0.5', width: '100%' }}>
                        <p>Circ. Supply:</p>
                      </div>
                      <div
                        style={{
                          flex: '0.5',
                          width: '100%',
                          textAlign: 'right',
                        }}
                      >
                        <p>
                          {marketCapDetails &&
                            socketData.length > 0 &&
                            parseFloat(
                              marketCapDetails.circulating_supply
                            ).toFixed(2)}{' '}
                          {socketData.length > 0 &&
                            socketData[0].pair.token1.symbol}
                        </p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', width: '100%' }}>
                      <div style={{ flex: '0.5', width: '100%' }}>
                        <p>1 ETH :</p>
                      </div>
                      <div
                        style={{
                          flex: '0.5',
                          width: '100%',
                          textAlign: 'right',
                        }}
                      >
                        <p>
                          {marketCapDetails &&
                            socketData.length > 0 &&
                            parseFloat(
                              1 / socketData[0].pair.token0.derivedETH
                            ).toFixed(2)}{' '}
                          {socketData.length > 0 &&
                            socketData[0].pair.token1.symbol}
                        </p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', width: '100%' }}>
                      <div style={{ flex: '0.5', width: '100%' }}>
                        <p>Pool created:</p>
                      </div>
                      <div
                        style={{
                          flex: '0.5',
                          width: '100%',
                          textAlign: 'right',
                        }}
                      >
                        <p>
                          {socketData.length > 0 &&
                            moment(
                              socketData[0].pair.createdAtTimestamp * 1000
                            ).format('YYYY-MM-D  mm:hh')}{' '}
                          {/* {moment(
                            new (socketData[0].pair.createdAtTimestamp * 1000)()
                          ).format('YYYY-MM-D  mm:hh:ss')} */}
                        </p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', width: '100%' }}>
                      <div style={{ flex: '0.5', width: '100%' }}>
                        <p>Fully diluted Market Cap:</p>
                      </div>
                      <div
                        style={{
                          flex: '0.5',
                          width: '100%',
                          textAlign: 'right',
                        }}
                      >
                        <p>
                          $
                          {marketCapDetails &&
                            socketData.length > 0 &&
                            parseFloat(
                              socketData[0].pair.token0.derivedETH *
                                ethPrice *
                                marketCapDetails.total_supply
                            ).toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', width: '100%' }}>
                      <div style={{ flex: '0.5', width: '100%' }}>
                        <p>Total Supply:</p>
                      </div>
                      <div
                        style={{
                          flex: '0.5',
                          width: '100%',
                          textAlign: 'right',
                        }}
                      >
                        <p>
                          {marketCapDetails &&
                            parseFloat(marketCapDetails.total_supply).toFixed(
                              2
                            )}{' '}
                          {socketData.length > 0 &&
                            `${socketData[0].pair.token0.symbol}`}{' '}
                          {socketData.length > 0 &&
                            socketData[0].pair.token1.symbol}
                        </p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', width: '100%' }}>
                      <div style={{ flex: '0.5', width: '100%' }}>
                        <p>
                          Pooled{' '}
                          {socketData.length > 0 &&
                            `${socketData[0].pair.token1.symbol}`}
                          :
                        </p>
                      </div>
                      <div
                        style={{
                          flex: '0.5',
                          width: '100%',
                          textAlign: 'right',
                        }}
                      >
                        <p>
                          {marketCapDetails &&
                            socketData.length > 0 &&
                            parseFloat(
                              (socketData[0].pair.reserve0 /
                                marketCapDetails.circulating_supply) *
                                100
                            ).toFixed(2)}
                          %
                        </p>
                      </div>
                    </div>
                    <hr></hr>
                    <div
                      style={{
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'flex-end',
                        alignContent: 'flex-end',
                      }}
                    >
                      <div>
                        <button
                          className="btn btn-trade"
                          onClick={() => window.$('#moreInfo').modal('hide')}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        </>
      )}
    </Page>
  );
};

export default Pair_explorer;
