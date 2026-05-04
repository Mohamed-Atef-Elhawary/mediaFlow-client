export interface DoctorRank {
  rank: number;
  totalReviewers: number;
  ratingDistribution: {
    [key: number]: number;
  };
}
