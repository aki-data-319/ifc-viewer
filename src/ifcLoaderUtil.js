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
        try {
          if (!ifcModel || !ifcModel.mesh) {
            throw new Error('ロード結果にmeshが存在しません');
          }
          scene.add(ifcModel.mesh);
          resolve(ifcModel);
        } catch (error) {
          reject(error);
        }
      },
      (event) => {
        const pct = (event.loaded / event.total) * 100;
        console.log(`読み込み進行中: ${pct.toFixed(2)}%`);
      },
      (error) => {
        console.error('🔴 load中にエラー発生', error);
        reject(new Error(`IFCLoader.load失敗: ${error.message || error}`));
      }
    );
  });
}

