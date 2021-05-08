import Page from '../components/Page';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import axios from 'axios';
import { useEffect, useState } from 'react';
import GraphComponent from '../components/GraphComponent';
import HomeSearch from '../components/HomePageSearch';
import PageLoader, { ContaientLoader } from '../components/PageLoader';
import ApiConfig from '../Config/ApiConfig';
import moment from 'moment';
import LatestPoolDetails from '../components/LatestPoolDetails';
const accessToken = window.localStorage.getItem('accessToken');

const Home = () => {
  const [ethPrice, setEthPrice] = useState(0);
  const [listData, setListData] = useState();
  const [dataList, setDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
    getListData();
    getTableData();
  }, []);

  const getTableData = async () => {
    try {
      const res = await axios.get(ApiConfig.getLatestData, {
        headers: {
          token: accessToken,
        },
      });

      if (res.data.response_code !== 200) {
        setDataList([]);
      } else {
        console.log('res', res);

        setDataList(res.data.result);
      }
    } catch (err) {
      console.log('ERROR', err);
    }
    setIsLoading(false);
  };

  const getData = async () => {
    try {
      const res = await axios.get(
        'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=USD'
      );
      setEthPrice(res.data.ethereum);
    } catch (err) {
      console.log('ERROR', err);
    }
  };

  const getListData = async () => {
    try {
      const res = await axios.get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=gecko_asc&per_page=10&page=1&sparkline=false'
      );
      console.log('reddddddsssssss', res.data);
      setListData(res.data);
    } catch (err) {
      console.log('ERROR', err);
    }
  };
  return (
    <Page title="DSCVR">
      {/* {isLoading ? (
        <PageLoader />
      ) : ( */}
      <>
        <Header />
        <div className="right-main2">
          <div className="page-heding mb-3">
            <div className="page-heding-left">
              <span>V0.1.3 UNISWAP POOL TOOLS </span>
              <h1>Board</h1>
            </div>
            {/* <div
            className="page-heding-right text-right"
            style={{ justifyContent: 'flex-end' }}
          >
            <button className="btn connect">Connect Your Wallet</button>
          </div> */}
          </div>

          <section className="home-section mt-5 ">
            <div className="row ">
              <div className="col-lg-12 col-xl-6 col-md-12 mb-4">
                <div className="page-titel mb-4">
                  <img src="images/whitelist-icon.png" alt="" />{' '}
                  <h2>
                    <span>DSCVR</span> Spotlight{' '}
                  </h2>
                </div>
                <div className="table-responsive index-table">
                  <table className="table mb-0">
                    <tbody>
                      {dataList &&
                        !isLoading &&
                        dataList.length > 0 &&
                        dataList.map((data, i) => {
                          return (
                            <tr
                              className={(i + 1) % 2 === 0 ? '' : 'secend-tr'}
                              key={i}
                            >
                              <td
                                className="index-td"
                                style={{
                                  display: 'flex',
                                  justifyContent: 'flex-start',
                                  alignContent: 'center',
                                  alignItems: 'center',
                                }}
                              >
                                <img
                                  src={
                                    data.projectlogo
                                      ? data.projectlogo
                                      : 'images/image.png'
                                  }
                                  height="30"
                                  width="30"
                                  // className="product-img"
                                  alt=""
                                  style={{ marginRight: 5 }}
                                />{' '}
                                {data.projectName}
                              </td>
                              <td>{moment(data.date).format('D MMM, yy')}</td>
                              <td>{data.category}</td>
                              <td>
                                {+new Date(data.date) > +new Date()
                                  ? 'Open'
                                  : 'Close'}
                              </td>
                              <td>{data.projectType}</td>
                              {/* <td>
                                <Link
                                  to={{
                                    pathname: '/coin-details',
                                    state: { data: data },
                                  }}
                                >
                                  Join Now{' '}
                                  <i
                                    className="fa fa-external-link"
                                    aria-hidden="true"
                                  ></i>
                                </Link>
                              </td> */}
                            </tr>
                          );
                        })}
                      <tr>
                        <td colSpan={5}>
                          {isLoading && (
                            <div style={{ minHeight: 325 }}>
                              {' '}
                              <ContaientLoader />{' '}
                            </div>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-lg-12 col-xl-6 col-md-12 mb-4">
                <div className="search-filter">
                  <div className="page-titel mb-4">
                    <img src="images/pair-icon.png" alt="" />{' '}
                    <h2>
                      <span>Select </span> Pairs{' '}
                    </h2>
                  </div>
                  {/* <HomeSearch /> */}
                </div>
                <div className="pair-map" style={{ height: 350 }}>
                  <GraphComponent pair={'ETH-USD'} />
                  {/* <a href="pair_explorer.html">
                  <img src="images/graf.png" alt="" />
                </a> */}
                </div>
                <div className="text-right">
                  <a href="javascript:void(0)" className="btn connect mt-2">
                    {' '}
                    Buy Now
                  </a>
                </div>
              </div>
              <div className="col-lg-12 col-xl-6 col-md-12 mb-4">
                <div className="page-titel mb-4">
                  <img src="images/nft-icon.png" alt="" />{' '}
                  <h2>
                    <span>NFT</span> Zone{' '}
                  </h2>
                </div>
                <div className="news-div">
                  <div
                    className="news-card"
                    style={{ minHeight: 350, textAlign: 'center' }}
                  >
                    <h3>Coming soon</h3>
                    {/* <div className="keep-div mb-1">
                    <img src="images/icon-3.png" className="img-first" alt="" />{' '}
                    <h5>KEEP</h5> <img src="images/icon.png" alt="" />
                  </div>
                  <h6 className="mb-1">Proposed Keep-NuCypher merger </h6>
                  <p>
                    Together we’re proposing something new: the first
                    decentralized, on-chain protocol merge.{' '}
                  </p>
                  <span>2021-03-22, 02:28 </span> */}
                  </div>
                  {/* <div className="news-card">
                  <div className="keep-div mb-1">
                    <img src="images/icon-3.png" className="img-first" alt="" />{' '}
                    <h5>KEEP</h5> <img src="images/icon.png" alt="" />
                  </div>
                  <h6 className="mb-1">Proposed Keep-NuCypher merger </h6>
                  <p>
                    Together we’re proposing something new: the first
                    decentralized, on-chain protocol merge.{' '}
                  </p>
                  <span>2021-03-22, 02:28 </span>
                </div> */}
                  {/* <div className="mt-3 text-right">
                  {' '}
                  <button className="btn connect mt-2"> View More</button>
                </div> */}
                </div>
              </div>
              <div className="col-lg-12 col-xl-6 col-md-12 mb-4">
                <div className="page-titel mb-4">
                  <img src="images/tweet-icon.png" alt="" />{' '}
                  <h2>
                    <span>Crypto</span> Tweets{' '}
                  </h2>
                </div>
                <div className="whalebort-div ">
                  <div className="alrt-div">
                    <h6>
                      <img src="images/user-icon.png" className="user-icon" />
                      user name{' '}
                    </h6>
                    <p>
                      {' '}
                      30,000,000 USDT ($30, 139, 544) Transfered from Unknown to
                      Binance Blockchain: Tron{' '}
                    </p>
                    <a href="#">TX - Link @WhaleBotAlerts</a>
                    <span> &nbsp; 1:57 AM</span>
                  </div>
                  <div className="alrt-div">
                    <h6>
                      <img src="images/user-icon.png" className="user-icon" />
                      user name{' '}
                    </h6>
                    <p>
                      {' '}
                      30,000,000 USDT ($30, 139, 544) Transfered from Unknown to
                      Binance Blockchain: Tron{' '}
                    </p>
                    <a href="#">TX - Link @WhaleBotAlerts</a>
                    <span> &nbsp; 1:57 AM</span>
                  </div>
                  <div className="alrt-div">
                    <h6>
                      <img src="images/user-icon.png" className="user-icon" />
                      user name{' '}
                    </h6>
                    <p>
                      {' '}
                      30,000,000 USDT ($30, 139, 544) Transfered from Unknown to
                      Binance Blockchain: Tron{' '}
                    </p>
                    <a href="#">TX - Link @WhaleBotAlerts</a>
                    <span> &nbsp; 1:57 AM</span>
                  </div>
                </div>
                {/* <!-- <div className="news-div">
                        <div className="news-card alrt-div">
                            <div className="keep-div mb-3"><img src="images/user-icon.png" className="img-first" alt=""/> <h5>User name </h5> </div>
                            <h6 className="mb-2">Proposed Keep-NuCypher merger  </h6>
                            <p>Together we’re proposing something new: the first decentralized, on-chain protocol merge. </p>
                            <span>2021-03-22, 02:28  </span>
                        </div>
                        <div className="news-card" style="background-color: #000;">
                            <div className="keep-div mb-3"><img src="images/user-icon.png" className="img-first" alt=""/> <h5>User name </h5> </div>
                            <h6 className="mb-2">Proposed Keep-NuCypher merger  </h6>
                            <p>Together we’re proposing something new: the first decentralized, on-chain protocol merge. </p>
                            <span>2021-03-22, 02:28  </span>
                        </div>
                        <div className="news-card" style="background-color: #000;">
                            <div className="keep-div mb-3"><img src="images/user-icon.png" className="img-first" alt=""/> <h5>User name </h5> </div>
                            <h6 className="mb-2">Proposed Keep-NuCypher merger  </h6>
                            <p>Together we’re proposing something new: the first decentralized, on-chain protocol merge. </p>
                            <span>2021-03-22, 02:28  </span>
                        </div>
                    </div> --> */}
              </div>
              <div className="col-lg-12 col-xl-3 col-md-12 mb-4">
                <div className="page-titel mb-4">
                  <img src="images/telegram-icon.png" alt="" />{' '}
                  <h2>Telegram </h2>
                </div>
                <div className="telegarm-div text-center">
                  <div>
                    <img src="images/image-2.jpg" alt="" />
                    <h5>WhaleBot Alerts 🐳 </h5>
                    <span>132 978 subscribers </span>
                    <p className="mt-1">
                      The official{' '}
                      <a href="https://telegram.org/">@CryptoWhaleBot</a>{' '}
                      channel for crypto and bitcoin price action, social media
                      analytics, news, and more!
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-12 col-xl-3 col-md-12 mb-4">
                <div className="page-titel mb-4">
                  <img src="images/coingecko.png" alt="" />{' '}
                  <h2>
                    <span>New</span> Listings{' '}
                  </h2>
                </div>
                <div className="table-responsive index-table">
                  <table className="table mb-0">
                    <tbody>
                      <tr className="secend-tr">
                        <td>
                          <h5>ETH</h5>
                        </td>
                        <td className="green-text">
                          <h5> ${ethPrice && ethPrice.usd} </h5>
                        </td>
                        <td className="">
                          <a
                            href={`https://www.coingecko.com/en/coins/ethereum`}
                            target="_blank"
                          >
                            <img src="images/icon.png" />
                          </a>
                        </td>
                      </tr>
                      {listData &&
                        listData.length > 0 &&
                        listData.map((data, i) => {
                          return (
                            <tr
                              className={(i + 1) % 2 === 0 ? 'secend-tr' : ''}
                              key={i}
                            >
                              <td style={{ textTransform: 'uppercase' }}>
                                {data.symbol}
                              </td>
                              <td>${data.current_price} </td>
                              <td className="">
                                <a
                                  href={`https://www.coingecko.com/en/coins/${data.id}`}
                                  target="_blank"
                                >
                                  <img src="images/icon.png" />
                                </a>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-lg-12 col-xl-6 col-md-12 mb-4">
                <div className="page-titel mb-4">
                  <img src="images/Watchlist-icon.png" alt="" />{' '}
                  <h2>
                    <span>WhaleBot</span> Alerts{' '}
                  </h2>
                </div>
                <div className="whalebort-div ">
                  <div className="alrt-div">
                    <img src="images/arrow-right.png" className="arrow" />
                    <h6>
                      WhaleBot Alert{' '}
                      <img src="images/alert.png" className="img-alrt" />
                    </h6>
                    <p>
                      {' '}
                      <img src="images/alrt-2.png" className="img-alrt2" />{' '}
                      30,000,000 USDT ($30, 139, 544) Transfered from Unknown to
                      Binance Blockchain: Tron{' '}
                    </p>
                    <a href="#">TX - Link @WhaleBotAlerts</a>
                    <span>
                      <i className="fa fa-eye" aria-hidden="true"></i> 1 &nbsp;
                      1:57 AM
                    </span>
                  </div>
                  <div className="alrt-div">
                    <img src="images/arrow-right.png" className="arrow" />
                    <h6>
                      WhaleBot Alert{' '}
                      <img src="images/alert.png" className="img-alrt" />
                    </h6>
                    <p>
                      {' '}
                      <img src="images/alrt-2.png" className="img-alrt2" />{' '}
                      30,000,000 USDT ($30, 139, 544) Transfered{' '}
                    </p>
                    <a href="#">TX - Link @WhaleBotAlerts</a>
                    <span>
                      <i className="fa fa-eye" aria-hidden="true"></i> 1 &nbsp;
                      1:57 AM
                    </span>
                  </div>
                  <div className="alrt-div">
                    <img src="images/arrow-right.png" className="arrow" />
                    <h6>
                      WhaleBot Alert{' '}
                      <img src="images/alert.png" className="img-alrt" />
                    </h6>
                    <p>
                      {' '}
                      <img src="images/alrt-2.png" className="img-alrt2" />{' '}
                      30,000,000 USDT ($30, 139, 544) Transfered from Unknown to
                      Binance Blockchain: Tron{' '}
                    </p>
                    <a href="#">TX - Link @WhaleBotAlerts</a>
                    <span>
                      <i className="fa fa-eye" aria-hidden="true"></i> 1 &nbsp;
                      1:57 AM
                    </span>
                  </div>
                  <div className="alrt-div">
                    <img src="images/arrow-right.png" className="arrow" />
                    <h6>
                      WhaleBot Alert{' '}
                      <img src="images/alert.png" className="img-alrt" />
                    </h6>
                    <p>
                      {' '}
                      <img src="images/alrt-2.png" className="img-alrt2" />{' '}
                      30,000,000 USDT ($30, 139, 544) Transfered{' '}
                    </p>
                    <a href="#">TX - Link @WhaleBotAlerts</a>
                    <span>
                      <i className="fa fa-eye" aria-hidden="true"></i> 1 &nbsp;
                      1:57 AM
                    </span>
                  </div>
                  <div className="alrt-div">
                    <img src="images/arrow-right.png" className="arrow" />
                    <h6>
                      WhaleBot Alert{' '}
                      <img src="images/alert.png" className="img-alrt" />
                    </h6>
                    <p>
                      {' '}
                      <img src="images/alrt-2.png" className="img-alrt2" />{' '}
                      30,000,000 USDT ($30, 139, 544) Transfered from Unknown to
                      Binance Blockchain: Tron{' '}
                    </p>
                    <a href="#">TX - Link @WhaleBotAlerts</a>
                    <span>
                      <i className="fa fa-eye" aria-hidden="true"></i> 1 &nbsp;
                      1:57 AM
                    </span>
                  </div>
                  <div className="alrt-div">
                    <img src="images/arrow-right.png" className="arrow" />
                    <h6>
                      WhaleBot Alert{' '}
                      <img src="images/alert.png" className="img-alrt" />
                    </h6>
                    <p>
                      {' '}
                      <img src="images/alrt-2.png" className="img-alrt2" />{' '}
                      30,000,000 USDT ($30, 139, 544) Transfered{' '}
                    </p>
                    <a href="#">TX - Link @WhaleBotAlerts</a>
                    <span>
                      <i className="fa fa-eye" aria-hidden="true"></i> 1 &nbsp;
                      1:57 AM
                    </span>
                  </div>
                  <div className="alrt-div">
                    <img src="images/arrow-right.png" className="arrow" />
                    <h6>
                      WhaleBot Alert{' '}
                      <img src="images/alert.png" className="img-alrt" />
                    </h6>
                    <p>
                      {' '}
                      <img src="images/alrt-2.png" className="img-alrt2" />{' '}
                      30,000,000 USDT ($30, 139, 544) Transfered from Unknown to
                      Binance Blockchain: Tron{' '}
                    </p>
                    <a href="#">TX - Link @WhaleBotAlerts</a>
                    <span>
                      <i className="fa fa-eye" aria-hidden="true"></i> 1 &nbsp;
                      1:57 AM
                    </span>
                  </div>
                  <div className="alrt-div">
                    <img src="images/arrow-right.png" className="arrow" />
                    <h6>
                      WhaleBot Alert{' '}
                      <img src="images/alert.png" className="img-alrt" />
                    </h6>
                    <p>
                      {' '}
                      <img src="images/alrt-2.png" className="img-alrt2" />{' '}
                      30,000,000 USDT ($30, 139, 544) Transfered{' '}
                    </p>
                    <a href="#">TX - Link @WhaleBotAlerts</a>
                    <span>
                      <i className="fa fa-eye" aria-hidden="true"></i> 1 &nbsp;
                      1:57 AM
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* {dataList && dataList.length > 0 && ( */}
          <LatestPoolDetails dataList={dataList} />
          {/* )} */}
          <section className="home-section mt-5 pt-5">
            <div className="row">
              <div className="col-md-12 col-lg-6 col-xl-4 mb-3">
                <div className="page-titel mb-4">
                  <img
                    src="images/get-soon.png"
                    alt=""
                    className="get-soon-img"
                  />
                  <img src="images/icon-2..png" alt="" />{' '}
                  <button
                    className="btn theme-btn-border ml-4"
                    style={{ width: 300 }}
                  >
                    Launch Explorer
                  </button>
                </div>
              </div>
              <div className="col-md-12 col-lg-6 col-xl-4 mb-3">
                <div className="page-titel mb-4">
                  <img
                    src="images/get-soon.png"
                    alt=""
                    className="get-soon-img"
                  />
                  <img src="images/icon-2..png" alt="" />{' '}
                  <button
                    className="btn theme-btn-border ml-4"
                    style={{ width: 300 }}
                  >
                    Launch Explorer
                  </button>
                </div>
              </div>
              <div className="col-md-12 col-lg-6 col-xl-4 mb-3">
                <div className="page-titel mb-4">
                  <img
                    src="images/get-soon.png"
                    alt=""
                    className="get-soon-img"
                  />
                  <img src="images/icon-2..png" alt="" />{' '}
                  <button
                    className="btn theme-btn-border ml-4"
                    style={{ width: 300 }}
                  >
                    Launch Explorer
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </>
      {/* )} */}
    </Page>
  );
};

export default Home;
