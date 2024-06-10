/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import './Home.scss';
import HomeLogged from './HomeLogged';
import HomeNotLogged from './HomeNotLogged';

export default function Home({
  logged,
  synoptiqueList,
  setSubSynoptique,
  token,
  userId,
  setMainSynoptique,
}) {
  return (
    <main>
      {logged ? (
        <HomeLogged
          synoptiqueList={synoptiqueList}
          setSubSynoptique={setSubSynoptique}
          token={token}
          userId={userId}
          setMainSynoptique={setMainSynoptique}
        />
      ) : (
        <HomeNotLogged />
      )}
    </main>
  );
}
