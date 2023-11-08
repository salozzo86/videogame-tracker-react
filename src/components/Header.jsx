import videogames from '../assets/videogames.jpg';

const Header = () => {
  return (
    <>
      <header className="relative">
        <h2 className="absolute left-0 top-0 p-4 text-4xl text-white">
          Videogame Tracker
        </h2>
        <div className="h-40 w-screen">
          <img
            src={videogames}
            alt="A series of videogame consoles"
            className="h-full w-full object-cover"
          />
        </div>
      </header>
    </>
  );
};

export default Header;
