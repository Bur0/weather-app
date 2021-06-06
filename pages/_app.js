import '../styles/globals.css';
import {useRouter} from 'next/router';

function MyApp({Component, pageProps}) {
  return (
    <div className="container mx-auto px-4">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
