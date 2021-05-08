import React, { createContext, useState, useMemo, useEffect } from 'react';
import Web3 from 'web3';
import { ethers } from 'ethers';
import {
  AbiDataETH,
  factoryContractAddressETH,
  FactoryContractAddressBNB,
  PresaleAbi,
  InfoAbi,
  FactoryContractAddressMatic,
} from '../Utils/index';

export default function LatestPoolDetails({ dataList }) {
  const [poolListData, setpoolListData] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);

  //   useEffect(() => {
  //     getSAFUAddressHandler(
  //       '0xEd27E5c6CFc27b0b244c1fB6f9AE076c3eb7C10B',
  //       'Ethereum'
  //     );
  //   }, []);

  const getSAFUAddressHandler = async (accountAddress, network) => {
    setpoolListData([]);
    const FactoryContractAddressLocal =
      network === 'Ethereum'
        ? factoryContractAddressETH
        : network === 'Matic'
        ? FactoryContractAddressMatic
        : FactoryContractAddressBNB;

    try {
      const web3 = (window.web3 = new Web3(window.ethereum));

      const factoryContract = new web3.eth.Contract(
        AbiDataETH,
        FactoryContractAddressLocal
      );

      await factoryContract.methods
        .SAFU()
        .call({ from: accountAddress })
        .then(async (receipt) => {
          console.log('SAFU', receipt);

          await getPresalesCountHandler(receipt, accountAddress);
        });
    } catch (error) {
      console.error('error', error);
    }
  };

  const getPresalesCountHandler = async (contractAddress, accountAddress) => {
    try {
      const web3 = (window.web3 = new Web3(window.ethereum));
      const contract = new web3.eth.Contract(InfoAbi, contractAddress);
      await contract.methods
        .getPresalesCount()
        .call({ from: accountAddress })
        .then(async (receipt) => {
          console.log('rrrrrrrrrrrrrrr', receipt);
          setIsUpdating(true);
          for (let i = receipt - 1; i >= 0; i--) {
            await getPresaleAddressHandler(contractAddress, accountAddress, i);
          }
          setIsUpdating(false);
        });
    } catch (error) {
      console.error('error', error);
    }
  };

  const getPresaleAddressHandler = async (
    contractAddress,
    accountAddress,
    i
  ) => {
    try {
      const web3 = (window.web3 = new Web3(window.ethereum));
      const contract = new web3.eth.Contract(InfoAbi, contractAddress);
      await contract.methods
        .getPresaleAddress(i)
        .call({ from: accountAddress })
        .then(async (receipt) => {
          await getPoolDataHandler(receipt, accountAddress, i);
        });
    } catch (error) {
      console.error('error***', error);
    }
  };

  const getPoolDataHandler = async (contractAddress, accountAddress, i) => {
    let obj = {};
    try {
      const web3 = (window.web3 = new Web3(window.ethereum));

      const contract = new web3.eth.Contract(PresaleAbi, contractAddress);
      await contract.methods
        .closeTime()
        .call({ from: accountAddress })
        .then((receipt) => {
          obj.closeTime = receipt;
        });

      await contract.methods
        .totalInvestorsCount()
        .call({ from: accountAddress })
        .then(async (receipt) => {
          obj.totalInvestorsCount = receipt;
        });

      await contract.methods
        .totalCollectedWei()
        .call({ from: accountAddress })
        .then(async (receipt) => {
          obj.totalCollectedWei = ethers.utils.formatEther(receipt).toString();
        });

      await contract.methods
        .presaleCancelled()
        .call({ from: accountAddress })
        .then(async (receipt) => {
          obj.presaleCancelled = receipt;
        });

      await contract.methods
        .uniLiquidityAdded()
        .call({ from: accountAddress })
        .then(async (receipt) => {
          obj.uniLiquidityAdded = receipt;
        });

      await contract.methods
        .hardCapInWei()
        .call({ from: accountAddress })
        .then((receipt) => {
          obj.hardCapInWei = ethers.utils.formatEther(receipt).toString();
        });

      await contract.methods
        .softCapInWei()
        .call({ from: accountAddress })
        .then((receipt) => {
          obj.softCapInWei = ethers.utils.formatEther(receipt).toString();
        });

      await contract.methods
        .openTime()
        .call({ from: accountAddress })
        .then((receipt) => {
          obj.openTime = receipt;
        });

      await contract.methods
        .uniLiquidityPercentageAllocation()
        .call({ from: accountAddress })
        .then((receipt) => {
          obj.uniLiquidityPercentageAllocation = receipt;
        });

      await contract.methods
        .saleTitle()
        .call({ from: accountAddress })
        .then((receipt) => {
          obj.saleTitle = ethers.utils.parseBytes32String(receipt);
        });

      obj.presaleAddress = contractAddress;
      await updateState(i, obj);
    } catch (error) {
      console.error('error', error);
    }
  };

  const updateState = async (i, resultObj) => {
    setpoolListData((data) => [...data, { id: i, data: resultObj }]);
  };

  return (
    <section className="mt-4 ">
      <div className="page-titel mb-4">
        {' '}
        <h2>
          <span>DSCVR</span> FEATURED Pools{' '}
        </h2>
      </div>
      <ul className="sponsors-ul">
        {dataList.map((data, i) => {
          return (
            <li key={i}>
              <div className="div123">
                <div className="keep-div mb-1">
                  <img
                    src={
                      data.projectlogo ? data.projectlogo : 'images/image.png'
                    }
                    className="img-first"
                    alt=""
                  />{' '}
                  <h5>
                    {data.projectName} <br />
                    <small>{data.category}</small>
                  </h5>
                </div>
                <div className="soon mb-3">
                  <label></label>{' '}
                  {+new Date(data.date) > +new Date() ? 'Open' : 'Close'}
                </div>
                <p>{data.summary}</p>
                <div className="follow text-center mt-2">
                  {/* <a href={data.}>
                    <i className="fa fa-facebook" aria-hidden="true"></i>
                  </a> */}
                  <a href={data.twitter} target="_blanck">
                    <i className="fa fa-twitter" aria-hidden="true"></i>
                  </a>

                  <a href={data.telegram} target="_blanck">
                    <i
                      className="fa fa-paper-plane pr-2"
                      aria-hidden="true"
                    ></i>
                  </a>
                  <a href={data.github} target="_blanck">
                    <i className="fa fa-github pr-2" aria-hidden="true"></i>
                  </a>
                  {/* <a href="#">
                    <i className="fa fa-linkedin" aria-hidden="true"></i>
                  </a> */}
                  {/* <a href="#">
                    <i className="fa fa-google" aria-hidden="true"></i>
                  </a> */}
                  {/* <a href="#">
                    <i className="fa fa-instagram" aria-hidden="true"></i>
                  </a> */}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
