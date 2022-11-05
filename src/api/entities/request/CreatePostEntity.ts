export class CreatePostEntity {
  id: number | undefined;
  title: string | undefined;
  description: string | undefined;
  detail: string | undefined;
  url: string | undefined;
  author: number | undefined;
  skill: string | undefined;
  free_tag: string | undefined;
  created_at: Date | undefined;
  updated_at: Date | undefined;

  constracter(
    id: number,
    title: string,
    description: string,
    detail: string,
    url: string,
    author: number,
    skill: string,
    free_tag: string,
    created_at: Date,
    updated_at: Date
  ) {
    id = id;
    title = title;
    description = description;
    detail = detail;
    url = url;
    author = author;
    skill = skill;
    free_tag = free_tag;
    created_at = created_at;
    updated_at = updated_at;
  }
}
