import '../Components/styles/footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className='first'>
        <div className="row">
          <div className="col">
            <h5>Tél/Fax</h5>
            <ul>
              <li>Tél : +213 48 74 94 52</li>
              <li>Fax: +213 48 74 94 50</li>
            </ul>
          </div>
          <div className="col">
            <h5>Adresse</h5>
            <ul>
              <li>BP 73, Bureau de poste EL WIAM</li>
              <li>Sidi Bel Abbés 22016, Algérie</li>
            </ul>
          </div>
          <div className="col">
            <h5>Email</h5>
            <ul>
              <li><a href="mailto:contact@esi-sba.dz">contact@esi-sba.dz</a></li>
            </ul>
          </div>
        </div>
        </div>
        <div className='seconde'>
        <div className="row">
          <div className="col-md-12">
            <p>@ecole superierure en informatique</p>
          </div>
        </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;