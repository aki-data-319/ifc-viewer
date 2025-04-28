// src/ifcLoaderUtil.js
/**
 * IFCファイルを読み込んでシーンに追加するユーティリティ
 * @param {IFCLoader} ifcLoader
 * @param {string} url - IFCファイルのURL
 * @param {THREE.Scene} scene
 */
export function loadIFCModel(ifcLoader, url, scene) {
  ifcLoader.load(
    url,
    (ifcModel) => {
      scene.add(ifcModel.mesh);
      console.log('IFCモデルの読み込みに成功しました');
    },
    (event) => {
      // 読み込み進捗
      const percent = (event.loaded / event.total) * 100;
      console.log(`読み込み進行中: ${percent.toFixed(2)}%`);
    },
    (error) => {
      console.error('IFCモデルの読み込みに失敗しました', error);
    }
  );
}