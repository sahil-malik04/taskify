const Button = ({ clickEvent, className, action }) => {
  return (
    <button className={className} onClick={clickEvent}>
      {action}
    </button>
  );
};

export default Button;
