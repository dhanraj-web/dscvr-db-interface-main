import axios from "axios";
import React, { useState } from "react";
import Page from "../components/Page";
import ApiConfig from "../Config/ApiConfig";

export default function AddDatabase() {
  const [newProfilePic, setNewProfilePic] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formValue, setFormValue] = useState({
    projectName: "",
    category: "select",
    projectType: "select",
    blockchain: "select",
    tokenType: "ERC-20",
    date: null,
    time: null,
    summary: null,
    projectlogo: null,
    hardcap: null,
    maxsupply: null,
    seedPrice: null,
    privateSalePrice: null,
    publicSalePrice: null,
    listingPrice: null,
    twitter: null,
    discord: null,
    telegram: null,
    website: null,
    whitepaper: null,
    github: null,
    tokenAddress: null,
    projectInvolvenebt: "select",
    yourRewardAddress: "select",
    yourAddress: null,
  });

  // useEffect(() => {
  //   postAdbs();
  // }, []);

  // async function postRestaurants() {
  //   try {
  //     fetch("http://localhost:1337/adbs", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         formValue,
  //       }),
  //     })
  //       .then((response) => response.json())
  //       .then((data) => console.log(data));
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  function postAdbs() {
    try {
      axios
        .post("http://localhost:1337/adbs", {
          projectName: formValue.projectName,
          blockchain: formValue.blockchain,
          category: formValue.category,
          date: formValue.date,
          discord: formValue.discord,
          github: formValue.github,
          hardcap: formValue.hardcap,
          listingPrice: formValue.listingPrice,
          maxsupply: formValue.maxsupply,
          privateSalePrice: formValue.privateSalePrice,
          projectInvolvement: formValue.projectInvolvement,
          projectType: formValue.projectType,
          // projectlogo: newProfilePic,
          publicSalePrice: formValue.publicSalePrice,
          seedPrice: formValue.seedPrice,
          summary: formValue.summary,
          telegram: formValue.telegram,
          time: formValue.time,
          tokenAddress: formValue.tokenAddress,
          tokenType: formValue.tokenType,
          twitter: formValue.twitter,
          website: formValue.website,
          whitepaper: formValue.whitepaper,
          yourAddress: formValue.yourAddress,
          yourRewardAddress: formValue.yourRewardAddress,
          published_at: null,
        })
        .then((response) => {
          console.log(response);
        });
    } catch (err) {
      console.log(err);
    }
  }
  // console.log(formValue);

  const _onInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const temp = { ...formValue, [name]: value };
    setFormValue(temp);
  };

  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (err) {
      console.log("Error: ", err);
    };
  };

  const _onProfilePicChange = (e) => {
    console.log("eeee", e);
    const name = e.target.id;
    const value = URL.createObjectURL(e.target.files[0]);
    getBase64(e.target.files[0], (result) => {
      console.log("result", result);
      setNewProfilePic(result);
    });
    const temp = { ...formValue, [name]: value };
    console.log("temp", temp);
    setFormValue(temp);
  };

  // const addData = async () => {
  //   if (!isLoading) {
  //     if (
  //       formValue.projectName !== "" &&
  //       formValue.category !== "select" &&
  //       formValue.blockchain !== "select" &&
  //       formValue.date !== "" &&
  //       formValue.time !== "" &&
  //       formValue.summary !== "" &&
  //       formValue.hardcap !== "" &&
  //       formValue.maxsupply !== "" &&
  //       formValue.seedPrice !== "" &&
  //       formValue.privateSalePrice !== "" &&
  //       formValue.publicSalePrice !== "" &&
  //       formValue.listingPrice !== "" &&
  //       formValue.tokenAddress !== "" &&
  //       formValue.yourAddress !== "" &&
  //       newProfilePic !== ""
  //     ) {
  //       try {
  //         setIsLoading(true);
  //         const res = await axios.post(
  //           ApiConfig.addData,
  //           {
  //             userId: "608a6343074b6d05aab503fa",
  //             projectName: formValue.projectName,
  //             category: formValue.category,
  //             projectType: formValue.projectType,
  //             blockchain: formValue.blockchain,
  //             date: formValue.date,
  //             time: formValue.time,
  //             summary: formValue.summary,
  //             projectlogo: newProfilePic,
  //             hardcap: formValue.hardcap,
  //             maxsupply: formValue.maxsupply,
  //             seedPrice: formValue.seedPrice,
  //             privateSalePrice: formValue.privateSalePrice,
  //             publicSalePrice: formValue.publicSalePrice,
  //             listingPrice: formValue.listingPrice,
  //             twitter: formValue.twitter,
  //             discord: formValue.discord,
  //             telegram: formValue.telegram,
  //             website: formValue.website,
  //             whitepaper: formValue.whitepaper,
  //             github: formValue.github,
  //             tokenAddress: formValue.tokenAddress,
  //             projectInvolvenebt: formValue.projectInvolvenebt,
  //             yourRewardAddress: formValue.yourRewardAddress,
  //             yourAddress: formValue.yourAddress,
  //           }
  //           // {
  //           //   headers: {
  //           //     token:
  //           //       'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOGE2MzQzMDc0YjZkMDVhYWI1MDNmYSIsImlhdCI6MTYxOTY5ODAzMywiZXhwIjoxNjE5Nzg0NDMzfQ.jM9whlSlAldrG79sQaeUqNVLjAj9RJHWfl69-rxbHV0',
  //           //   },
  //           // }
  //         );
  //         console.log("res", res);
  //         if (res.data.response_code !== 200) {
  //           alert("Error");
  //         } else {
  //           alert("Added Successfully !!");
  //         }
  //       } catch (err) {
  //         console.log("ERROR", err);
  //       }
  //       setIsLoading(false);
  //     } else {
  //       alert("Please select all fields");
  //     }
  //   }
  // };

  return (
    <Page title="DSCVR">
      <div className="right-main2">
        <div className="page-heding mb-5">
          <div className="page-heding-left">
            <h1>Add To Database</h1>
          </div>
          {/* <!-- <div className="page-heding-right text-right" style="justify-content: flex-end;">
               
               <a href="pair_explorer.html" className="btn theme-btn-border">Pair Explorer</a>
               <a href="pool_explorer.html" className="btn theme-btn-border ml-3">Pool Explorer</a>
               <a href="big_swap.html" className="btn theme-btn-border ml-3">Big Swap Explorer</a>
            </div> --> */}
        </div>
        <div className="add-div">
          <form>
            <div className="form-group">
              <label>Project Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter project name"
                name="projectName"
                value={formValue.projectName}
                onChange={(e) => _onInputChange(e)}
              />
            </div>
            <div className="row">
              <div className="form-group col-md-4">
                <label>Category</label>
                <select
                  name="category"
                  value={formValue.category}
                  className="form-control"
                  onChange={(e) => _onInputChange(e)}
                >
                  <option value="select">Select</option>
                  <option value="ido">IDO</option>
                  <option value="whitelist">Whitelist</option>
                  <option value="seedRound"> Seed Round </option>
                  <option value="privateSale">Private sale</option>
                  <option value="publicSale">Public sale</option>
                  <option value="fairLaunch"> Fair Launch </option>
                  <option valu="stakingFarming"> Staking/Farming</option>
                  <option value="lgeEvent">LGE Event</option>
                  <option value="ifo">IFO</option>
                  <option value="nftDrop"> NFT Drop </option>
                  <option value="airdrop">AirDrop</option>
                </select>
              </div>
              <div className="form-group col-md-4">
                <label>Project Type</label>
                <select
                  className="form-control"
                  value={formValue.projectType}
                  name="projectType"
                  onChange={(e) => _onInputChange(e)}
                >
                  <option value="select">Select</option>
                  <option value="Native Exchange CEX">
                    Native Exchange CEX
                  </option>
                  <option value="Native Exchange DEX">
                    Native Exchange DEX
                  </option>
                  <option value="meme">MEME</option>
                  <option value="deFi">DeFi</option>
                  <option value="oracles">Oracles</option>
                  <option value="nft">NFT</option>
                  <option value="deflationary">Deflationary</option>
                  <option value="launchpad">Launchpad</option>
                  <option value="gaming">Gaming</option>
                  <option value="lending">Lending</option>
                  <option value="wallets">Wallets</option>
                  <option value="insurance">Insurance</option>
                  <option value="rebase">Rebase</option>
                  <option value="AlgoStablecoinSeigniorage">
                    Algo Stablecoin / Seigniorage
                  </option>
                  <option value="governance">Governance</option>
                </select>
              </div>
              <div className="form-group col-md-4">
                <label>Blockchain</label>
                <select
                  className="form-control"
                  value={formValue.blockchain}
                  name="blockchain"
                  onChange={(e) => _onInputChange(e)}
                >
                  <option value="select">Select</option>
                  <option value="ethereum">Ethereum </option>
                  <option value="binanceSmartChain">Binance SmartChain</option>
                  <option value="solana">Solana</option>
                  <option value="cardano">Cardano</option>
                  <option value="stellar">Stellar</option>
                  <option value="casperLabs">CasperLabs</option>
                  <option value="tezos">Tezos</option>
                  <option value="hederaHashgraph">Hedera Hashgraph</option>
                  <option value="neo">Neo</option>
                  <option value="layer2">Layer 2</option>
                </select>
              </div>
            </div>

            <div className="form-group ">
              <label>Token Type(ex, ERC-20 BEP-20, ERC 710)</label>
              <input
                value={formValue.tokenType}
                name="tokenType"
                onChange={(e) => _onInputChange(e)}
                type="text"
                className="form-control"
                placeholder=""
              />
            </div>

            <div className="row">
              <div className="form-group col-md-6">
                <label>Date </label>
                <input
                  value={formValue.date}
                  name="date"
                  type="date"
                  className="form-control"
                  placeholder=""
                  onChange={(e) => _onInputChange(e)}
                />
              </div>
              <div className="form-group col-md-6">
                <label>Time </label>
                <input
                  value={formValue.time}
                  name="time"
                  type="time"
                  className="form-control"
                  placeholder=""
                  onChange={(e) => _onInputChange(e)}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Summary </label>
              <textarea
                value={formValue.summary}
                name="summary"
                className="form-control"
                rows="6"
                placeholder="Project Summary"
                onChange={(e) => _onInputChange(e)}
              ></textarea>
            </div>
            <div className="form-group ">
              <label>Project logo </label>
              <input
                valu={formValue.projectlogo}
                name="projectlogo"
                onChange={(e) => _onProfilePicChange(e)}
                type="file"
                className="form-control"
                placeholder="Title (25 characters max)"
              />
            </div>

            <div class="form-group ">
              <label>Hard cap (amount raised in BNB/ETH)</label>
              <input
                value={formValue.hardcap}
                name="hardcap"
                type="number"
                class="form-control"
                placeholder="2"
                onChange={(e) => _onInputChange(e)}
              />
            </div>

            <div className="form-group ">
              <label>Max supply </label>
              <input
                value={formValue.maxsupply}
                name="maxsupply"
                type="number"
                className="form-control"
                placeholder="2"
                onChange={(e) => _onInputChange(e)}
              />
            </div>
            <div className="row">
              <div className="form-group col-md-3">
                <label>Seed price </label>
                <input
                  value={formValue.seedPrice}
                  name="seedPrice"
                  type="number"
                  className="form-control"
                  placeholder="$"
                  onChange={(e) => _onInputChange(e)}
                />
              </div>
              <div className="form-group col-md-3">
                <label>Private sale price </label>
                <input
                  value={formValue.privateSalePrice}
                  name="privateSalePrice"
                  type="number"
                  className="form-control"
                  placeholder="$"
                  onChange={(e) => _onInputChange(e)}
                />
              </div>
              <div className="form-group col-md-3">
                <label>Public sale price </label>
                <input
                  value={formValue.publicSalePrice}
                  name="publicSalePrice"
                  type="number"
                  className="form-control"
                  placeholder="$"
                  onChange={(e) => _onInputChange(e)}
                />
              </div>
              <div className="form-group col-md-3">
                <label>Listing price </label>
                <input
                  value={formValue.listingPrice}
                  name="listingPrice"
                  type="number"
                  className="form-control"
                  placeholder="$"
                  onChange={(e) => _onInputChange(e)}
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-4">
                <label> Twitter </label>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      @
                    </span>
                  </div>
                  <input
                    value={formValue.twitter}
                    name="twitter"
                    type="text"
                    className="form-control"
                    placeholder="Twitter link"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={(e) => _onInputChange(e)}
                  />
                </div>
              </div>
              <div className="form-group col-md-4">
                <label> Discord </label>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      @
                    </span>
                  </div>
                  <input
                    value={formValue.discord}
                    name="discord"
                    type="text"
                    className="form-control"
                    placeholder="Discord link"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={(e) => _onInputChange(e)}
                  />
                </div>
              </div>
              <div className="form-group col-md-4">
                <label> Telegram </label>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      @
                    </span>
                  </div>
                  <input
                    value={formValue.telegram}
                    name="telegram"
                    type="text"
                    className="form-control"
                    placeholder="Telegram link"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={(e) => _onInputChange(e)}
                  />
                </div>
              </div>
              <div className="form-group col-md-4">
                <label> Website </label>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      @
                    </span>
                  </div>
                  <input
                    value={formValue.website}
                    name="website"
                    type="text"
                    className="form-control"
                    placeholder="Website link"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={(e) => _onInputChange(e)}
                  />
                </div>
              </div>
              <div className="form-group col-md-4">
                <label> Whitepaper </label>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      @
                    </span>
                  </div>
                  <input
                    value={formValue.whitepaper}
                    name="whitepaper"
                    type="text"
                    className="form-control"
                    placeholder="Whitepaper link"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={(e) => _onInputChange(e)}
                  />
                </div>
              </div>
              <div className="form-group col-md-4">
                <label> Github </label>
                <div className="input-group mb-3">
                  <input
                    value={formValue.github}
                    name="github"
                    type="text"
                    className="form-control"
                    placeholder="Github link"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={(e) => _onInputChange(e)}
                  />
                </div>
              </div>
            </div>
            <div className="form-group ">
              <label>Token address </label>
              <input
                value={formValue.tokenAddress}
                name="tokenAddress"
                type="text"
                className="form-control"
                placeholder="Token address"
                onChange={(e) => _onInputChange(e)}
              />
            </div>
            <div className="row">
              <div className="form-group col-md-3">
                <label>Project involvement </label>
                <select
                  value={formValue.projectInvolvement}
                  name="projectInvolvement"
                  className="form-control"
                  onChange={(e) => _onInputChange(e)}
                >
                  <option value="select">Select </option>
                  <option value="foundercofounder">Founder/Co-Founder</option>
                  <option value="dev">DEV</option>
                  <option value="teamMember">Team Member</option>
                  <option value="invester">Investor</option>
                  <option value="communityMember">Community Member</option>
                  <option value="none">None</option>
                </select>
              </div>
              <div class="form-group col-md-3">
                <label>Your reward address </label>
                <select
                  class="form-control"
                  value={formValue.yourRewardAddress}
                  name="yourRewardAddress"
                  onChange={(e) => _onInputChange(e)}
                >
                  <option value="select">Select </option>
                  <option value="eth">ETH</option>
                  <option value="bnb">BNB</option>
                </select>
              </div>
              <div className="form-group col-md-6">
                <label>Your Address </label>
                <textarea
                  value={formValue.yourAddress}
                  name="yourAddress"
                  className="form-control"
                  rows="6"
                  placeholder="your address"
                  onChange={(e) => _onInputChange(e)}
                ></textarea>
              </div>
            </div>

            <div className="text-center">
              <a
                href="javascript:void(0)"
                onClick={postAdbs}
                className="btn submit"
              >
                Submit{" "}
              </a>
            </div>
          </form>
        </div>
      </div>
    </Page>
  );
}
