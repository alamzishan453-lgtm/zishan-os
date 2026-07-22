interface Props {
  title: string;
  subtitle?: string;
}

export default function SectionHeading({
  title,
  subtitle,
}: Props) {
  return (
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-red-500 via-red-400 to-white bg-clip-text text-transparent">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-5 text-gray-400 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}