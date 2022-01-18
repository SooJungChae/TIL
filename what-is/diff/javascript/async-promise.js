const promise1 = () => Promise.resolve();
const promise2 = (v1) => Promise.resolve();
const promise3 = (v1, v2) => Promise.resolve();

const getJSONPromise = () => {
  return promise1().then((value1) => {
    return promise2(value1).then((value2) => {
      return promise3(value1, value2);
    });
  });
};

const getJSONAsync = async () => {
  const value1 = await promise1();
  const value2 = await promise2(value1);
  return promise3(value1, value2);
};

const makeRequestPromise = () => {
  try {
    getJSONPromise()
      .then((result) => {
      const data = JSON.parse(result);
      console.log(data);
    })
      .catch(err => {
        // catch here...!
        console.log('promise catch', err);
      })
  } catch (err) {
    // pass
    console.log('try catch', err);
  }
};

const makeRequestAsync = async () => {
  try {
    const data = JSON.parse(await getJSONAsync());
    console.log(data);
  } catch (err) {
    console.log('try catch', err);
  }
};

makeRequestPromise()
// promise catch SyntaxError: Unexpected token u in JSON at position 0
// at JSON.parse (<anonymous>)
//   at /TIL/what-is/diff/javascript/async-promise.js:23:25

makeRequestAsync()
// try catch SyntaxError: Unexpected token u in JSON at position 0
// at JSON.parse (<anonymous>)
//   at makeRequestAsync (/TIL/what-is/diff/javascript/async-promise.js:38:23)
