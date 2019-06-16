const asyncSUM = (x, y) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(x + y);
    }, 300);
  });
};

const foo = async () => {
  const a = await asyncSUM(2, 3);
  console.log(a);
};