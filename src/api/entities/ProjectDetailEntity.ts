export type ProjectDetailEntity = {
  detailList: {
    id: number;
    title: string;
    description: string;
    detail: string;
    url: string;
    author: number;
    skill: string;
    free_tag: string;
    created_at: Date;
    updated_at: Date;
    user_name: string;
  }[];
  is_author: boolean;
  is_favorite: boolean;
};
