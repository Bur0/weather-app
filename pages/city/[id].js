import Head from 'next/head';
import useSwr from 'swr';
import {useRouter} from 'next/router';
import {Loading, Back} from '../../components/svg';
import Card from '../../components/card';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function City() {
  const router = useRouter();

  const {data, error} = useSwr(
    router.query.id
      ? `https://api.openweathermap.org/data/2.5/forecast?q=${router.query.id}&appid=${process.env.apiKey}&units=metric&lang=tr`
      : null,
    fetcher
  );

  if (error) return <div>Failed.</div>;

  if (!data)
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <Loading />
      </div>
    );

  return (
    <div>
      <Head>
        <title>Weather App - {data.city.name + ' Hava Durumu'}</title>
        <meta name="description" content={data.city.name + ' 5 günlük hava Durumu'} />
      </Head>

      <nav className="py-4 text-center mb-2 flex justify-between items-center">
        <button
          onClick={() => router.back()}
          className="flex justify-center items-center w-10 h-10 bg-gray-300 rounded-full focus:outline-none"
        >
          <Back />
        </button>
        <div>
          <h1 className="inline font-bold text-2xl">{data.city.name}</h1>
          <span className="ml-2">{data.city.country}</span>
        </div>
      </nav>
      <div className="card-items">
        <table className="table-fixed w-full border border-gray-200">
          <thead>
            <tr>
              <th>Tarih</th>
              <th>Olay</th>
              <th>Nem</th>
              <th>Sıcaklık</th>
            </tr>
          </thead>
          <tbody>
            {data.list.map((data, index) => (
              <Card key={index} data={data} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
