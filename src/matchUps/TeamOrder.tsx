import { shuffleArray } from '../assets/globalFunctions';
import { Team } from '../assets/types';
import './matchups.css';

type TeamOrderProps = {
  teamOrder: Team[];
  setTeamOrder: (array: Team[]) => void;
};

export const TeamOrder = ({ teamOrder, setTeamOrder }: TeamOrderProps) => {
  // change order functions
  const handleMove = (teamId: string, name: string) => {
    const newPosition = prompt(`Enter new position for ${name}`);
    // check if entry is null
    if (newPosition !== null) {
      const index = parseInt(newPosition, 10) - 1;
      //check entry is a number between 0 and the number of teams
      if (!isNaN(index) && index >= 0 && index < teamOrder.length) {
        // make a new array
        const newOrder = [...teamOrder];
        // pull the moving team out of the new array
        const [movedTeam] = newOrder.splice(
          newOrder.findIndex(team => team.id === teamId),
          1,
        );
        // put moving team into the correct spot in new order
        newOrder.splice(index, 0, movedTeam);
        setTeamOrder(newOrder);
      } else {
        alert('Invalid position entered');
      }
    }
  };

  const handleRandomize = () => {
    const randomOrder = shuffleArray(teamOrder);
    setTeamOrder(randomOrder);
  };

  return (
    <div className='order-container'>
      <div className='order-title-group'>
        <div className='order-title'>Team Order</div>
        <div className='order-title'>Count = {teamOrder.length}</div>
      </div>

      {teamOrder.length >= 1 &&
        teamOrder.map((team, index) => (
          <div key={team.id} className='team-container'>
            <div className='team-info'>
              {index + 1}: {team.teamName}
            </div>
            <button
              className='small-button'
              onClick={() => handleMove(team.id, team.teamName)}
            >
              Move
            </button>
          </div>
        ))}
      <div className='button-group'>
        <button className='small-button' onClick={handleRandomize}>
          Random
        </button>
      </div>
    </div>
  );
};
