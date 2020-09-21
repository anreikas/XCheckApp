const URL_DATA_SEPARATOR = '&';

export const UrlConstructor = (url, params, options = {}) => {
  const { separator = URL_DATA_SEPARATOR, equalSign = '=' } = options;

  return `${url}?${
    Object.entries(params)
      .map((el) => el.join(equalSign))
      .join(separator)
  }`;
};

export const UrlPath = (...args) => args.join('/');

export const FetchReq = async (url, method = 'GET', data) => {
  console.log('@FetchReq : url', url);
  const req = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  if (data) {
    req.body = data;
  }

  const response = await fetch(url, req).catch();

  if (!response.ok) {
    const error = Object.assign(Error.prototype, {
      response,
    });

    throw error;
  }

  const result = await response.json();

  return result;
};

export const TextSorter = (a, b) => {
  const nameA = a.author.toLowerCase();
  const nameB = b.author.toLowerCase();

  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) return 1;
  return 0; // Никакой сортировки
};
