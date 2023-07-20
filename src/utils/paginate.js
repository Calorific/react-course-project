export default function paginate(items, pageNumber, pageSize) {
  const idx = (pageNumber - 1) * pageSize
  return [...items].splice(idx, pageSize)
}