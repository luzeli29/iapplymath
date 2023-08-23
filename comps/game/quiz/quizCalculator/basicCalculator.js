//import { Calculator } from 'react-mac-calculator';
import Calculator from './calculator';
import Image from 'next/image';
import Popup from '@comps/popups/popup';


export const BasicCalculator = ({lang, notepad}) => {
  lang = lang ? lang : 'en'

  return (
    <Popup
      icon={<Image width={30} height={50} src="/img/other/calcicon.png" alt="calculator" />}
      content={<Calculator/>}
      lang={lang}
      notepad={notepad}
    />
  );
};
