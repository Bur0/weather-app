import Head from 'next/head';
import Link from 'next/link';

import {Loading} from '../components/svg';

import {useState} from 'react';

export default function Home() {
  const [citys, setCitys] = useState([]);
  const [loading, setLoading] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${e.target.city.value}&appid=${process.env.apiKey}`)
      .then((res) => res.json())
      .then((data) => setCitys(data))
      .catch((error) => {
        console.error('burak:', error);
      })
      .finally(() => setLoading(false));
  }

  const CityLists = () => {
    return (
      <ul className="mt-4">
        {loading && (
          <div className="flex justify-center">
            <Loading />
          </div>
        )}

        {citys.length > 0 && (
          <>
            <hr className="mb-2"></hr>
            <span className="text-gray-700">Şehir seçiniz.</span>
          </>
        )}

        {citys.map((city, index) => (
          <li className="mt-3" key={index}>
            <Link href="/city/[id]" as={`/city/${city.name}`}>
              <a className="block bg-gray-100 rounded-md px-3 py-2 cursor-pointer shadow hover:shadow-md">
                {`${city.name} - ${city.country}`}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <Head>
        <title>Weather App - Burak Alp</title>
        <meta name="description" content="Weather App" />
      </Head>
      <div className="flex mt-20 h-screen flex-col md:w-1/3 mx-auto">
        <form onSubmit={handleSubmit}>
          <label className="block">
            <span className="text-gray-700">Şehir ismi giriniz.</span>
            <input
              name="city"
              autoFocus
              type="text"
              className="mt-2 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              placeholder="İstanbul"
            />
          </label>
          <button
            type="submit"
            className="flex justify-center items-center w-full mt-3 bg-gray-100 rounded-md py-1 border border-gray-400 focus:outline-none"
          >
            Ara
          </button>
        </form>
        <CityLists />
      </div>
    </div>
  );
}
