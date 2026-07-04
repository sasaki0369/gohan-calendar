# ごはんカレンダー

家族の「夜ごはんいらない日」だけを登録・共有する、シンプルなWebアプリです。
GitHub Pagesで公開でき、データはFirebase Realtime Database（無料枠）でリアルタイムに家族間共有されます。

## できること

- 名前登録（家族を追加・削除）
- 週単位カレンダーで「いらない日」だけを登録（タップでON/OFF）
- 曜日ごとに「いらない○人」がバッジで一目でわかる
- 今日の「いらない」人数を、申し訳なさそうな🙇スタンプで表示
- 家族の誰かが更新すると、他の家族の画面にもリアルタイムで反映

## セットアップ手順

### 1. Firebaseプロジェクトを作る（無料）

1. [Firebase console](https://console.firebase.google.com/) にアクセスし、Googleアカウントでログイン
2. 「プロジェクトを追加」→ 名前を入力（例：`gohan-calendar`）→ 作成
3. 左メニューの「構築」→「Realtime Database」→「データベースを作成」
   - ロケーションは任意（asia-southeast1などでOK）
   - 最初は「テストモードで開始」を選択（後述のルールを設定してください）
4. 左メニューの歯車アイコン →「プロジェクトの設定」→ 下部の「マイアプリ」→ `</>`（ウェブ）を選択
5. アプリ名を適当に入力して登録すると、`firebaseConfig` の中身が表示されるのでコピー

### 2. index.html に設定を貼り付け

`index.html` の中の以下の部分を、コピーした内容に書き換えてください。

```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 3. Realtime Databaseのルールを設定

Firebase console →「Realtime Database」→「ルール」タブで、以下のように設定してください（家族内共有が目的のため、読み書きを許可するシンプルな設定です）。

```json
{
  "rules": {
    "gohan": {
      ".read": true,
      ".write": true
    }
  }
}
```

> ⚠️ このルールはURLを知っている人なら誰でも読み書きできる設定です。家族以外に公開したくない場合は、リポジトリやURLを共有する範囲に注意してください。より厳格に守りたい場合はFirebase Authenticationの導入をおすすめします。

### 4. GitHubにアップロード

1. GitHubで新しいリポジトリを作成（例：`gohan-calendar`）
2. このフォルダの `index.html` だけをリポジトリにアップロードしてください（アイコンとmanifestは`index.html`の中に埋め込み済みなので、他のファイルは不要です）

```bash
git init
git add index.html README.md
git commit -m "init: ごはんカレンダー"
git branch -M main
git remote add origin https://github.com/あなたのアカウント/gohan-calendar.git
git push -u origin main
```

### 5. GitHub Pagesで公開

1. リポジトリの「Settings」→「Pages」
2. 「Build and deployment」の「Source」を `Deploy from a branch` に設定
3. Branchを `main` / `/(root)` にして「Save」
4. 数分後、`https://あなたのアカウント.github.io/gohan-calendar/` が公開されます

このURLを家族にLINEなどで共有すれば、全員が同じカレンダーを見て「いらない日」を登録できます。

## 使い方

- 初めてこのアプリを開いた端末では、名前を1つだけ登録します（一度登録すると、その端末では名前の追加はできません）
- 登録時に「昼ごはんも登録する」にチェックを入れると、その人だけ昼・夜の両方を登録できるようになります。チェックしなければ今まで通り夜ごはんだけの、シンプルな表示のままです
- 今日の日付が表の一番左に表示されます。表を左右にスクロールすると、過去の記録や先の予定が見られます
- 「今日へ」ボタンで、いつでも今日の位置に表示を戻せます。矢印ボタンは7日分まとめてスクロールします
- カレンダーの中で「いる・いらない」を変更できるのは、自分の行（この端末で登録した本人）だけです。他の家族の行は参照のみで、タップしても反応しません
- カレンダーのセルをタップすると「いらない」が登録され、🙇スタンプが押されます。もう一度タップすると解除されます
- 登録しない日は自動的に「いる（いつも通り）」扱いになります
- 名前を間違えて登録してしまった場合は、「名前を訂正する」から登録をやり直せます（その端末のこれまでの登録もリセットされます）

## ホーム画面に追加する（アイコン表示）

このアプリには専用アイコン（朱色の判子に、ごはん茶碗と箸のデザイン）と、ホーム画面追加用の設定（manifest）が`index.html`の中にすべて埋め込まれています。外部ファイルは不要で、`index.html`1つだけで完結します。GitHub Pagesで公開したURLをスマホのブラウザで開き、以下の操作でホーム画面に追加すると、このアイコンで起動できるようになります。

- **iPhone（Safari）**：共有ボタン（□に↑）→「ホーム画面に追加」
- **Android（Chrome）**：右上の「⋮」メニュー→「ホーム画面に追加」、または自動で表示される「アプリをインストール」の案内
