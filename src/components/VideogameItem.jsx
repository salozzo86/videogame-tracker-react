import Card from './UI/Card';
import playstation_4 from '../assets/Console Icons SVG/playstation_4.svg';
import playstation_5 from '../assets/Console Icons SVG/playstation_5.svg';

const platforms_available = {
  PlayStation: playstation,
  PC: pc,
  macos: macos,
  Xbox: xbox_series,
  Nintendo: nintendo,
};

const VideogameItem = (props) => {
  return (
    <Card>
      <img src={props.img} className="w-auto rounded-t-lg" />
      <div className="flex-1 p-4">
        <h4 className="text-xl">{props.name}</h4>
        <p className="absolute right-2 top-1 text-sm">{props.status}</p>
        <div className="flex flex-row">
          {props.platforms.map((platform) => {
            return <img key={platform} src={platforms_available[platform]} />;
          })}
        </div>
      </div>
    </Card>
  );
};

export default VideogameItem;
