/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import './Home.scss';
import HomeLogged from './HomeLogged';
import HomeNotLogged from './HomeNotLogged';

export default function Home({ logged, synoptiqueList }) {
  return (
    <main>
      {logged ? (
        <HomeLogged synoptiqueList={synoptiqueList} />
      ) : (
        <HomeNotLogged />
      )}
    </main>
  );
}
