/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import { useNavigate } from 'react-router-dom';

export default function HomeLogged({ synoptiqueList }) {
  const navigate = useNavigate();
  const handleClickSynoptique = (e) => {
    navigate(`/synoptique/${e.currentTarget.dataset.slug}`);
  };
  return (
    <main>
      <h2>Panneau de contrôle</h2>
      <div id="dashboard">
        <div id="synoptiques" className="dashboard_menu">
          <div className="menu_head synoptique">
            <div className="menu_head_count">
              <p>Mes synoptiques</p>
              <span>{synoptiqueList?.length}</span>
            </div>
          </div>
          <div className="menu_body synoptique">
            {synoptiqueList?.map((elem) => {
              return (
                <div key={elem.id}>
                  <div
                    className="menu_body_title_list"
                    data-slug={elem.slug}
                    onClick={handleClickSynoptique}
                  >
                    <div>{elem.title}</div>
                    <img src={elem.image} alt="" />
                  </div>
                  <div className="menu_body_title_list_sepparator" />
                </div>
              );
            })}
          </div>
        </div>
        <div id="relations" className="dashboard_menu">
          <div className="menu_head relation">
            <div className="menu_head_count">
              <p>Mes relations</p>
              <span>0</span>
            </div>
          </div>
          <div className="menu_body relation"></div>
        </div>
        <div id="account" className="dashboard_menu">
          <div className="menu_head account">
            <p>Mon compte</p>
          </div>
          <div className="menu_body account"></div>
        </div>
      </div>
    </main>
  );
}
