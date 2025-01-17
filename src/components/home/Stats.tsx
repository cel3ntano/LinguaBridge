import React from 'react';

const stats = [
  { number: '32,000 +', text: ['Experienced', 'tutors'] },
  { number: '300,000 +', text: ['5-star', 'tutor reviews'] },
  { number: '120 +', text: ['Subjects', 'taught'] },
  { number: '200 +', text: ['Tutor', 'nationalities'] },
];

const Stats = () => {
  return (
    <div className="rounded-[30px] border-[1.5px] border-dashed border-accent-primary [border-dash-pattern:1_12]">
      <ul className="flex flex-col sm:grid sm:grid-cols-2 sm:py-8 lg:flex lg:flex-row lg:px-20 justify-between py-6 lg:py-10 xl:px-44">
        {stats.map((stat, index) => (
          <li key={index} className="flex justify-center">
            <ul className="flex gap-2 sm:gap-4 items-center">
              <li className="text-text-primary text-xl sm:text-2xl lg:text-[28px] font-medium tracking-[-.02em] leading-[1.14]">
                {stat.number}
              </li>
              <li className="text-text-primary/70 text-xs sm:text-sm font-normal tracking-[-.02em] leading-[1.29]">
                {stat.text[0]}
                <br />
                {stat.text[1]}
              </li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Stats;
