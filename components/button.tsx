type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
};

export default function Button({ children, disabled, onClick }: ButtonProps) {
  return (
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded-lg"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
