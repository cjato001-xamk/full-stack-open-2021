import { Icon, SemanticICONS } from 'semantic-ui-react';

import { Gender } from '../types';

interface GenderIconProps {
  gender: Gender;
}

const mapGenderToIcon = {
  male: 'mars',
  female: 'venus',
  other: 'genderless',
};

const GenderIcon = ({ gender }: GenderIconProps) => {
  return <Icon name={mapGenderToIcon[gender] as SemanticICONS} />;
};

export { GenderIcon };
