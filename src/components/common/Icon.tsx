interface IconProps {
  id: string;
  className?: string;
}

const Icon = ({ id, className = '' }: IconProps) => {
  return (
    <svg className={className}>
      <use href={`/sprites/main-sprite.svg${id}`} />
    </svg>
  );
};

export default Icon;
