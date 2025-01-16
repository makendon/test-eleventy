export function filterTagList(tags) {
  return (tags || []).filter(tag => tag !== "post");
}
