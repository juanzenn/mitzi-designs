const Button = props => {
  const { outlined = false, children, className, ...rest } = props;

  const outlinedVersion = () => {
    switch (outlined) {
      case true:
        return `text-primary-500 border-2 border-primary-500 hover:bg-primary-500 hover:text-white`;
      case false:
        return `bg-primary-500 text-white text-white border-2 border-primary-500 hover:border-primary-600 hover:bg-primary-600`;
      case 'default':
        return `bg-primary-500 text-white text-white border-2 border-primary-500 hover:border-primary-600 hover:bg-primary-600`;
    }
  };

  const outline = outlinedVersion();

  return (
    <button
      className={`px-4 py-2 tracking-tight transition-all duration-300 shadow-lg rounded-md ${outline} ${className}`}
      {...rest}>
      {children}
    </button>
  );
};

export default Button;
