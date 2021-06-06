import Image from 'next/image';

function Card(props) {
  const data = props.data;
  return (
    <tr>
      <td className="text-xs md:text-base text-center">{data.dt_txt}</td>
      <td>
        {data.weather.map((weather) => {
          return (
            <div key={weather.id} className="flex flex-col justify-center items-center">
              <Image
                src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                alt={weather.description}
                width={60}
                height={60}
              />
              <span className="text-sm md:text-base text-center">{weather.description}</span>
            </div>
          );
        })}
      </td>
      <td className="text-sm md:text-base text-center">{data.main.humidity}</td>
      <td className="text-sm md:text-base text-center">{data.main.temp}°C</td>
    </tr>
  );
}

export default Card;
