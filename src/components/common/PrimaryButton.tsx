interface PrimaryButtonProps {
  title: string;
  customCss?: string;
  onClick: () => void;
}

const PrimaryButton = ({
  title,
  customCss = "",
  onClick,
}: PrimaryButtonProps) => {
  return (
    <div className={`w-[130px] rounded-lg text-center ${customCss}`}>
      <button
        className="bg-blue-500 hover:bg-blue-600 w-full rounded-lg px-2 py-2  font-semibold transition-all 
                   duration-200 ease-in-out hover:shadow-md active:scale-95 lg:px-3"
        onClick={onClick}
      >
        {title}
      </button>
    </div>
  );
};

export default PrimaryButton;
