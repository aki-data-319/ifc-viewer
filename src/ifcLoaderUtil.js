// src/ifcLoaderUtil.js
/**
 * IFCファイルを読み込んでシーンに追加するユーティリティ
 * @param {IFCLoader} ifcLoader
 * @param {string} url - IFCファイルのURL
 * @param {THREE.Scene} scene
 */


/**
 * IFCファイルを読み込んでシーンに追加するユーティリティ
 * Promise を返し、呼び出し元でエラーを捕捉できるように
 */
export function loadIFCModel(ifcLoader, url, scene) {
  return new Promise((resolve, reject) => {
    ifcLoader.load(
      url,
      (ifcModel) => {
        scene.add(ifcModel.mesh);
        resolve(ifcModel);
      },
      (event) => {
        const pct = (event.loaded / event.total) * 100;
        console.log(`読み込み進行中: ${pct.toFixed(2)}%`);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

//下は過去のやつ

/*
export function loadIFCModel(ifcLoader, url, scene) {
  ifcLoader.load(
    url,
    (ifcModel) => {
      scene.add(ifcModel.mesh);
      resolve(ifcModel);
      console.log('IFCモデルの読み込みに成功しました');
    },
    (event) => {
      // 読み込み進捗
      const percent = (event.loaded / event.total) * 100;
      console.log(`読み込み進行中: ${percent.toFixed(2)}%`);
    },
    (error) => {
      console.error('IFCモデルの読み込みに失敗しました', error);
      reject(error);
    }
  );
}

*/