type sectionHeadingProps = {
  heading: string;
  borderWidth: string;
  textSize?: string;
};
const SectionHeading = ({ heading, borderWidth, textSize = "text-3xl" }: sectionHeadingProps) => {
  return (
    <div className="mb-10">
      <h1 className={`font-bold ${textSize} text-primary`}>{heading}</h1>
      <div className="flex items-center mt-2">
        <span
          className={`h-1 ${borderWidth} bg-teal-600 rounded-full mt-2`}
        ></span>
        <div className="h-0.5 w-full bg-teal-200 rounded-full mt-2"></div>
      </div>
    </div>
  );
};

export default SectionHeading;
