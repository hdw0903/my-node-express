import Axios from 'axios';

const detectURL = 'https://openapi.naver.com/v1/papago/detectLangs';
const translateURL = 'https://openapi.naver.com/v1/papago/n2mt';

const axios = (url, body) => {
  return Axios({
    method: 'post',
    url: url,
    data: body,
    headers: {
      'X-Naver-Client-Id': process.env.PAPAGO_CLIENT_ID,
      'X-Naver-Client-Secret': process.env.PAPAGO_CLIENT_SECRET,
    },
  });
};
export const detectLangs = async (req, res, next) => {
  try {
    const { data } = req.body;
    const detect = await axios(detectURL, { query: data });
    res.json(detect.data);
  } catch (e) {
    next(e.response.data);
  }
};
export const n2mt = async (req, res, next) => {
  try {
    const { source, target, text } = req.body;
    const result = await axios(translateURL, {
      source: source,
      target: target,
      text: text,
    });
    res.json(result.data.message.result.translatedText);
  } catch (e) {
    next(e.response.data);
  }
};
