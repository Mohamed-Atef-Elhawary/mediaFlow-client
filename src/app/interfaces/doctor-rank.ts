//from backend
export interface DoctorRank {
  rank: number;
  totalReviewers: number;
  ratingDistribution: {
    [key: number]: number;
  };
}
//made in front to display in the template
export interface RankData {
  rank: { decimal: number; frag: number };
  totalReviewers: number;
  ratingDistribution: { [key: number]: string };
}
//from front to back backend
export interface ReviewData {
  docId: string;
  rank: number;
  comment?: string;
}
export interface Review {
  _id: string;
  userId: {
    _id: string;
    name: string;
    image: string;
  };
  rank: number;
  comment: string;
  createdAt: string;
  helpfulVotes: string[];
}
