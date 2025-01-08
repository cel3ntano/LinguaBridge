import Icon from '@/components/common/Icon';
import { Teacher } from '@/types/teachers';

interface TeacherReviewsProps {
  reviews: Teacher['reviews'];
}

const TeacherReviews = ({ reviews }: TeacherReviewsProps) => (
  <ul className="mt-8 space-y-8">
    {reviews.map((review, index) => (
      <li key={index} className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-full bg-brand-gray/10 flex items-center justify-center">
            <Icon
              id="#user"
              className="h-6 w-6 stroke-brand-gray fill-brand-gray"
            />
          </div>
          <div className="space-y-0.5">
            <p className="text-brand-gray text-base font-medium leading-6">
              {review.reviewer_name}
            </p>
            <div className="flex items-center gap-2">
              <Icon id="#star" className="h-5 w-5 fill-interactive-rating" />
              <span className="text-text-primary text-sm font-medium leading-[18px]">
                {review.reviewer_rating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
        <p className="text-text-primary text-base font-medium leading-6">
          {review.comment}
        </p>
      </li>
    ))}
  </ul>
);

export default TeacherReviews;
