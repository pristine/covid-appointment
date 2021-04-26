export const handler = async (req, res) => {
  console.log(req);
  return res.status(200).json({ status: 'hello world' });
};
