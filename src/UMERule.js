import React from 'react';

// 方法执行失败后重试
const retry = (fn, retriesLeft = 5, interval = 1000) => {
  return new Promise((resolve, reject) => {
    fn()
      .then(resolve)
      .catch(error => {
        setTimeout(() => {
          if (retriesLeft === 1) {
            console.log('方法重启失败');
            reject(error);
          } else {
            retry(fn, --retriesLeft, interval).then(resolve, reject);
          }
        }, interval);
      });
  });
};

// 组件懒加载
const lazy = fn => React.lazy(() => retry(fn));

export default {
  retry,
  lazy,
};
