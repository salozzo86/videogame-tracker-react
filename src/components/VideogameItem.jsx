import Card from './UI/Card';
import macos from '../assets/Console Icons SVG/macos.svg';
import nintendo from '../assets/Console Icons SVG/nintendo.svg';
import xbox from '../assets/Console Icons SVG/xbox.svg';
import playstation from '../assets/Console Icons SVG/playstation.svg';
import pc from '../assets/Console Icons SVG/pc.svg';

const platforms_available = {
  PC: pc,
  'PlayStation 5': playstation,
  'Xbox One': xbox,
  'PlayStation 4': playstation,
  'Nintendo Switch': nintendo,
  'Xbox Series S/X': xbox,
  macOS: macos,
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
            return (
              <img
                key={platform}
                src={platforms_available[platform]}
                className="px-1"
                title={platform}
                alt={`Main logo for ${platforms_available[platform]
                  .split('/')
                  .pop()
                  .split('.')
                  .slice(0, -1)
                  .join('.')}`}
              />
            );
          })}
        </div>
      </div>
    </Card>
  );
};

export default VideogameItem;
