import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Coin from './Components/Coin';

// https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&order=market_cap_desc&per_page=50&page=1&sparkline=false

function App() {

  const [coins, setCoins] = useState([]);
  const [search, setSearch] =useState('');

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&order=market_cap_desc&per_page=50&page=1&sparkline=false')
      .then(res => {
        setCoins(res.data);

      }).catch(error => alert('Yo, theres an error in your request!'))
  }, []);

  const handleChange = e => {
    setSearch(e.target.value)
  }

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase()) 

    )

  return (
    <div className="coin-app">
      <div className='coin-search'>
        <h1 className='coin-text'>
          Pesquise uma criptomoeda!
</h1>
        <form>
          <input type='text' 
          placeholder='Pesquise' className='coin-input'
          onChange={handleChange}
          >

          </input>
        </form>

      </div>

     {filteredCoins.map(coin => {
       return (
         <Coin key={coin.id}
         name={coin.name}
         image={coin.image}
         
        symbol={coin.symbol}
        marketcap={coin.market_cap }
         price={coin.current_price}
         priceChange={coin.price_change_percentage_24h}
         volume={coin.total_volume}
         ></Coin>
       )
     })}
    </div>
  );
}

export default App;
