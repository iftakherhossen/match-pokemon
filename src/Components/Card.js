import './Card.css';

const Card = (props) => {
     const handleChoice = () => {
         if (!props.disabled) props.handleChoice(props.card);
     }
 
     return (
          <div className='card'>
               <div className={props.flipped ? "flipped" : ""}>
                    <img  className={`front ${props.card.matched ? "matched" : ''}`} src={props.card.src} alt="card front" draggable="false" />
                    <img className='back' src="/images/card_back.png" alt="card back" onClick={() => handleChoice()} draggable="false" />
               </div>
          </div>
     );
}
 
export default Card;