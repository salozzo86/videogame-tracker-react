import Card from './UI/Card';
import macos from '../assets/Console Icons SVG/macos.svg';
import nintendo from '../assets/Console Icons SVG/nintendo.svg';
import xbox from '../assets/Console Icons SVG/xbox.svg';
import playstation from '../assets/Console Icons SVG/playstation.svg';
import pc from '../assets/Console Icons SVG/pc.svg';
import ios from '../assets/Console Icons SVG/ios.svg';
import android from '../assets/Console Icons SVG/android.svg';
import linux from '../assets/Console Icons SVG/linux.svg';
import atari from '../assets/Console Icons SVG/atari.svg';
import amiga from '../assets/Console Icons SVG/amiga.svg';
import sega from '../assets/Console Icons SVG/sega.svg';
import web from '../assets/Console Icons SVG/web.svg';
import neogeo from '../assets/Console Icons SVG/neogeo.svg';
import threedo from '../assets/Console Icons SVG/threedo.svg';

const platforms_available = {
  PC: pc,
  PlayStation: playstation,
  Nintendo: nintendo,
  Xbox: xbox,
  macOS: macos,
  iOS: ios,
  Android: android,
  'Apple Macintosh': macos,
  Linux: linux,
  Atari: atari,
  'Commodore / Amiga': amiga,
  SEGA: sega,
  '3DO': threedo,
  'Neo Geo': neogeo,
  Web: web,
};

const VideogameItem = (props) => {
  return (
    <Card>
      <img src={props.img} className="h-40 w-auto rounded-t-lg" />
      <div className="flex-1 p-4">
        <h4 className="text-xl">{props.name}</h4>
        <p className="absolute bottom-1 right-2 text-sm">{props.status}</p>
        <div className="flex flex-row justify-center">
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
