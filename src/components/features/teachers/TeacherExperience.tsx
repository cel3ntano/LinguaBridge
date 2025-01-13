interface TeacherExperienceProps {
  experience: string;
}

const TeacherExperience = ({ experience }: TeacherExperienceProps) => (
  <p className="text-text-primary text-sm md:text-base leading-6">
    {experience}
  </p>
);

export default TeacherExperience;
