
import '../Components/styles/About.css'

const About = () => {
  // Tableau contenant les objectifs réels de la plateforme e-learning et leurs descriptions
 

  return (
    <div className="about-container">
    <h1>À propos de la plateforme E-learning</h1>
    <div className="card-row">
      <div className="card">
        <h2>Accessibilité accrue à l'éducation</h2>
        <p> Offrir une éducation de qualité à tout moment et en tout lieu, éliminant les barrières géographiques et temporelles.</p>
      </div>
      <div className="card">
        <h2>Autonomie des apprenants</h2>
        <p> Encourager les apprenants à prendre en charge leur propre apprentissage grâce à des cours modulaires et des outils d'auto-évaluation.</p>
      </div>
      <div className="card">
        <h2>Innovation pédagogique</h2>
        <p>Intégrer des technologies éducatives innovantes pour créer des expériences d'apprentissage interactives et personnalisées.</p>
      </div>
    </div>
  </div>
  );
};

export default About;