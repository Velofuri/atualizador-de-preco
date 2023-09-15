import './Botao.css';

function Botao({ onClick, ...props }) {
  return (
    <button onClick={onClick} className='botao'>
      {props.children}
    </button>
  );
}

export default Botao;
