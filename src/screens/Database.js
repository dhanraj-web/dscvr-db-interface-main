import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Page from '../components/Page';
import ApiConfig from '../Config/ApiConfig';
import axios from 'axios';
import { ContaientLoader, CriculerLoader } from '../components/PageLoader';
import moment from 'moment';
import TostMsg from '../components/TostMsg';
import { TostMsgFun } from '../ComoonFunctions/index';
const accessToken = window.localStorage.getItem('accessToken');

export default function Database() {
  const [dataList, setDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(ApiConfig.getDataListing, {
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

  return (
    <Page title="DSCVR">
      <>
        <div className="right-main2">
          <div className="page-heding mb-5">
            <div className="page-heding-left">
              <h1>DSCVR Database</h1>
            </div>
          </div>
          <div className="addvitisment text-center mt-3 mb-5">
            <img src="images/advertisment.png" alt="" />
          </div>
          <div className="filter-main-div mb-5">
            <div className="filter-div mt-3 ">
              <Link to="/add-database" className="btn btn-serch">
                Add Database
              </Link>
              <input
                type="text"
                className="form-control"
                placeholder="keywords"
              />
              <input
                type="text"
                className="form-control"
                placeholder="Coin/ticker"
              />
              <select className="form-control">
                <option>Category</option>
                <option>IDO</option>
                <option>Whitelist</option>
                <option> Seed Round </option>
                <option>Private sale</option>
                <option>Public sale</option>
                <option>Fair Launch </option>
                <option>Staking/Farming</option>
                <option>LGE Event</option>
                <option>IFO</option>
                <option> NFT Drop </option>
                <option>AirDrop</option>
              </select>
              <select className="form-control">
                <option>Project Type </option>
                <option>Native Exchange CEX</option>
                <option>Native Exchange DEX</option>
                <option>DeFi</option>
                <option>Oracles</option>
                <option>NFT</option>
                <option>Deflationary</option>
                <option>Launchpad</option>
                <option>Gaming</option>
                <option>Lending</option>
                <option>Wallets</option>
                <option>Insurance</option>
                <option>Rebase</option>
                <option>Algo Stablecoin / Seigniorage</option>
                <option>Governance</option>
              </select>
              <select className="form-control">
                <option>Blockchain</option>
                <option>Ethereum </option>
                <option>Binance SmartChain</option>
                <option>Solana</option>
                <option>Cardano</option>
                <option>Stellar</option>
                <option>CasperLabs</option>
                <option>Tezos</option>
                <option>Hedera Hashgraph</option>
                <option>Neo</option>
                <option>Layer 2</option>
              </select>
              <button className="btn btn-serch">Search</button>
            </div>
          </div>
          <div className="mt-3  row">
            {dataList &&
              dataList.length > 0 &&
              dataList.map((data, i) => {
                return (
                  <CoinCard
                    key={i}
                    data={data}
                    dataList={dataList}
                    getData={getData}
                  />
                );
              })}
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
              width: '100%',
            }}
          >
            {isLoading && <ContaientLoader />}
          </div>
        </div>
      </>
    </Page>
  );
}

export function CoinCard({ data, dataList, getData }) {
  const [isLoadingUp, setIsLoadingUp] = useState(false);
  const [isLoadingDown, setIsLoadingDown] = useState(false);
  const [tostMsg, setTostMsg] = useState('');

  const voteUpHandler = async (dataId) => {
    setIsLoadingUp(true);
    try {
      const res = await axios.post(
        ApiConfig.upVote,
        {
          dataId: dataId,
        },
        {
          headers: {
            token: accessToken,
          },
        }
      );
      if (res.data.response_code !== 200) {
        setTostMsg(res.data.response_message);
        TostMsgFun();
      } else {
        console.log('res response_message', res.data.response_message);

        setTostMsg(res.data.response_message);
        TostMsgFun();
        setTimeout(() => {
          getData();
        }, 1000);
      }
    } catch (err) {
      console.log('ERROR', err);
    }
    setIsLoadingUp(false);
  };

  const voteDownHandler = async (dataId) => {
    setIsLoadingDown(true);
    try {
      const res = await axios.post(
        ApiConfig.downVote,
        {
          dataId: dataId,
        },
        {
          headers: {
            token: accessToken,
          },
        }
      );
      if (res.data.response_code !== 200) {
        setTostMsg(res.data.response_message);
        TostMsgFun();
      } else {
        console.log('res', res);

        setTostMsg(res.data.response_message);
        TostMsgFun();
        setTimeout(() => {
          getData();
        }, 1000);
      }
    } catch (err) {
      console.log('ERROR', err);
    }
    setIsLoadingDown(false);
  };

  const WishUnWishedDataHandler = async (dataId) => {
    setIsLoadingDown(true);
    try {
      const res = await axios.post(
        ApiConfig.WishUnWishedData,
        {
          dataId: dataId,
        },
        {
          headers: {
            token: accessToken,
          },
        }
      );
      console.log('res', res);
      if (res.data.response_code !== 200) {
      } else {
        getData();
        console.log('res', res);
      }
    } catch (err) {
      console.log('ERROR', err);
    }
    setIsLoadingDown(false);
  };

  return (
    <div className="col-md-12 col-lg-6 col-xl-3 mb-4 ">
      <TostMsg tostMsg={tostMsg} />

      <div className=" coin-card">
        <div className="right-icon">
          <a href="javascript:void(0)" title="watchlist">
            <i
              className={true ? 'fa fa-star-o' : 'fa fa-star'}
              aria-hidden="true"
              style={{ color: '#0bc988' }}
            ></i>
          </a>
          <i className="fa fa-calendar" aria-hidden="true"></i>
          <i className="fa fa-clock-o" aria-hidden="true"></i>
        </div>
        <Link
          to={{
            pathname: '/coin-details',
            search: data._id,
            state: { data: data, dataList: dataList },
          }}
        >
          <img src={data.projectlogo ? data.projectlogo : 'images/image.png'} />
        </Link>
        <p>{data.category}</p>
        <b>{moment(data.date).format('D MMM, yy')}</b>
        <h5 className="mt-2">{data.projectName}</h5>
        <div className="line-clamp">
          <p className="mt-2 mb-2">{data.summary}</p>
        </div>

        <div className="progress-div mt-4">
          <span>
            {parseInt(data.upVoteCount) + parseInt(data.downVoteCount) === 0
              ? 0
              : parseFloat(
                  (parseInt(data.upVoteCount) /
                    (parseInt(data.upVoteCount) +
                      parseInt(data.downVoteCount))) *
                    100
                ).toFixed(2)}
            %
          </span>
          <span>
            {parseInt(data.upVoteCount) + parseInt(data.downVoteCount)} Votes{' '}
          </span>
        </div>
        <div className="progress">
          <div
            className={`progress-bar`}
            style={{
              width: `${
                (parseInt(data.upVoteCount) /
                  (parseInt(data.upVoteCount) + parseInt(data.downVoteCount))) *
                100
              }%`,
            }}
            role="progressbar"
            aria-valuenow="10"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
        <div className="up-btn-div mt-3">
          <button
            disabled={isLoadingUp}
            className="btn btn-up"
            onClick={() => voteUpHandler(data._id)}
          >
            <i className="fa fa-thumbs-up" aria-hidden="true"></i> Up{' '}
            {isLoadingUp && <CriculerLoader />}
          </button>
          <button
            disabled={isLoadingDown}
            className="btn btn-down ml-3"
            onClick={() => voteDownHandler(data._id)}
          >
            <i className="fa fa-thumbs-down" aria-hidden="true"></i> Down{' '}
            {isLoadingDown && <CriculerLoader />}
          </button>
        </div>
      </div>
    </div>
  );
}
