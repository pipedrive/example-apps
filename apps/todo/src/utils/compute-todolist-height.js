export default (todoList) => {
  const computedHeight = 70 + (todoList.length * 30);

  return computedHeight > 750 ? 750 : computedHeight < 100 ? 100 : computedHeight;
}
