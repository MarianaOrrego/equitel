import "../styles/home.css";

const Home = () => {
  return (
    <>
      <div className="container-home">
        <h1 className="title">¡Bienvenidos!</h1>
        <div className="description">
          <p>Este es un proyecto que emplea las siguientes tecnologías:</p>
          <ul>
            <li>React</li>
            <li>PostgreSQL</li>
            <li>Node.js</li>
            <li>Express</li>
          </ul>
          <p>
            El objetivo de este proyecto es crear un sistema que permita
            ingresar la información de cada producto como lo es cantidad en
            bodega, descripción, modelo y valor de venta.
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
