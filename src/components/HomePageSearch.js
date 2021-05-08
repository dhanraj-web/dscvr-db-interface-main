import React, { useEffect, useState } from 'react';
import ApiConfig from '../Config/ApiConfig';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function HomeSearch() {
  const [search, setSearch] = useState('');
  const [services, setServices] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const source = axios.CancelToken.source();
    if (window.sessionStorage.getItem('all_pair')) {
      setIsloading(true);
      setServices(
        window.sessionStorage.getItem('all_pair')
          ? JSON.parse(window.sessionStorage.getItem('all_pair'))
          : []
      );
    } else {
      setIsloading(false);
    }

    getList();

    return () => {
      source.cancel();
    };
  }, []);

  const getList = async () => {
    try {
      const res = await axios.get(ApiConfig.getSwapDetailsList, {});

      console.log('res.data', res.data);
      setServices(res.data.responseResult);
      window.sessionStorage.removeItem('all_pair');
      window.sessionStorage.setItem(
        'all_pair',
        JSON.stringify(res.data.responseResult)
      );
      setIsloading(true);
    } catch (err) {}
  };

  return (
    <>
      {isloading && (
        <>
          <input
            type="search"
            className="form-control"
            placeholder="Filter by token"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />

          {search !== '' && (
            <ul className="list-group text-dark" id="search-list">
              {services.map((list, i) => {
                if (list.token0.symbol) {
                  const searchText = search.toLowerCase();
                  const listText = list.token0.symbol
                    ? list.token0.symbol.toLowerCase()
                    : '';
                  if (
                    searchText.length > 1 &&
                    listText.length !== '' &&
                    listText.indexOf(searchText) !== -1
                  ) {
                    return (
                      <li
                        key={i}
                        className="list-group-item"
                        style={{ textAlign: 'left' }}
                        onClick={() => {
                          return `${list.token0.symbol}-${list.token1.symbol}`;
                        }}
                      >
                        {list.token0.symbol}/{list.token1.symbol}
                      </li>
                    );
                  } else {
                    return null;
                  }
                } else {
                  return null;
                }
              })}
            </ul>
          )}
        </>
      )}
    </>
  );
}
