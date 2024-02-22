import react, { useContext } from 'react';
import { useUserContext } from '../contex/UserContext';
import WiderValueCard from './cards/WiderValueCard';
import { CharProvider } from '../contex/charsticsProvider';
import WiderLevelCards from './cardsPractice/WiderLevelCards';
import ValueDataFrom from './ValueDataForm';
import BottomBar from './BottomBar';
import Banner from './Banner';

const LearnerDashboard = () => {
  const { username } = useUserContext();

  return (
    <div>
      <CharProvider>
        <WiderValueCard />
      </CharProvider> 
      {/* <ValueData /> */}
      {/* <Banner /> */}
    </div>
  );
}

export default LearnerDashboard;