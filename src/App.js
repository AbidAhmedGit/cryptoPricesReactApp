import React, { useEffect, useState } from 'react';
import './App.css'

const CRYPTO_PRICES_API_BASE_URL =
  'https://api.frontendexpert.io/api/fe/cryptocurrencies';

export default function CryptoPrices() {
  // Write your code here.
  // state for setting coins from api call
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(true);

const getCoins = async() =>{
  const url = new URL(CRYPTO_PRICES_API_BASE_URL);
  url.searchParams.set('page', page);
  // console.log('++++++++++++++++++url:', url)
  const response = await fetch(url);
  const coinsData = await response.json();
  // console.log('++++++++++++++++++coinsData:', coinsData);
  setCoins(coinsData.coins);
  // console.log('++++++++++++++++++hasNext:', coinsData.hasNext);
  setHasNext(coinsData.hasNext);
  // console.log(coins);
}  

useEffect(() => {
  getCoins()
}, [page])

  return (
    <>
      {/* Write your code here. */}
      {console.log('+++++++++++++++coinsState:', coins)}
      <table>
        <caption>Crypto Prices</caption>
        <thead>
          <tr>
            <th scope="col">Coin</th>
            <th scope="col">Price</th>
            <th scope="col">Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(coins) && coins.map((coin)=>(
            <tr key={coin.name}>
              <th scope='row'>{coin.name}</th>
              <td>{coin.price}</td>
              <td>{coin.marketCap}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button disabled={page <= 0} onClick={() => {setPage(page-1)}}>
        Back
      </button>

      <button disabled={!hasNext} onClick={() => {setPage(page+1)}}>
        Next
      </button>
    </>
  );
}