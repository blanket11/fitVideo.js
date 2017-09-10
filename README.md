# fitVideo.js

## このライブラリについて
videoタグを画面いっぱいに表示します。  

[DEMO](https://blanket11.github.io/fitVideo.js/)

## 使い方サンプル

### html

#### fitVideo.jsを読み込む
```html
<script src="./fitVideo.min.js"></script>
```
fitVideo.jsを読み込んでください。


#### videoタグを書く
```html
<div class="js-fit-video">
  <video autoplay="autoplay" loop="loop" muted="muted">
    <source src="./hoge.mp4"/>
  </video>
</div>
```
divなどでvideoタグを囲います。
囲ったタグにはidまたはclassをつけてください。

### JavaScript
```javasript
var options = {
    'size': {
        'width': 1280,
        'height': 720
    }
};

var fitVideo = new FitVideo('.js-fit-video', options);
```
例: `new FitVideo(target_dom, options);`
1. `target_dom`には囲ったタグのidまたはclassを指定します。
2. `options`にはオプジェクトでsizeにwidthとheightを指定します。
このsizeのwidthとheightは動画の横幅と高さを指定します。


## method
| メソッド名 | 説明 |
| --- | --- |
| .destroy() | fitVideo.jsで実行したものを解除し停止します。 |
