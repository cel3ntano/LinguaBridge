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
      <ul className="flex justify-center gap-[100px] py-10">
        {stats.map((stat, index) => (
          <li key={index}>
            <ul className="flex gap-4">
              <li className="text-text-primary text-[28px] font-medium tracking-[-.02em] leading-[1.14]">
                {stat.number}
              </li>
              <li className="text-text-primary/70 text-sm font-normal tracking-[-.02em] leading-[1.29]">
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
